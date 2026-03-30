import { expect, test } from "@playwright/test";

test("homepage shows core sections", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /full-stack software engineering with enterprise scale/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /view resume section/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /experience, skills, and background/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /current github projects/i })).toBeVisible();
});
