import { Subtask, Task } from "./Task";

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getPlantStage(task) {
  throw new Error("Not implemented");
}

export function getCompletionPercentage(completed, total) {
  throw new Error("Not implemented");
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

export function toggleSubtask() {
  throw new Error("Not implemented");
}
