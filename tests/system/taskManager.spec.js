import { test, expect } from "@playwright/test";

test("system runner discovers tests", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/harvest-tasks/i);
});
