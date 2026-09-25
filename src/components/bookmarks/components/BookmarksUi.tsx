import type { AddBookmarkType } from "../hooks/BookmarkTypes";

type Props = {
  savedBookmarks: AddBookmarkType[];
  toggleFavorite: (id: string) => void;
  handleDelete: (id: string) => void;
};

const BookmarksUi = ({
  savedBookmarks,
  toggleFavorite,
  handleDelete,
}: Props) => {
  return (
    <div className="p-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {savedBookmarks.map((savedBookmarklist) => (
          <div
            className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            key={savedBookmarklist.id}
          >
            <div>
              <div className="mb-2 flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {savedBookmarklist.title}
                </h2>

                <span className="text-lg">
                  {savedBookmarklist.isFavorite ? "★" : "☆"}
                </span>
              </div>

              <p className="mb-4 text-sm leading-6 text-gray-600">
                {savedBookmarklist.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={savedBookmarklist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Visit
              </a>

              <button
                type="button"
                aria-pressed={savedBookmarklist.isFavorite}
                onClick={() => toggleFavorite(savedBookmarklist.id)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  savedBookmarklist.isFavorite
                    ? "border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                    : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {savedBookmarklist.isFavorite
                  ? "★ Favourite"
                  : "☆ Add Favourite"}
              </button>
              <button
                onClick={() => handleDelete(savedBookmarklist.id)}
                className="rounded-lg border px-4 py-2 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksUi;
