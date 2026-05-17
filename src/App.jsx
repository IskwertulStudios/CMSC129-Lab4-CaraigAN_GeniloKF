import { useState, useEffect, useRef } from "react";
import { loadTasks, saveTasks } from "./lib/storage";
import { toggleSubtask } from "./lib/taskLogic";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    loadTasks()
      .then((loaded) => {
        setTasks(loaded);
        initialized.current = true;
      })
      .catch(() => setTasks([]));
  }, []);

  useEffect(() => {
    if (initialized.current) {
      saveTasks(tasks);
    }
  }, [tasks]);

  function handleAddTask(task) {
    setTasks((prev) => [...prev, task]);
    setShowForm(false);
  }

  function handleToggleSubtask(taskId, subtaskId) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const updated = toggleSubtask(task, subtaskId);
        return updated ?? task;
      }),
    );
  }

  return (
    <>
      <header className="app-header">
        <h1>Harvest Tasks</h1>
        <button
          className="btn btn-primary"
          data-testid="new-task-btn"
          onClick={() => setShowForm(true)}
        >
          + New Task
        </button>
      </header>

      {showForm ? (
        <TaskForm
          onAddTask={handleAddTask}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <TaskList
          tasks={tasks}
          onToggleSubtask={handleToggleSubtask}
        />
      )}
    </>
  );
}
