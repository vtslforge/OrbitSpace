import type { useTaskCreationType, taskValuesType } from "../taskTypes";

type FormProps = Pick<useTaskCreationType, "handleSave" | "inputData" | "setInputData">;

const Form = ({ handleSave, inputData, setInputData }: FormProps) => {
  return (
    <section className="task-form-panel">
      <h2 className="mb-4 text-base font-semibold text-gray-900">New task</h2>

      <form onSubmit={handleSave} className="form-stack">
        <label className="form-field">
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
          className="field-control"
        />
        </label>
        <label className="form-field">
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
          className="field-control"
          rows={3}
        />
        </label>
        <label className="form-field">
          Priority
          <select
          value={inputData.priority}
          onChange={(e) =>
            setInputData((prev) => ({
              ...prev,
              priority: e.target.value as taskValuesType["priority"],
            }))
          }
          className="field-control"
        >
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        </label>
        <label className="form-field">
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
          className="field-control"
        />
        </label>
        <button
          type="submit"
          className="primary-button w-full"
        >
          Save task
        </button>
      </form>
    </section>
  );
};

export default Form;
