import Form from "./Form";
import {
  type TaskCreationState,
} from "../types";

type Props = Pick<TaskCreationState, "inputData" | "setInputData" | "handleSave" | "handleDelete"> & {
    formStatus?: boolean;
    filteredData: TaskCreationState["savedData"];
  };

const TaskBoard = ({
  formStatus,
  handleSave,
  inputData,
  handleDelete,
  setInputData,
  filteredData,
}: Props) => {
  return (
    <div className={`min-h-[calc(100vh-175px)] pt-[17px] pb-12 ${formStatus ? "grid grid-cols-[minmax(0,1fr)_320px] items-start gap-5 max-[760px]:grid-cols-1" : ""}`}>
      <div className="min-w-0">
        {filteredData.length === 0 ? (
          <div className="grid min-h-[220px] content-center justify-items-center rounded-[14px] border border-dashed border-[#d9e3d8] bg-[#fbfcfa] p-8 text-center">
            <p className="text-sm text-gray-500">No tasks match this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 items-start gap-[13px] max-[520px]:grid-cols-1">
            {filteredData.map((task) => (
              <div
                key={task.id}
                className="min-h-[185px] rounded-[15px] border border-[#e5ebe3] bg-white p-[17px] shadow-[0_4px_15px_rgb(36_57_42_/_3%)] transition hover:-translate-y-0.5 hover:border-[#cbd9c9] hover:shadow-[0_10px_24px_rgb(36_57_42_/_7%)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="line-clamp-2 text-lg font-semibold text-gray-900">
                    {task.title}
                  </h2>

                  <span className={`rounded-full px-2 py-[5px] text-[11px] font-bold ${task.priority === "High" ? "bg-[#fbede8] text-[#a75338]" : task.priority === "Normal" ? "bg-[#e8f2ec] text-[#286b54]" : "bg-[#f0f3f1] text-[#65716b]"}`}>
                    {task.priority}
                  </span>
                </div>

                <p className="mt-4 line-clamp-4 text-sm leading-6 text-gray-500">
                  {task.description || "No description added."}
                </p>

                <div className="mt-[18px] flex items-center justify-between gap-2.5 border-t border-[#edf1ed] pt-3">
                  <span className="text-xs font-medium text-gray-500">
                    {task.dueDate && task.dueDate !== "-" ? `Due ${task.dueDate}` : "No due date"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(task.id)}
                    className="min-h-[38px] rounded-[9px] border border-[#e4e9e2] bg-white px-3 text-[13px] font-semibold text-[#47544f] transition hover:border-[#c6d1ca] hover:bg-[#f8faf8]"
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

export default TaskBoard;
