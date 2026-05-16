import { createTask } from "../../src/lib/taskLogic";
import { loadTasks, saveTasks } from "../../src/lib/storage";

describe("storage integration", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("saves a created task to express API", async () => {
    const createdTask = createTask({
      title: "Prepare soil bed",
      subtasks: ["Gather compost", "Water soil"],
    });

    expect(createdTask).not.toBeNull();

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, count: 1 }),
    });

    const result = await saveTasks([createdTask]);

    expect(fetch).toHaveBeenCalledWith("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: [createdTask] }),
    });
    expect(result).toMatchObject({ ok: true, count: 1 });
  });

  test("loads tasks from express API", async () => {
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
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ tasks: seeded }),
    });

    const loadedTasks = await loadTasks();
    expect(fetch).toHaveBeenCalledWith("/api/tasks");
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
