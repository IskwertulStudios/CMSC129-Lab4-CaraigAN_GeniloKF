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

test("user can check a subtask and see the plant icon advance", async ({ page }) => {
  await page.goto("/");
  // Create a 5-subtask task via UI
  await page.getByTestId("new-task-btn").click();
  await page.getByTestId("task-title-input").fill("Five step task");
  for (let i = 0; i < 5; i++) {
    if (i > 0) await page.getByTestId("add-subtask-btn").click();
    await page.getByTestId(`subtask-input-${i}`).fill(`Step ${i + 1}`);
  }
  await page.getByTestId("submit-task-btn").click();
  // Check 4 of 5 subtasks (80% → tree stage)
  const checkboxes = page.getByTestId("task-card").first().getByRole("checkbox");
  await checkboxes.nth(0).check();
  await checkboxes.nth(1).check();
  await checkboxes.nth(2).check();
  await checkboxes.nth(3).check();
  await expect(page.getByTestId("plant-icon").first()).toHaveAttribute("data-stage", "tree");
});