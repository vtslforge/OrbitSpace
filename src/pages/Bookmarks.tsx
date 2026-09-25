import { useOutletContext } from "react-router-dom";
import AddBookmark from "../components/bookmarks/components/AddBookmark";
import BookmarksUi from "../components/bookmarks/components/BookmarksUi";
import type { UseBookmarkType } from "../components/bookmarks/hooks/BookmarkTypes";
import BookmarkNavbar from "../components/bookmarks/components/BookmarkNavbar";
import { useToggle } from "../shared/hooks/useToggle";

const Bookmarks = () => {
  const {
    savedBookmarks,
    bookmarkInput,
    handleBookmarkSave,
    setBookmarkInput,
    toggleFavorite,
    handleDelete,
  } = useOutletContext<UseBookmarkType>();

  const { toggle, toggleUi } = useToggle();

  return (
    <div className="relative overflow-hidden">
      <BookmarkNavbar toggle={toggle} toggleUi={toggleUi} />

      <div className="flex border">
        <div className="w-full bg-gray-800">
          <BookmarksUi
            handleDelete={handleDelete}
            savedBookmarks={savedBookmarks}
            toggleFavorite={toggleFavorite}
          />
        </div>
        {toggle && (
          <div className="flex h-200 w-1/5 items-center justify-center bg-amber-600">
            <AddBookmark
              bookmarkInput={bookmarkInput}
              handleBookmarkSave={handleBookmarkSave}
              setBookmarkInput={setBookmarkInput}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;