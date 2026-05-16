import { describe, test, expect } from "@jest/globals";
import { createTask, validateTask } from "../../src/lib/taskLogic";
import { Task } from "../../src/lib/Task";

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
