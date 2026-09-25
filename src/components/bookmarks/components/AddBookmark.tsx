import type { Dispatch, SetStateAction } from "react";
import type { AddBookmarkType, BookmarkType } from "../hooks/BookmarkTypes";

type InputProp = {
  bookmarkInput: AddBookmarkType;
  handleBookmarkSave: (e?: React.SubmitEvent<HTMLFormElement>) => void;
  setBookmarkInput: Dispatch<SetStateAction<AddBookmarkType>>;
};

const AddBookmark = ({
  bookmarkInput,
  handleBookmarkSave,
  setBookmarkInput,
}: InputProp) => {
  return (
    <div>
      <form
        onSubmit={handleBookmarkSave}
        className="flex w-full max-w-md flex-col gap-3"
      >
        <input
          type="text"
          value={bookmarkInput.title}
          onChange={(e) =>
            setBookmarkInput((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Title"
          className="rounded-md border px-3 py-2 outline-none"
        />

        <input
          type="text"
          value={bookmarkInput.description}
          onChange={(e) =>
            setBookmarkInput((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Description"
          className="rounded-md border px-3 py-2 outline-none"
        />

        <select
          value={bookmarkInput.category}
          onChange={(e) =>
            setBookmarkInput((prev) => ({
              ...prev,
              category: e.target.value as BookmarkType,
            }))
          }
          className="rounded-md border px-3 py-2 outline-none"
        >
          <option value="Article">Article</option>
          <option value="YouTube">YouTube</option>
          <option value="Documentation">Documentation</option>
          <option value="GitHub">GitHub</option>
          <option value="Blog">Blog</option>
          <option value="Course">Course</option>
          <option value="Website">Website</option>
        </select>

        <input
          type="url"
          value={bookmarkInput.url}
          onChange={(e) =>
            setBookmarkInput((prev) => ({
              ...prev,
              url: e.target.value,
            }))
          }
          placeholder="URL"
          className="rounded-md border px-3 py-2 outline-none"
        />

        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Add Bookmark
        </button>
      </form>
    </div>
  );
};

export default AddBookmark;
