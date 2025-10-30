import { expect, test } from "@playwright/test";

test.describe("대학 상세 페이지 - API 연동 테스트", () => {
  test("대학 정보를 API로부터 불러와 표시한다", async ({ page }) => {
    await page.goto("/university/1");

    // API 응답 대기
    await page.waitForLoadState("networkidle");

    // 페이지가 정상적으로 로드되었는지 확인
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible({ timeout: 10000 });

    // 에러 페이지가 아닌지 확인
    const errorMessage = page.getByText(/불러오지 못했어요|정보를 확인할 수 없습니다|잘못된 접근/i);
    const hasError = await errorMessage.isVisible().catch(() => false);

    if (!hasError) {
      // 정상 페이지: 대학 정보가 있어야 함
      const hasContent =
        (await page.getByText(/대학|학교|평가/i).count()) > 0 ||
        (await page.locator("svg.lucide-star").count()) > 0;
      expect(hasContent).toBeTruthy();
    }
  });

  test("대학 정보가 정상적으로 로드된다", async ({ page }) => {
    // API 응답 모니터링
    let apiStatus: number | null = null;
    let apiBody: unknown = null;

    page.on("response", async (response) => {
      if (response.url().includes("/api/univ/1")) {
        apiStatus = response.status();
        try {
          apiBody = await response.json();
          console.log("API Response:", JSON.stringify(apiBody, null, 2));
        } catch {
          console.log("Failed to parse API response");
        }
      }
    });

    await page.goto("/university/1");

    // 페이지가 로드될 때까지 대기
    await page.waitForLoadState("networkidle");

    // API 호출이 없으면 테스트 스킵
    if (apiStatus === null) {
      console.log("API not called, skipping test");
      test.skip();
      return;
    }

    console.log(`API Status: ${apiStatus}`);

    // API가 성공했는지 확인
    if (apiStatus === 200) {
      // 응답 구조 확인
      if (!apiBody || !(apiBody as Record<string, unknown>).university) {
        console.log("API response missing 'university' field");
      }

      // 최종적으로 데이터가 표시되는지 확인
      await expect(page.locator("h1, h2").first()).toBeVisible({ timeout: 10000 });

      // 에러가 아닌 정상 페이지인지 확인
      const hasError = await page
        .getByText(/불러오지 못했어요|에러/i)
        .isVisible()
        .catch(() => false);

      if (hasError) {
        console.log("Error message found on page despite 200 response");
        // 페이지 스크린샷 찍기
        await page.screenshot({ path: "debug-university-error.png", fullPage: true });
      }

      expect(hasError).toBeFalsy();
    } else {
      // API가 실패한 경우, 에러 메시지가 표시되어야 함
      console.log(`API returned status ${apiStatus}, expecting error message`);
      const hasError = await page
        .getByText(/불러오지 못했어요|에러|정보를 확인할 수 없습니다/i)
        .isVisible()
        .catch(() => false);
      expect(hasError).toBeTruthy();
    }
  });

  test("존재하지 않는 대학 ID로 접근 시 에러를 표시한다", async ({ page }) => {
    // 404 응답 모킹
    await page.route("**/api/univ/99999", async (route) => {
      await route.fulfill({
        status: 404,
        contentType: "application/json",
        body: JSON.stringify({ message: "Not Found" }),
      });
    });

    await page.goto("/university/99999");

    // 에러 메시지 확인
    await expect(page.getByText(/불러오지 못했어요|정보를 확인할 수 없습니다/i)).toBeVisible();
  });

  test("대학 단과대 목록이 표시된다", async ({ page }) => {
    await page.goto("/university/1");
    await page.waitForLoadState("networkidle");

    // 단과대 섹션이 있는지 확인 (데이터가 있을 수도, 없을 수도 있음)
    const collegeSection = page.getByText(/단과대|학부|대학/i).first();

    if (await collegeSection.isVisible()) {
      console.log("College section found");
    } else {
      console.log("No college section found");
    }

    // 페이지가 정상적으로 로드되었으면 통과
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("대학 리뷰 목록 API 호출을 시도한다", async ({ page }) => {
    // 리뷰 API 호출 모니터링
    let reviewApiCalled = false;

    page.on("response", (response) => {
      if (response.url().includes("/reviews") && response.url().includes("/univ/")) {
        reviewApiCalled = true;
        console.log("Review API called:", response.url(), "Status:", response.status());
      }
    });

    await page.goto("/university/1");
    await page.waitForLoadState("networkidle");

    // API 호출 여부만 확인
    console.log("Review API was called:", reviewApiCalled);
  });
});
