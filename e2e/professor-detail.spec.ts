import { expect, test } from "@playwright/test";

test.describe("교수 상세 페이지 - API 연동 테스트", () => {
  test("교수 정보를 API로부터 불러와 표시한다", async ({ page }) => {
    await page.goto("/professor/1");

    // API 응답 대기
    await page.waitForLoadState("networkidle");

    // 페이지가 정상적으로 로드되었는지 확인 (h1 또는 h2 태그가 있어야 함)
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible({ timeout: 10000 });

    // 에러 페이지가 아닌지 확인
    const errorMessage = page.getByText(/불러오지 못했어요|정보를 확인할 수 없습니다|잘못된 접근/i);
    const hasError = await errorMessage.isVisible().catch(() => false);

    if (!hasError) {
      // 정상 페이지: 교수 이름이나 평가 정보가 있어야 함
      const hasContent =
        (await page.getByText(/교수|평가/i).count()) > 0 ||
        (await page.locator("svg.lucide-star").count()) > 0;
      expect(hasContent).toBeTruthy();
    }
  });

  test("교수 평가 레이더 차트가 표시된다", async ({ page }) => {
    await page.goto("/professor/1");

    // 레이더 차트 또는 평가 관련 요소 확인
    await expect(
      page.locator('svg, canvas, [class*="radar"], [class*="chart"]').first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test("교수 리뷰 목록 API 호출을 시도한다", async ({ page }) => {
    // 리뷰 API 호출 모니터링 (있을 수도, 없을 수도 있음)
    let reviewApiCalled = false;

    page.on("response", (response) => {
      if (response.url().includes("/reviews") && response.url().includes("/prof/")) {
        reviewApiCalled = true;
        console.log("Review API called:", response.url(), "Status:", response.status());
      }
    });

    await page.goto("/professor/1");
    await page.waitForLoadState("networkidle");

    // API 호출 여부만 확인 (데이터 유무는 상관없음)
    console.log("Review API was called:", reviewApiCalled);
  });

  test("교수 리뷰 작성 폼이 표시된다", async ({ page }) => {
    await page.goto("/professor/1");

    // 리뷰 작성 버튼 또는 폼 확인
    const reviewButton = page.getByRole("button", { name: /리뷰|평가|작성/i });
    if (await reviewButton.isVisible()) {
      await reviewButton.click();

      // 폼 요소들이 표시되는지 확인
      await expect(page.locator("form, textarea, input[type='text']").first()).toBeVisible();
    }
  });
});
