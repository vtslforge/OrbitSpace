import type {
  CourseCategory,
  CourseDifficulty,
  CourseFormProps,
} from "../types";

const AddCourse = ({
  handleSave,
  inputValue,
  setInputValue,
}: CourseFormProps) => {
  const fieldClass = "min-h-[43px] w-full rounded-[10px] border border-[#e1e8df] bg-white px-3 py-2.5 text-sm text-[#18251f] placeholder:text-[#99a39f] focus:border-[#78a99b] focus:outline-3 focus:outline-[#e3f0eb]";
  const labelClass = "grid gap-1.5 text-xs font-semibold text-[#58665e]";

  return (
    <form onSubmit={handleSave} className="grid gap-3">
        <label className={labelClass}>
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
          className={fieldClass}
          />
        </label>

        <label className={labelClass}>
          Description
          <textarea
          value={inputValue.description}
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, description: e.target.value }))
          }
          name="description"
          placeholder="What will you learn?"
          rows={3}
          className={`${fieldClass} min-h-[90px] resize-y`}
          />
        </label>

        <label className={labelClass}>
          Category
          <select
          required
          value={inputValue.category === "None" ? "" : inputValue.category}
          onChange={(e) =>
            setInputValue((prev) => ({
              ...prev,
              category: (e.target.value || "None") as CourseCategory,
            }))
          }
          name="category"
          className={fieldClass}
        >
          <option value="" disabled>Select category</option>
          <option value="Programming">Programming</option>
          <option value="Life Skill">Life Skill</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
          <option value="Custom">Custom</option>
        </select>
        </label>

        <label className={labelClass}>
          Difficulty
          <select
          name="difficulty"
          value={inputValue.difficulty}
          onChange={(e) =>
            setInputValue((prev) => ({
              ...prev,
              difficulty: e.target.value as CourseDifficulty,
            }))
          }
          className={fieldClass}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        </label>

        <label className={labelClass}>
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
          className={fieldClass}
          />
        </label>

        <button
          type="submit"
          className="inline-flex min-h-[42px] w-full items-center justify-center rounded-[10px] bg-[#2f704f] px-4 text-sm font-semibold text-white transition hover:bg-[#21573d] active:translate-y-px"
        >
          Save course
        </button>
      </form>
  );
};

export default AddCourse;
