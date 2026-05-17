import { test, expect } from "@playwright/test";

const API = "http://localhost:3001/api/tasks";

test.beforeEach(async ({ request }) => {
  await request.post(API, { data: { tasks: [] } });
});

test("user can create a task with subtasks and see the plant appear", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("new-task-btn").click();
  await page.getByTestId("task-title-input").fill("Harvest carrots");
  await page.getByTestId("subtask-input-0").fill("Pull weeds first");
  await page.getByTestId("add-subtask-btn").click();
  await page.getByTestId("subtask-input-1").fill("Water the row");
  await page.getByTestId("submit-task-btn").click();
  await expect(page.getByTestId("task-card").first()).toBeVisible();
  await expect(page.getByTestId("plant-icon").first()).toBeVisible();
});
