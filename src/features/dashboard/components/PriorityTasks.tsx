import { type PriorityTaskProps } from "../types";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const priorityOrder = { High: 0, Normal: 1, Low: 2 } as const;

const PriorityTasks = ({ tasks }: PriorityTaskProps) => {
  const priorityTasks = [...tasks]
    .sort((firstTask, secondTask) => {
      return (
        priorityOrder[firstTask.priority] - priorityOrder[secondTask.priority]
      );
    })
    .slice(0, 5);

  return (
    <section>
      <div className="grid gap-2">
        {priorityTasks.length === 0 ? (
          <div className="grid min-h-[220px] content-center justify-items-center gap-3 rounded-[14px] border border-dashed border-[#d9e3d8] bg-[#fbfcfa] p-8 text-center">
            <p className="text-sm text-gray-500">No tasks yet. Make a plan for what comes next.</p>
            <Link className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-bold text-[#3a7557] no-underline hover:underline" to="/todo">Create a task <ArrowRight size={13} aria-hidden="true" /></Link>
          </div>
        ) : (
          priorityTasks.map((task) => (
            <article
              key={task.id}
              className="grid gap-[11px] rounded-[13px] border border-[#e9eee7] bg-[#fbfcfa] p-[14px]"
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

                <span className={`rounded-full px-2 py-[5px] text-[11px] font-bold ${task.priority === "High" ? "bg-[#fbede8] text-[#a75338]" : task.priority === "Normal" ? "bg-[#e8f2ec] text-[#286b54]" : "bg-[#f0f3f1] text-[#65716b]"}`}>
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

export default PriorityTasks;
