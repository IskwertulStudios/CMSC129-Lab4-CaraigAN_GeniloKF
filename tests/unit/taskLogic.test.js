import { describe, test, expect } from "@jest/globals";
import {
  createTask,
  getPlantStage,
  toggleSubtask,
  validateTask,
} from "../../src/lib/taskLogic";
import { Task } from "../../src/lib/Task";

describe("getPlantStage", () => {
  const makeTask = (completed, total) =>
    new Task({
      id: "task-1",
      title: "Farm task",
      createdAt: 1,
      subtasks: Array.from({ length: total }, (_, index) => ({
        id: `sub-${index + 1}`,
        text: `Subtask ${index + 1}`,
        done: index < completed,
      })),
    });

  test("returns seedling for 0% to below 20%", () => {
    expect(getPlantStage(makeTask(0, 5))).toBe("seedling");
    expect(getPlantStage(makeTask(1, 6))).toBe("seedling");
  });

  test("returns sprout for 20% to below 40%", () => {
    expect(getPlantStage(makeTask(1, 5))).toBe("sprout");
    expect(getPlantStage(makeTask(1, 3))).toBe("sprout");
  });

  test("returns plant for 40% to below 60%", () => {
    expect(getPlantStage(makeTask(2, 5))).toBe("plant");
    expect(getPlantStage(makeTask(5, 9))).toBe("plant");
  });

  test("returns bigplant for 60% to below 80%", () => {
    expect(getPlantStage(makeTask(3, 5))).toBe("bigplant");
    expect(getPlantStage(makeTask(3, 4))).toBe("bigplant");
  });

  test("returns tree for 80% to below 100%", () => {
    expect(getPlantStage(makeTask(4, 5))).toBe("tree");
    expect(getPlantStage(makeTask(9, 10))).toBe("tree");
  });

  test("returns fruit for 100%", () => {
    expect(getPlantStage(makeTask(5, 5))).toBe("fruit");
  });
});

describe("validateTask", () => {
  test("returns true for a valid draft", () => {
    const draft = {
      title: "Harvest carrots",
      subtasks: ["Water beds", "Check soil moisture"],
    };

    expect(validateTask(draft)).toBe(true);
  });

  test("returns false for invalid draft", () => {
    expect(validateTask()).toBe(false);
    expect(validateTask(null)).toBe(false);
    expect(validateTask({})).toBe(false);
    expect(validateTask({ title: "", subtasks: ["one"] })).toBe(false);
    expect(validateTask({ title: "Valid", subtasks: [] })).toBe(false);
    expect(validateTask({ title: "Valid", subtasks: ["   "] })).toBe(false);
  });
});

describe("createTask", () => {
  test("returns a Task when create succeeds", () => {
    const draft = {
      title: "Prepare seedlings",
      subtasks: ["Mix soil", "Prepare pots"],
    };

    const result = createTask(draft);

    expect(result).toBeInstanceOf(Task);
    expect(result.title).toBe("Prepare seedlings");
    expect(result.subtasks).toHaveLength(2);
  });

  test("returns null when create fails validation", () => {
    expect(createTask({ title: "", subtasks: [] })).toBeNull();
    expect(createTask(null)).toBeNull();
  });
});

describe("toggleSubtask", () => {
  test("toggles matching subtask and returns a new task without mutating original", () => {
    const task = new Task({
      id: "task-1",
      title: "Daily farm work",
      createdAt: 1,
      subtasks: [
        { id: "sub-1", text: "Water plants", done: false },
        { id: "sub-2", text: "Clear weeds", done: false },
      ],
    });

    const updated = toggleSubtask(task, "sub-1");

    expect(updated).not.toBe(task);
    expect(updated).toBeInstanceOf(Task);
    expect(task.subtasks[0].done).toBe(false);
    expect(updated.subtasks[0].done).toBe(true);
    expect(updated.subtasks[1].done).toBe(false);
  });

  test("toggling twice returns a task with the subtask reverted", () => {
    const task = new Task({
      id: "task-1",
      title: "Daily farm work",
      createdAt: 1,
      subtasks: [{ id: "sub-1", text: "Water plants", done: false }],
    });

    const firstToggle = toggleSubtask(task, "sub-1");
    expect(firstToggle).not.toBe(task);
    expect(task.subtasks[0].done).toBe(false);
    expect(firstToggle.subtasks[0].done).toBe(true);

    const secondToggle = toggleSubtask(firstToggle, "sub-1");
    expect(secondToggle).not.toBe(firstToggle);
    expect(firstToggle.subtasks[0].done).toBe(true);
    expect(secondToggle.subtasks[0].done).toBe(false);
  });

  test("returns null for unknown subtask id", () => {
    const task = new Task({
      id: "task-1",
      title: "Daily farm work",
      createdAt: 1,
      subtasks: [{ id: "sub-1", text: "Water plants", done: false }],
    });

    expect(toggleSubtask(task, "missing-subtask")).toBeNull();
  });
});
