import { useState } from "react";
import { createTask, validateTask } from "../lib/taskLogic";

export default function TaskForm({ onAddTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState([""]);

  const isValid = validateTask({ title, subtasks });

  function handleAddSubtask() {
    setSubtasks((prev) => [...prev, ""]);
  }

  function handleSubtaskChange(index, value) {
    setSubtasks((prev) => prev.map((s, i) => (i === index ? value : s)));
  }

  function handleRemoveSubtask(index) {
    setSubtasks((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    const task = createTask({ title, subtasks });
    if (task) {
      onAddTask(task);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form
        className="task-form"
        data-testid="task-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2>New Task</h2>

        <div className="form-group">
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            data-testid="task-title-input"
            type="text"
            placeholder="What do you need to do?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Subtasks</label>
          {subtasks.map((value, i) => (
            <div key={i} className="subtask-input-row">
              <input
                data-testid={`subtask-input-${i}`}
                type="text"
                placeholder={`Subtask ${i + 1}`}
                value={value}
                onChange={(e) => handleSubtaskChange(i, e.target.value)}
              />
              {subtasks.length > 1 && (
                <button
                  type="button"
                  className="btn-remove-subtask"
                  onClick={() => handleRemoveSubtask(i)}
                >
                  x
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn-add-subtask"
            data-testid="add-subtask-btn"
            onClick={handleAddSubtask}
          >
            + Add Subtask
          </button>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            data-testid="submit-task-btn"
            disabled={!isValid}
          >
            Plant It
          </button>
        </div>
      </form>
    </div>
  );
}
