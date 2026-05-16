function toSafeArray(value) {
  return Array.isArray(value) ? value : [];
}

export async function loadTasks() {
  const response = await fetch("/api/tasks");
  if (!response.ok) {
    throw new Error("Failed to load tasks from API");
  }
  const data = await response.json();
  return toSafeArray(data.tasks);
}

export async function saveTasks(tasks) {
  const safeTasks = toSafeArray(tasks);
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tasks: safeTasks }),
  });
  if (!response.ok) {
    throw new Error("Failed to save tasks to API");
  }
  return response.json();
}
