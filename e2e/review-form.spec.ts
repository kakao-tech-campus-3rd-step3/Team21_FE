import { expect, test } from "@playwright/test";

test.describe("리뷰 작성 폼 - API 연동 테스트", () => {
  test("교수 리뷰 작성 시 API로 데이터를 전송한다", async ({ page }) => {
    await page.goto("/professor/1/evaluate");

    // API 요청 모니터링
    const requestPromise = page.waitForRequest(
      (request) => request.url().includes("/api/reviews/prof") && request.method() === "POST",
      { timeout: 10000 },
    );

    // 논문 실적 평가 (별점 클릭)
    const thesisSection = page
      .getByText(/논문을 평가/i)
      .locator("..")
      .locator("..");
    const thesisStars = thesisSection.locator("svg.lucide-star");
    await thesisStars.nth(3).click(); // 4점

    // 연구실 평가 (별점 클릭)
    const labSection = page
      .getByText(/연구실을 평가/i)
      .locator("..")
      .locator("..");
    const labStars = labSection.locator("svg.lucide-star");
    await labStars.nth(4).click(); // 5점

    // 논문 코멘트 작성
    const textarea = page.locator("#thesisReview");
    await textarea.fill("논문 지도를 잘 해주셔서 좋았습니다.");

    // 제출 버튼 클릭
    const submitButton = page.getByRole("button", { name: /제출/i });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // API 요청 검증
    const request = await requestPromise;
    expect(request.method()).toBe("POST");

    const postData = request.postDataJSON();
    expect(postData).toHaveProperty("profSeq");
    expect(postData).toHaveProperty("thesisPerformance");
    expect(postData).toHaveProperty("researchPerformance");
    expect(postData.reviewText).toContain("논문 지도");
  });

  test("대학 리뷰 작성 시 API로 데이터를 전송한다", async ({ page }) => {
    await page.goto("/university/1/evaluate");

    // API 요청 모니터링
    const requestPromise = page.waitForRequest(
      (request) => request.url().includes("/api/reviews/univ") && request.method() === "POST",
      { timeout: 10000 },
    );

    // 각 카테고리별 평가 (5개 항목)
    const categories = ["학식을", "기숙사를", "편의시설을", "캠퍼스 전반을", "학생 복지를"];

    for (const category of categories) {
      const section = page.getByText(new RegExp(category)).locator("..").locator("..");
      const stars = section.locator("svg.lucide-star");
      await stars.nth(3).click(); // 각각 4점
    }

    // 종합 코멘트 작성
    const textarea = page.locator("#comment");
    await textarea.fill("전반적으로 만족스러운 학교 생활이었습니다.");

    // 제출 버튼 클릭
    const submitButton = page.getByRole("button", { name: /제출/i });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // API 요청 검증
    const request = await requestPromise;
    expect(request.method()).toBe("POST");

    const postData = request.postDataJSON();
    expect(postData).toHaveProperty("univSeq");
    expect(postData).toHaveProperty("food");
    expect(postData).toHaveProperty("dormitory");
    expect(postData).toHaveProperty("convenience");
    expect(postData).toHaveProperty("campus");
    expect(postData).toHaveProperty("welfare");
    expect(postData.reviewText).toContain("만족스러운");
  });

  test("교수 리뷰 - 필수 항목 미입력 시 제출 버튼이 비활성화된다", async ({ page }) => {
    await page.goto("/professor/1/evaluate");

    // 아무것도 입력하지 않은 상태에서 제출 버튼 확인
    const submitButton = page.getByRole("button", { name: /제출/i });
    await expect(submitButton).toBeDisabled();

    // 논문 실적만 입력
    const thesisSection = page
      .getByText(/논문을 평가/i)
      .locator("..")
      .locator("..");
    const thesisStars = thesisSection.locator("svg.lucide-star");
    await thesisStars.nth(2).click();

    // 여전히 비활성화 (연구실 평가 필수)
    await expect(submitButton).toBeDisabled();

    // 연구실 평가도 입력
    const labSection = page
      .getByText(/연구실을 평가/i)
      .locator("..")
      .locator("..");
    const labStars = labSection.locator("svg.lucide-star");
    await labStars.nth(2).click();

    // 이제 활성화되어야 함
    await expect(submitButton).toBeEnabled();
  });

  test("대학 리뷰 - 필수 항목 미입력 시 제출 버튼이 비활성화된다", async ({ page }) => {
    await page.goto("/university/1/evaluate");

    const submitButton = page.getByRole("button", { name: /제출/i });
    await expect(submitButton).toBeDisabled();

    // 5개 항목 중 4개만 입력
    const categories = ["학식을", "기숙사를", "편의시설을", "캠퍼스 전반을"];

    for (const category of categories) {
      const section = page.getByText(new RegExp(category)).locator("..").locator("..");
      const stars = section.locator("svg.lucide-star");
      await stars.nth(2).click();
    }

    // 여전히 비활성화 (학생 복지 평가 필수)
    await expect(submitButton).toBeDisabled();

    // 학생 복지 평가 입력
    const welfareSection = page
      .getByText(/학생 복지를/)
      .locator("..")
      .locator("..");
    const welfareStars = welfareSection.locator("svg.lucide-star");
    await welfareStars.nth(2).click();

    // 이제 활성화
    await expect(submitButton).toBeEnabled();
  });

  test("교수 리뷰 작성 성공 시 상세 페이지로 이동한다", async ({ page }) => {
    // API 응답 모킹
    await page.route("**/api/reviews/prof", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({ reviewSeq: 123 }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("/professor/1/evaluate");

    // 필수 항목 입력
    const thesisSection = page
      .getByText(/논문을 평가/i)
      .locator("..")
      .locator("..");
    const thesisStars = thesisSection.locator("svg.lucide-star");
    await thesisStars.nth(3).click();

    const labSection = page
      .getByText(/연구실을 평가/i)
      .locator("..")
      .locator("..");
    const labStars = labSection.locator("svg.lucide-star");
    await labStars.nth(3).click();

    // 제출
    const submitButton = page.getByRole("button", { name: /제출/i });
    await submitButton.click();

    // 상세 페이지로 리다이렉트 확인
    await page.waitForURL(/\/professor\/1$/, { timeout: 5000 });
    expect(page.url()).toMatch(/\/professor\/1$/);
  });

  test("대학 리뷰 작성 성공 시 상세 페이지로 이동한다", async ({ page }) => {
    // API 응답 모킹
    await page.route("**/api/reviews/univ", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({ reviewSeq: 456 }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("/university/1/evaluate");

    // 5개 필수 항목 입력
    const categories = ["학식을", "기숙사를", "편의시설을", "캠퍼스 전반을", "학생 복지를"];

    for (const category of categories) {
      const section = page.getByText(new RegExp(category)).locator("..").locator("..");
      const stars = section.locator("svg.lucide-star");
      await stars.nth(3).click();
    }

    // 제출
    const submitButton = page.getByRole("button", { name: /제출/i });
    await submitButton.click();

    // 상세 페이지로 리다이렉트 확인
    await page.waitForURL(/\/university\/1$/, { timeout: 5000 });
    expect(page.url()).toMatch(/\/university\/1$/);
  });

  test("교수 리뷰 작성 실패 시 에러 메시지를 표시한다", async ({ page }) => {
    // API 에러 응답 모킹
    await page.route("**/api/reviews/prof", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 400,
          contentType: "application/json",
          body: JSON.stringify({ message: "이미 리뷰를 작성하셨습니다." }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("/professor/1/evaluate");

    // 필수 항목 입력
    const thesisSection = page
      .getByText(/논문을 평가/i)
      .locator("..")
      .locator("..");
    const thesisStars = thesisSection.locator("svg.lucide-star");
    await thesisStars.nth(3).click();

    const labSection = page
      .getByText(/연구실을 평가/i)
      .locator("..")
      .locator("..");
    const labStars = labSection.locator("svg.lucide-star");
    await labStars.nth(3).click();

    // alert 이벤트 리스너 설정
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("이미 리뷰를 작성하셨습니다");
      await dialog.accept();
    });

    // 제출
    const submitButton = page.getByRole("button", { name: /제출/i });
    await submitButton.click();

    // alert가 표시될 때까지 대기
    await page.waitForTimeout(1000);
  });

  test("대학 리뷰 - 코멘트는 선택사항이다", async ({ page }) => {
    await page.goto("/university/1/evaluate");

    // 코멘트 없이 별점만 입력
    const categories = ["학식을", "기숙사를", "편의시설을", "캠퍼스 전반을", "학생 복지를"];

    for (const category of categories) {
      const section = page.getByText(new RegExp(category)).locator("..").locator("..");
      const stars = section.locator("svg.lucide-star");
      await stars.nth(3).click();
    }

    // 코멘트 입력하지 않아도 제출 버튼 활성화
    const submitButton = page.getByRole("button", { name: /제출/i });
    await expect(submitButton).toBeEnabled();
  });

  test("교수 리뷰 - 논문 코멘트는 선택사항이다", async ({ page }) => {
    await page.goto("/professor/1/evaluate");

    // 코멘트 없이 별점만 입력
    const thesisSection = page
      .getByText(/논문을 평가/i)
      .locator("..")
      .locator("..");
    const thesisStars = thesisSection.locator("svg.lucide-star");
    await thesisStars.nth(3).click();

    const labSection = page
      .getByText(/연구실을 평가/i)
      .locator("..")
      .locator("..");
    const labStars = labSection.locator("svg.lucide-star");
    await labStars.nth(3).click();

    // 코멘트 입력하지 않아도 제출 버튼 활성화
    const submitButton = page.getByRole("button", { name: /제출/i });
    await expect(submitButton).toBeEnabled();
  });
});
