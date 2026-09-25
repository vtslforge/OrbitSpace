import type { InputType, UseCourseType } from "../hooks/useCourse";

const AddCourse = ({
  handleSave,
  inputValue,
  setInputValue,
}: UseCourseType) => {
  return (
    <div className="    flex justify-center items-center">
      <form onSubmit={handleSave} className="space-y-4">
        <input
          value={inputValue.title}
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, title: e.target.value }))
          }
          type="text"
          name="title"
          placeholder="Course title"
          className="w-full rounded-lg border px-4 py-3 outline-none"
        />

        <textarea
          value={inputValue.description}
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, description: e.target.value }))
          }
          name="description"
          placeholder="Course description"
          rows={4}
          className="w-full rounded-lg border px-4 py-3 outline-none"
        />

        <select
          value={inputValue.category}
          onChange={(e) =>
            setInputValue((prev) => ({
              ...prev,
              category: e.target.value as InputType["category"],
            }))
          }
          name="category"
          className="w-full rounded-lg border px-4 py-3 outline-none"
        >
          <option value="">Select category</option>
          <option value="programming">Programming</option>
          <option value="web-development">Web Development</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
        </select>

        <select
          name="difficulty"
          value={inputValue.difficulty}
          onChange={(e) =>
            setInputValue((prev) => ({
              ...prev,
              difficulty: e.target.value as InputType["difficulty"],
            }))
          }
          className="w-full rounded-lg border px-4 py-3 outline-none"
        >
          <option value="">Select difficulty</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <input
          value={inputValue.url}
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, url: e.target.value }))
          }
          type="url"
          name="videoUrl"
          placeholder="Video link"
          className="w-full rounded-lg border px-4 py-3 outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-lg px-4 py-3 font-medium"
        >
          Save Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
