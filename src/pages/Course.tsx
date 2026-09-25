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
    <div className="relative overflow-hidden">
      <CourseNav
        savedCourse={savedCourse}
        toggle={toggle}
        toggleUi={toggleUi}
      />
      <div className="border flex">
        <div className="bg-gray-800 w-full">
          <CourseLibrary
            handleCurrentNavAndValue={handleCurrentNavAndValue}
            handleDelete={handleDelete}
            setCurrentWatch={setCurrentWatch}
            savedCourse={savedCourse}
          />
        </div>
        {toggle && (
          <div className="h-200 w-1/5 flex justify-center items-center bg-amber-600">
            <AddCourse
              handleSave={handleSave}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
