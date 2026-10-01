import { useState } from "react";
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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All types");
  const query = search.trim().toLowerCase();
  const filteredBookmarks = savedBookmarks.filter((bookmark) => {
    const matchesSearch = !query || `${bookmark.title} ${bookmark.description} ${bookmark.category}`.toLowerCase().includes(query);
    const matchesCategory = category === "All types" || bookmark.category === category;
    return matchesSearch && matchesCategory;
  });
  const categories = [...new Set(savedBookmarks.map((bookmark) => bookmark.category))].sort();

  return (
    <div className="page-content">
      <BookmarkNavbar toggle={toggle} toggleUi={toggleUi} />

      <div className="library-layout">
        <section className="library-content">
          <div className="library-toolbar bookmark-toolbar">
            <label className="library-search">
              <span className="sr-only">Search bookmarks</span>
              <span className="search-glyph" aria-hidden="true">⌕</span>
              <input className="field-control" type="search" placeholder="Search bookmarks" value={search} onChange={(event) => setSearch(event.target.value)} />
            </label>
            <label>
              <span className="sr-only">Filter by type</span>
              <select className="field-control" value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>All types</option>
                {categories.map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
            <span className="library-count">{filteredBookmarks.length} saved</span>
          </div>
          {filteredBookmarks.length === 0 ? (
            <div className="empty-state"><p className="text-sm text-gray-500">{savedBookmarks.length ? "No bookmarks match those filters." : "Save useful links here for quick access."}</p></div>
          ) : (
            <BookmarksUi
              handleDelete={handleDelete}
              savedBookmarks={filteredBookmarks}
              toggleFavorite={toggleFavorite}
            />
          )}
        </section>
        {toggle && (
          <section className="create-panel">
            <h2>Save a bookmark</h2>
            <AddBookmark
              bookmarkInput={bookmarkInput}
              handleBookmarkSave={handleBookmarkSave}
              setBookmarkInput={setBookmarkInput}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;