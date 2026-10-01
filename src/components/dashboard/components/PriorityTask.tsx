import { type PriorityTaskProps } from "../dashboardTypes";
import { Link } from "react-router-dom";

const priorityOrder = { High: 0, Normal: 1, Low: 2 } as const;

const PriorityTask = ({ tasks }: PriorityTaskProps) => {
  const priorityTasks = [...tasks]
    .sort((firstTask, secondTask) => {
      return (
        priorityOrder[firstTask.priority] - priorityOrder[secondTask.priority]
      );
    })
    .slice(0, 5);

  return (
    <section>
      <div className="priority-task-list">
        {priorityTasks.length === 0 ? (
          <div className="empty-state">
            <p className="text-sm text-gray-500">No tasks yet. Make a plan for what comes next.</p>
            <Link className="section-link" to="/todo">Create a task <span aria-hidden="true">→</span></Link>
          </div>
        ) : (
          priorityTasks.map((task) => (
            <article
              key={task.id}
              className="priority-task-item"
            >
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-gray-900">
                  {task.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {task.description || "No description added."}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-gray-500">
                  {task.dueDate || "No due date"}
                </span>

                <span
                  className={`priority-tag ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default PriorityTask;
