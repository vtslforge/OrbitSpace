import type { Dispatch, SetStateAction } from "react";
import type { Bookmark, BookmarkCategory } from "../types";

type InputProp = {
  bookmarkInput: Bookmark;
  handleBookmarkSave: (e?: React.SubmitEvent<HTMLFormElement>) => void;
  setBookmarkInput: Dispatch<SetStateAction<Bookmark>>;
};

const AddBookmark = ({
  bookmarkInput,
  handleBookmarkSave,
  setBookmarkInput,
}: InputProp) => {
  const fieldClass =
    "min-h-[43px] w-full rounded-[10px] border border-[#e1e8df] bg-white px-3 py-2.5 text-sm text-[#18251f] placeholder:text-[#99a39f] focus:border-[#78a99b] focus:outline-3 focus:outline-[#e3f0eb]";
  const labelClass = "grid gap-1.5 text-xs font-semibold text-[#58665e]";

  return (
    <form onSubmit={handleBookmarkSave} className="grid gap-3">
      <label className={labelClass}>
        Title
        <input
          required
          type="text"
          value={bookmarkInput.title}
          onChange={(e) =>
            setBookmarkInput((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Resource name"
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        Description
        <input
          type="text"
          value={bookmarkInput.description}
          onChange={(e) =>
            setBookmarkInput((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Why is it useful?"
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        Type
        <select
          value={bookmarkInput.category}
          onChange={(e) =>
            setBookmarkInput((prev) => ({
              ...prev,
              category: e.target.value as BookmarkCategory,
            }))
          }
          className={fieldClass}
        >
          <option value="Article">Article</option>
          <option value="YouTube">YouTube</option>
          <option value="Documentation">Documentation</option>
          <option value="GitHub">GitHub</option>
          <option value="Blog">Blog</option>
          <option value="Course">Course</option>
          <option value="Website">Website</option>
        </select>
      </label>

      <label className={labelClass}>
        URL
        <input
          required
          type="url"
          value={bookmarkInput.url}
          onChange={(e) =>
            setBookmarkInput((prev) => ({
              ...prev,
              url: e.target.value,
            }))
          }
          placeholder="https://..."
          className={fieldClass}
        />
      </label>

      <button
        type="submit"
        className="inline-flex min-h-10.5 w-full items-center justify-center rounded-[10px] bg-[#2f704f] px-4 text-sm font-semibold text-white transition hover:bg-[#21573d] active:translate-y-px"
      >
        Save bookmark
      </button>
    </form>
  );
};

export default AddBookmark;
