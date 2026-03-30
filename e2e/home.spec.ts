import { expect, test } from "@playwright/test";

test("homepage shows core sections", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /full stack engineer with a bias for action and attention to detail/i })
  ).toBeVisible();
  await expect(page.getByText(/software engineer portfolio/i)).toBeVisible();
  await expect(page.getByText(/^skills$/i)).toBeVisible();
  await expect(page.getByText(/^resume$/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /github projects/i })).toBeVisible();
});
