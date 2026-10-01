import type { toggleType } from "../taskTypes";


const Header = ({ toggleForm }: toggleType) => {
  return (
    <header className="task-screen-header">
      <div>
        <h1 className="page-title">Tasks</h1>
        <p className="page-subtitle">Plan your next steps and keep the important work visible.</p>
      </div>
      <button
        onClick={toggleForm}
        type="button"
        className="primary-button"
      >
        {"New task"}
      </button>
    </header>
  );
};

export default Header;
