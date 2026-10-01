import type { InputType } from "../hooks/useCourse";

type NavProp = {
  savedCourse: InputType[];
  toggle: boolean;
  toggleUi: () => void;
};

const CourseNav = ({ toggle, toggleUi, savedCourse }: NavProp) => {
  return (
    <header className="page-header">
      <div>
        <h1 className="page-title">Learning library</h1>
        <p className="page-subtitle">Keep your courses and learning resources in one place.</p>
      </div>
      <div className="page-header-action">
        <span className="library-count">{savedCourse.length} saved</span>
        <button onClick={toggleUi} className="primary-button" type="button">
          {toggle ? "Close form" : "+ Add course"}
        </button>
      </div>
    </header>
  );
};

export default CourseNav;
