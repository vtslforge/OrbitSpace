type BookmarkNavbarProps = {
  toggle: boolean;
  toggleUi: () => void;
};

const BookmarkNavbar = ({ toggle, toggleUi }: BookmarkNavbarProps) => {
  return (
    <main className="w-full h-40 border flex justify-center items-center">
      Bookmarks
      <button onClick={toggleUi} className="border p-3" type="button">
        {toggle ? "Hide bookmarks" : "Show bookmarks"}
      </button>
    </main>
  );
};

export default BookmarkNavbar;
