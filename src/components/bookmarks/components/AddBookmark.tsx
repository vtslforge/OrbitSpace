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
    <form
        onSubmit={handleBookmarkSave}
        className="form-stack"
      >
        <label className="form-field">
          Title
          <input
          required
          type="text"
          value={bookmarkInput.title}
          onChange={(e) =>
            setBookmarkInput((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Resource name"
          className="field-control"
          />
        </label>

        <label className="form-field">
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
          className="field-control"
          />
        </label>

        <label className="form-field">
          Type
          <select
          value={bookmarkInput.category}
          onChange={(e) =>
            setBookmarkInput((prev) => ({
              ...prev,
              category: e.target.value as BookmarkType,
            }))
          }
          className="field-control"
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

        <label className="form-field">
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
          className="field-control"
          />
        </label>

        <button
          type="submit"
          className="primary-button w-full"
        >
          Save bookmark
        </button>
      </form>
  );
};

export default AddBookmark;
