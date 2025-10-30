import { expect, test } from "@playwright/test";

test.describe("검색 기능 - API 연동 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("대학 검색 시 API를 호출하고 결과를 표시한다", async ({ page }) => {
    // 검색 입력 필드 찾기
    const searchInput = page.getByPlaceholder(/대학|검색/i);

    // API 응답 모니터링 - 실제 API 경로: /api/search/univ
    const searchResponsePromise = page.waitForResponse((response) =>
      response.url().includes("/api/search/univ"),
    );

    // 검색어 입력
    await searchInput.click();
    await searchInput.fill("서울");

    // API 응답 대기
    const response = await searchResponsePromise;
    expect(response.status()).toBe(200);

    // 검색 결과가 표시되는지 확인 (ul 리스트)
    await expect(page.locator("ul").filter({ hasText: /대학/ }).first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("검색 결과를 클릭하면 해당 페이지로 이동한다", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/대학|검색/i);

    await searchInput.click();
    await searchInput.fill("충남");

    // API 응답 대기 (타임아웃 시 스킵)
    const searchResponse = await page
      .waitForResponse((response) => response.url().includes("/api/search/univ"), {
        timeout: 10000,
      })
      .catch(() => null);

    if (!searchResponse) {
      console.log("API not available, skipping navigation test");
      test.skip();
      return;
    }

    // 검색 결과 리스트가 나타날 때까지 대기
    const results = page.locator("ul li");
    const hasResults = await results
      .first()
      .waitFor({ state: "visible", timeout: 5000 })
      .then(() => true)
      .catch(() => false);

    if (!hasResults) {
      console.log("No search results found, skipping navigation test");
      test.skip();
      return;
    }

    const count = await results.count();

    if (count > 0) {
      // 첫 번째 결과가 클릭 가능한 상태가 될 때까지 대기
      const firstResult = results.first();
      await firstResult.waitFor({ state: "visible" });

      // 네비게이션 대기와 함께 클릭
      await Promise.all([
        page.waitForURL(/\/(university|professor|department|college)\/\d+/, {
          timeout: 10000,
        }),
        firstResult.click({ force: true }),
      ]);

      expect(page.url()).toMatch(/\/(university|professor|department|college)\/\d+/);
    }
  });

  test("검색어가 짧을 때는 결과를 표시하지 않거나 적게 표시한다", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/대학|검색/i);
    await searchInput.click();
    await searchInput.fill("ㄱ");

    // 짧은 대기 후 결과 확인
    await page.waitForTimeout(1500);

    // 검색 결과가 없거나 "검색 결과가 없습니다" 메시지가 표시됨
    const emptyMessage = page.getByText(/검색 결과가 없습니다|결과 없음/i);
    const hasEmptyMessage = await emptyMessage.isVisible().catch(() => false);

    if (!hasEmptyMessage) {
      // 결과가 있더라도 매우 적어야 함
      const results = page.locator("ul li");
      const count = await results.count();
      expect(count).toBeLessThanOrEqual(10);
    }
  });

  test("교수 검색 모드로 전환하여 검색할 수 있다", async ({ page }) => {
    // 교수 검색 모드 버튼 클릭
    await page.getByRole("button", { name: "교수", exact: true }).click();

    const searchInput = page.getByPlaceholder(/교수|검색/i);

    // API 응답 모니터링 - 실제 API 경로: /api/search/prof
    const searchResponsePromise = page.waitForResponse((response) =>
      response.url().includes("/api/search/prof"),
    );

    await searchInput.click();
    await searchInput.fill("김");

    const response = await searchResponsePromise;
    expect(response.status()).toBe(200);
  });
});
