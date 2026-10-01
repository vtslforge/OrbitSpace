type BookmarkNavbarProps = {
  toggle: boolean;
  toggleUi: () => void;
};

const BookmarkNavbar = ({ toggle, toggleUi }: BookmarkNavbarProps) => {
  return (
    <header className="page-header">
      <div>
        <h1 className="page-title">Bookmarks</h1>
        <p className="page-subtitle">A considered collection of links worth returning to.</p>
      </div>
      <button onClick={toggleUi} className="primary-button" type="button">
        {toggle ? "Close form" : "+ Add bookmark"}
      </button>
    </header>
  );
};

export default BookmarkNavbar;
