// import ReactPlayer from 'react-player'
import { useOutletContext } from "react-router-dom";
import AddCourse from "./components/AddCourse";
import CourseLibrary from "./components/CourseLibrary";
import LibraryHeader from "./components/LibraryHeader";
import { useCourse } from "./hooks/useCourse";
import type { LearningProgressOutletContext } from "./hooks/useLibrary";

import { useToggle } from "../../shared/hooks/useToggle";

const LibraryPage = () => {
  const { toggle, toggleUi } = useToggle();
  const { setCurrentWatch, handleCurrentNavAndValue } =
    useOutletContext<LearningProgressOutletContext>();
  const { handleSave, handleDelete, inputValue, setInputValue, savedCourse } =
    useCourse(setCurrentWatch);

  return (
    <div className="mx-auto w-full max-w-[1500px] px-[clamp(24px,4vw,58px)] pt-[34px] pb-[60px] max-[760px]:px-[18px] max-[760px]:pt-[23px] max-[760px]:pb-[34px]">
      <LibraryHeader
        savedCourse={savedCourse}
        toggle={toggle}
        toggleUi={toggleUi}
      />
      <div className={`grid items-start gap-4 ${toggle ? "grid-cols-[minmax(0,1fr)_310px] max-[1100px]:grid-cols-[minmax(0,1fr)_280px] max-[760px]:grid-cols-1" : "grid-cols-1"}`}>
        <CourseLibrary
          handleCurrentNavAndValue={handleCurrentNavAndValue}
          handleDelete={handleDelete}
          savedCourse={savedCourse}
        />
        {toggle && (
          <section className="sticky top-[84px] rounded-2xl border border-[#e4e9e2] bg-white p-5 shadow-[0_8px_24px_rgb(36_57_42_/_5%)] max-[760px]:static">
            <h2 className="mb-[18px] mt-0 font-[Manrope,sans-serif] text-base font-bold">Add a course</h2>
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

export default LibraryPage;
