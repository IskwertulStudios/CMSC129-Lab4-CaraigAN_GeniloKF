import TaskCard from "./TaskCard";
import PlantIcon from "./PlantIcon";

export default function TaskList({ tasks, onToggleSubtask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state" data-testid="empty-state">
        <PlantIcon stage="seedling" size={80} />
        <p>Your farm is empty.</p>
        <p>Plant your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleSubtask={onToggleSubtask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
