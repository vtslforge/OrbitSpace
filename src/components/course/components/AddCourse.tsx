import type { InputType, UseCourseType } from "../hooks/useCourse";

const AddCourse = ({
  handleSave,
  inputValue,
  setInputValue,
}: UseCourseType) => {
  return (
    <form onSubmit={handleSave} className="form-stack">
        <label className="form-field">
          Course title
          <input
          required
          value={inputValue.title}
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, title: e.target.value }))
          }
          type="text"
          name="title"
          placeholder="e.g. Product design fundamentals"
          className="field-control"
          />
        </label>

        <label className="form-field">
          Description
          <textarea
          value={inputValue.description}
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, description: e.target.value }))
          }
          name="description"
          placeholder="What will you learn?"
          rows={3}
          className="field-control"
          />
        </label>

        <label className="form-field">
          Category
          <select
          required
          value={inputValue.category === "None" ? "" : inputValue.category}
          onChange={(e) =>
            setInputValue((prev) => ({
              ...prev,
              category: (e.target.value || "None") as InputType["category"],
            }))
          }
          name="category"
          className="field-control"
        >
          <option value="" disabled>Select category</option>
          <option value="Programming">Programming</option>
          <option value="Life Skill">Life Skill</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
          <option value="Custom">Custom</option>
        </select>
        </label>

        <label className="form-field">
          Difficulty
          <select
          name="difficulty"
          value={inputValue.difficulty}
          onChange={(e) =>
            setInputValue((prev) => ({
              ...prev,
              difficulty: e.target.value as InputType["difficulty"],
            }))
          }
          className="field-control"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        </label>

        <label className="form-field">
          Course video URL
          <input
          required
          value={inputValue.url}
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, url: e.target.value }))
          }
          type="url"
          name="videoUrl"
          placeholder="https://..."
          className="field-control"
          />
        </label>

        <button
          type="submit"
          className="primary-button w-full"
        >
          Save course
        </button>
      </form>
  );
};

export default AddCourse;
