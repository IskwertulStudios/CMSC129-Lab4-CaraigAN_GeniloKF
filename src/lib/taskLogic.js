import { Subtask, Task } from "./Task";

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getPlantStage(task) {
  if (!(task instanceof Task)) {
    throw new Error("task must be a Task instance");
  }

  const completed = task.getCompletedCount();
  const total = task.getTotalCount();
  const percentage = getCompletionPercentage(completed, total);

  if (percentage < 20) return "seedling";
  if (percentage < 40) return "sprout";
  if (percentage < 60) return "plant";
  if (percentage < 80) return "bigplant";
  if (percentage < 100) return "tree";
  return "fruit";
}

export function getCompletionPercentage(completed, total) {
  if (typeof completed !== "number" || typeof total !== "number") {
    throw new Error("completed and total must be numbers");
  }
  if (!Number.isFinite(completed) || !Number.isFinite(total)) {
    throw new Error("completed and total must be finite");
  }
  if (total <= 0) {
    throw new Error("total must be greater than 0");
  }
  if (completed < 0) {
    throw new Error("completed cannot be negative");
  }
  if (completed > total) {
    throw new Error("completed cannot exceed total");
  }

  return (completed / total) * 100;
}

export function validateTask(draft) {
  if (!draft || typeof draft !== "object") return false;
  if (typeof draft.title !== "string") return false;
  if (!Array.isArray(draft.subtasks)) return false;

  const title = draft.title.trim();
  if (title.length === 0) return false;

  const validSubtasks = draft.subtasks
    .map((subtask) => (typeof subtask === "string" ? subtask.trim() : ""))
    .filter((subtask) => subtask.length > 0);

  return validSubtasks.length > 0;
}

export function createTask(draft) {
  if (!validateTask(draft)) return null;

  const title = draft.title.trim();
  const subtasks = draft.subtasks
    .map((text) => text.trim())
    .filter((text) => text.length > 0)
    .map((text) => new Subtask({ id: makeId(), text, done: false }));

  return new Task({
    id: makeId(),
    title,
    createdAt: Date.now(),
    subtasks,
  });
}

export function editTask() {
  throw new Error("Not implemented");
}

export function deleteTask() {
  throw new Error("Not implemented");
}

export function toggleSubtask(task, subtaskId) {
  if (!(task instanceof Task)) return null;
  if (typeof subtaskId !== "string" || subtaskId.trim().length === 0) return null;

  const idx = task.subtasks.findIndex((subtask) => subtask.id === subtaskId);
  if (idx === -1) return null;

  return new Task({
    id: task.id,
    title: task.title,
    createdAt: task.createdAt,
    subtasks: task.subtasks.map((subtask, i) =>
      i === idx
        ? new Subtask({ id: subtask.id, text: subtask.text, done: !subtask.done })
        : subtask,
    ),
  });
}
