// import ReactPlayer from 'react-player'
import { useOutletContext } from "react-router-dom";
import AddCourse from "../components/course/components/AddCourse";
import CourseLibrary from "../components/course/components/CourseLibrary";
import CourseNav from "../components/course/components/CourseNav";
import { useCourse } from "../components/course/hooks/useCourse";
import type { UseStatType } from "../components/course/hooks/useLibrary";

import { useToggle } from "../shared/hooks/useToggle";

const Course = () => {
  const { toggle, toggleUi } = useToggle();
  const { setCurrentWatch, handleCurrentNavAndValue } =
    useOutletContext<UseStatType>();
  const { handleSave, handleDelete, inputValue, setInputValue, savedCourse } =
    useCourse(setCurrentWatch);

  return (
    <div className="page-content">
      <CourseNav
        savedCourse={savedCourse}
        toggle={toggle}
        toggleUi={toggleUi}
      />
      <div className="library-layout">
        <CourseLibrary
          handleCurrentNavAndValue={handleCurrentNavAndValue}
          handleDelete={handleDelete}
          savedCourse={savedCourse}
        />
        {toggle && (
          <section className="create-panel">
            <h2>Add a course</h2>
            <AddCourse
              handleSave={handleSave}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default Course;
