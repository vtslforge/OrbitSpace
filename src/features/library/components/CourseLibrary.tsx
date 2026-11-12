import { useState } from "react";
import type { Course } from "../types";
import { Search } from "lucide-react";

type CourseLibraryProps = {
  savedCourse: Course[];
  handleDelete: (id: string) => void;
  handleCurrentNavAndValue: (course: Course) => void;
};

const CourseLibrary = ({
  savedCourse,
  handleDelete,
  handleCurrentNavAndValue,
}: CourseLibraryProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [difficulty, setDifficulty] = useState("All levels");
  const categories = [...new Set(savedCourse.map((course) => course.category))]
    .filter((value) => value && value !== "None")
    .sort();
  const query = search.trim().toLowerCase();
  const filteredCourses = savedCourse.filter((course) => {
    const matchesSearch =
      !query ||
      `${course.title} ${course.description} ${course.category}`
        .toLowerCase()
        .includes(query);
    const matchesCategory = category === "All categories" || course.category === category;
    const matchesDifficulty = difficulty === "All levels" || course.difficulty === difficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-w-0">
      <div>
        <div className="mb-4 grid grid-cols-[minmax(220px,1fr)_minmax(150px,190px)_minmax(130px,160px)_auto] items-center gap-[9px] max-[760px]:grid-cols-2 max-[520px]:grid-cols-1">
          <label className="relative">
            <span className="sr-only">Search courses</span>
            <Search className="absolute top-1/2 left-[13px] z-[1] size-4 -translate-y-1/2 text-[#819089]" aria-hidden="true" />
            <input
              className="min-h-[43px] w-full rounded-[10px] border border-[#e1e8df] bg-white py-2.5 pr-3 pl-[37px] text-sm text-[#18251f] placeholder:text-[#99a39f] focus:border-[#78a99b] focus:outline-3 focus:outline-[#e3f0eb]"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses"
              type="search"
            />
          </label>
          <label>
            <span className="sr-only">Filter by category</span>
            <select className="min-h-[43px] w-full rounded-[10px] border border-[#e1e8df] bg-white px-3 py-2.5 text-sm text-[#18251f] focus:border-[#78a99b] focus:outline-3 focus:outline-[#e3f0eb]" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option>All categories</option>
              {categories.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by difficulty</span>
            <select className="min-h-[43px] w-full rounded-[10px] border border-[#e1e8df] bg-white px-3 py-2.5 text-sm text-[#18251f] focus:border-[#78a99b] focus:outline-3 focus:outline-[#e3f0eb]" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
              <option>All levels</option>
              {[...new Set(savedCourse.map((course) => course.difficulty))].sort().map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <span className="whitespace-nowrap text-right text-xs text-[#78857d] max-[760px]:col-start-2 max-[520px]:col-auto max-[520px]:text-left">{filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}</span>
        </div>

        {savedCourse.length === 0 ? (
          <div className="grid min-h-[220px] content-center justify-items-center rounded-[14px] border border-dashed border-[#d9e3d8] bg-[#fbfcfa] p-8 text-center">
            <h3 className="text-base font-semibold text-gray-900">Your library is ready</h3>
            <p className="mt-2 max-w-sm text-sm text-gray-500">Add a course to keep your learning resources together.</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="grid min-h-[220px] content-center justify-items-center rounded-[14px] border border-dashed border-[#d9e3d8] bg-[#fbfcfa] p-8 text-center">
            <h3 className="text-base font-semibold text-gray-900">No matching courses</h3>
            <p className="mt-2 text-sm text-gray-500">Try another search term or clear a filter.</p>
            <button className="mt-4 min-h-[38px] rounded-[9px] border border-[#e4e9e2] bg-white px-3 text-[13px] font-semibold text-[#47544f] transition hover:border-[#c6d1ca] hover:bg-[#f8faf8]" onClick={() => { setSearch(""); setCategory("All categories"); setDifficulty("All levels"); }} type="button">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-[14px] max-[1100px]:grid-cols-2 max-[760px]:grid-cols-2 max-[520px]:grid-cols-1">
            {filteredCourses.map((saved) => (
              <article
                key={saved.id}
                className="overflow-hidden rounded-[15px] border border-[#e5ebe3] bg-white shadow-[0_4px_15px_rgb(36_57_42_/_3%)] transition hover:-translate-y-0.5 hover:border-[#cbd8d0] hover:shadow-[0_10px_28px_rgb(32_55_43_/_6%)]"
              >
                <div className="flex min-h-16 items-center justify-between border-b border-[#edf1ed] bg-[linear-gradient(115deg,#eef5ef,#f9faf7_75%)] px-[18px] py-[15px]">
                  <span className="rounded-full bg-white px-[9px] py-1.5 text-[11px] font-bold text-[#52635a]">{saved.category}</span>
                  <span className="rounded-full bg-[#e3f0e8] px-[9px] py-1.5 text-[11px] font-bold text-[#20533f]">{saved.difficulty}</span>
                </div>

                <div className="px-[18px] pt-[17px] pb-4">
                  <h3 className="line-clamp-1 text-base font-semibold text-gray-900">{saved.title}</h3>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {saved.description || "No description provided."}
                  </p>
                  <div className="mt-[17px] flex items-center gap-2 border-t border-[#edf1ed] pt-[14px]">
                    <button
                      onClick={() => handleCurrentNavAndValue(saved)}
                      className="inline-flex min-h-[42px] items-center justify-center rounded-[10px] bg-[#2f704f] px-4 text-sm font-semibold text-white transition hover:bg-[#21573d] active:translate-y-px"
                    >
                      Open course
                    </button>
                    <button
                      type="button"
                      onClick={() => saved.id && handleDelete(saved.id)}
                      className="min-h-[38px] rounded-[9px] border border-[#e4e9e2] bg-white px-3 text-[13px] font-semibold text-[#47544f] transition hover:border-[#c6d1ca] hover:bg-[#f8faf8]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLibrary;
