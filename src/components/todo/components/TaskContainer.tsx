import Form from "./Form";
import {
  type useTaskCreationType,
} from "../taskTypes";

type Props = Pick<useTaskCreationType, "inputData" | "setInputData" | "handleSave" | "handleDelete"> & {
    formStatus?: boolean;
    filteredData: useTaskCreationType["savedData"];
  };

const TaskContainer = ({
  formStatus,
  handleSave,
  inputData,
  handleDelete,
  setInputData,
  filteredData,
}: Props) => {
  return (
    <div className={`task-board${formStatus ? " task-board-with-form" : ""}`}>
      <div className="task-list-area">
        {filteredData.length === 0 ? (
          <div className="empty-state">
            <p className="text-sm text-gray-500">No tasks match this filter.</p>
          </div>
        ) : (
          <div className="task-grid">
            {filteredData.map((task) => (
              <div
                key={task.id}
                className="task-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="line-clamp-2 text-lg font-semibold text-gray-900">
                    {task.title}
                  </h2>

                  <span
                    className={`priority-tag ${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p className="mt-4 line-clamp-4 text-sm leading-6 text-gray-500">
                  {task.description || "No description added."}
                </p>

                <div className="task-card-footer">
                  <span className="text-xs font-medium text-gray-500">
                    {task.dueDate && task.dueDate !== "-" ? `Due ${task.dueDate}` : "No due date"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(task.id)}
                    className="quiet-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form */}
      {formStatus && (
        <aside>
          <Form
            handleSave={handleSave}
            inputData={inputData}
            setInputData={setInputData}
          />
        </aside>
      )}
    </div>
  );
};

export default TaskContainer;
