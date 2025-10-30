import { expect, test } from "@playwright/test";

test.describe("홈페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("페이지가 정상적으로 로드된다", async ({ page }) => {
    await expect(page).toHaveTitle(/Uniscope/i);
    await expect(page.locator("h1")).toContainText("대학 정보");
  });

  test("검색 박스가 표시된다", async ({ page }) => {
    const searchBox = page.getByRole("combobox").or(page.getByPlaceholder(/검색/i));
    await expect(searchBox).toBeVisible();
  });

  test("피처 카드들이 표시된다", async ({ page }) => {
    // 홈페이지의 주요 기능 카드들이 렌더링되는지 확인
    await expect(page.getByRole("heading", { name: "전국 대학 정보" })).toBeVisible();
  });
});
