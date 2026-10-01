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
    <div className="bookmark-grid">
        {savedBookmarks.map((savedBookmarklist) => (
          <div
            className="bookmark-card"
            key={savedBookmarklist.id}
          >
            <div>
              <div className="bookmark-card-heading">
                <h2 className="line-clamp-2 text-base font-semibold text-gray-900">
                  {savedBookmarklist.title}
                </h2>
                <span className="bookmark-category">{savedBookmarklist.category}</span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                {savedBookmarklist.description}
              </p>
            </div>

            <div className="bookmark-card-actions">
              <a
                href={savedBookmarklist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button"
              >
                Open
              </a>

              <button
                type="button"
                aria-pressed={savedBookmarklist.isFavorite}
                aria-label={savedBookmarklist.isFavorite ? "Remove from favorites" : "Add to favorites"}
                title={savedBookmarklist.isFavorite ? "Remove from favorites" : "Add to favorites"}
                onClick={() => toggleFavorite(savedBookmarklist.id)}
                className="icon-action"
              >
                {savedBookmarklist.isFavorite ? "★" : "☆"}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(savedBookmarklist.id)}
                className="quiet-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookmarksUi;
