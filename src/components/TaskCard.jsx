import { getPlantStage } from "../lib/taskLogic";
import PlantIcon from "./PlantIcon";

export default function TaskCard({ task, onToggleSubtask, onDeleteTask }) {
  const stage = getPlantStage(task);
  const completed = task.getCompletedCount();
  const total = task.getTotalCount();
  const pct = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="task-card" data-testid="task-card" data-stage={stage}>
      <PlantIcon stage={stage} />
      <div className="task-card-body">
        <div className="task-card-header">
          <h3 className="task-title">{task.title}</h3>
          <button
            className="btn btn-danger"
            data-testid="delete-task-btn"
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ul className="subtask-list">
          {task.subtasks.map((subtask) => (
            <li key={subtask.id} className="subtask-item">
              <input
                type="checkbox"
                role="checkbox"
                checked={subtask.done}
                onChange={() => onToggleSubtask(task.id, subtask.id)}
              />
              <span className="subtask-text">{subtask.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
