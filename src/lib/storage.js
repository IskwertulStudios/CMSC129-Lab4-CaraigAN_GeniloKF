export function loadTasks() {
  try {
    const raw = localStorage.getItem("harvest-tasks-v1");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  localStorage.setItem("harvest-tasks-v1", JSON.stringify(safeTasks));
}
