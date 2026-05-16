import { createTask } from "../../src/lib/taskLogic";
import { loadTasks, saveTasks } from "../../src/lib/storage";

const STORAGE_KEY = "harvest-tasks-v1";

describe("storage integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("saves a created task to localStorage", () => {
    const createdTask = createTask({
      title: "Prepare soil bed",
      subtasks: ["Gather compost", "Water soil"],
    });

    expect(createdTask).not.toBeNull();

    saveTasks([createdTask]);

    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toMatchObject({
      id: createdTask.id,
      title: "Prepare soil bed",
    });
  });

  test("loads tasks from localStorage", () => {
    const seeded = [
      {
        id: "task-1",
        title: "Prepare soil bed",
        createdAt: 1,
        subtasks: [
          { id: "sub-1", text: "Gather compost", done: false },
          { id: "sub-2", text: "Water soil", done: true },
        ],
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));

    const loadedTasks = loadTasks();
    expect(Array.isArray(loadedTasks)).toBe(true);
    expect(loadedTasks).toHaveLength(1);
    expect(loadedTasks[0]).toMatchObject({
      id: "task-1",
      title: "Prepare soil bed",
      subtasks: [
        { text: "Gather compost", done: false },
        { text: "Water soil", done: true },
      ],
    });
  });
});
