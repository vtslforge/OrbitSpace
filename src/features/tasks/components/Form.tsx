import type { TaskCreationState, Task } from "../types";

type FormProps = Pick<TaskCreationState, "handleSave" | "inputData" | "setInputData">;

const Form = ({ handleSave, inputData, setInputData }: FormProps) => {
  const fieldClass = "min-h-[43px] w-full rounded-[10px] border border-[#e1e8df] bg-white px-3 py-2.5 text-sm text-[#18251f] placeholder:text-[#99a39f] focus:border-[#78a99b] focus:outline-3 focus:outline-[#e3f0eb]";
  const labelClass = "grid gap-1.5 text-xs font-semibold text-[#58665e]";

  return (
    <section className="rounded-2xl border border-[#e4e9e2] bg-white p-5 shadow-[0_8px_24px_rgb(36_57_42_/_5%)]">
      <h2 className="mb-4 text-base font-semibold text-gray-900">New task</h2>

      <form onSubmit={handleSave} className="grid gap-3">
        <label className={labelClass}>
          Task title
          <input
          required
          value={inputData.title}
          onChange={(e) =>
            setInputData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          type="text"
          placeholder="What needs to get done?"
          className={fieldClass}
        />
        </label>
        <label className={labelClass}>
          Details
          <textarea
          required
          value={inputData.description}
          onChange={(e) =>
            setInputData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Add useful context"
          className={`${fieldClass} min-h-[90px] resize-y`}
          rows={3}
        />
        </label>
        <label className={labelClass}>
          Priority
          <select
          value={inputData.priority}
          onChange={(e) =>
            setInputData((prev) => ({
              ...prev,
              priority: e.target.value as Task["priority"],
            }))
          }
          className={fieldClass}
        >
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        </label>
        <label className={labelClass}>
          Due date
          <input
          type="date"
          value={inputData.dueDate}
          onChange={(e) =>
            setInputData((prev) => ({
              ...prev,
              dueDate: e.target.value,
            }))
          }
          className={fieldClass}
        />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-[42px] w-full items-center justify-center rounded-[10px] bg-[#2f704f] px-4 text-sm font-semibold text-white transition hover:bg-[#21573d] active:translate-y-px"
        >
          Save task
        </button>
      </form>
    </section>
  );
};

export default Form;
