import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AddBookmark from "./components/AddBookmark";
import BookmarkGrid from "./components/BookmarkGrid";
import type { BookmarksOutletContext } from "./types";
import BookmarksHeader from "./components/BookmarksHeader";
import { useToggle } from "../../shared/hooks/useToggle";
import { Search } from "lucide-react";

const BookmarksPage = () => {
  const {
    savedBookmarks,
    bookmarkInput,
    handleBookmarkSave,
    setBookmarkInput,
    toggleFavorite,
    handleDelete,
  } = useOutletContext<BookmarksOutletContext>();

  const { toggle, toggleUi } = useToggle();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All types");
  const query = search.trim().toLowerCase();
  const filteredBookmarks = savedBookmarks.filter((bookmark) => {
    const matchesSearch =
      !query ||
      `${bookmark.title} ${bookmark.description} ${bookmark.category}`
        .toLowerCase()
        .includes(query);
    const matchesCategory =
      category === "All types" || bookmark.category === category;
    return matchesSearch && matchesCategory;
  });
  const categories = [
    ...new Set(savedBookmarks.map((bookmark) => bookmark.category)),
  ].sort();

  return (
    <div className="mx-auto w-full max-w-375 px-[clamp(24px,4vw,58px)] pt-8.5 pb-15 select-none max-[760px]:px-4.5 max-[760px]:pt-5.75 max-[760px]:pb-8.5">
      <BookmarksHeader toggle={toggle} toggleUi={toggleUi} />

      <div
        className={`grid items-start gap-4 ${toggle ? "grid-cols-[minmax(0,1fr)_310px] max-[1100px]:grid-cols-[minmax(0,1fr)_280px] max-[760px]:grid-cols-1" : "grid-cols-1"}`}
      >
        <section className="min-w-0">
          <div className="mb-4 grid grid-cols-[minmax(220px,1fr)_minmax(150px,190px)_auto] items-center gap-2.25 max-[760px]:grid-cols-2 max-[520px]:grid-cols-1">
            <label className="relative">
              <span className="sr-only">Search bookmarks</span>
              <Search
                className="absolute top-1/2 left-3.25 z-1 size-4 -translate-y-1/2 text-dash-text-muted"
                aria-hidden="true"
              />
              <input
                className="min-h-10.75 w-full rounded-[10px] border border-dash-border bg-dash-card-surface py-2.5 pr-3 pl-9.25 text-sm text-dash-text-main placeholder:text-dash-text-muted focus:border-dash-text-muted focus:outline-3 focus:outline-dash-active"
                type="search"
                placeholder="Search bookmarks"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <label>
              <span className="sr-only">Filter by type</span>
              <select
                className="min-h-10.75 w-full rounded-[10px] border border-dash-border bg-dash-card-surface px-3 py-2.5 text-sm text-dash-text-main focus:border-dash-text-muted focus:outline-3 focus:outline-dash-active"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>All types</option>
                {categories.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <span className="whitespace-nowrap text-right text-xs text-dash-text-muted max-[760px]:col-start-2 max-[520px]:col-auto max-[520px]:text-left">
              {filteredBookmarks.length} saved
            </span>
          </div>
          {filteredBookmarks.length === 0 ? (
            <div className="grid min-h-55 content-center justify-items-center rounded-[14px] border border-dashed border-dash-border bg-dash-card-bg p-8 text-center">
              <p className="text-sm text-dash-text-muted">
                {savedBookmarks.length
                  ? "No bookmarks match those filters."
                  : "Save useful links here for quick access."}
              </p>
            </div>
          ) : (
            <BookmarkGrid
              handleDelete={handleDelete}
              savedBookmarks={filteredBookmarks}
              toggleFavorite={toggleFavorite}
            />
          )}
        </section>
        {toggle && (
          <section className="sticky top-21 rounded-2xl border border-dash-border bg-dash-card-surface p-5 shadow-2xs max-[760px]:static">
            <h2 className="mb-4.5 mt-0 font-sans text-base font-bold text-dash-text-main">
              Save a bookmark
            </h2>
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

export default BookmarksPage;
