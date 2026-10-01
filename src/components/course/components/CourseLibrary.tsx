import { useState } from "react";
import type { InputType } from "../hooks/useCourse";

type CourseLibraryProps = {
  savedCourse: InputType[];
  handleDelete: (id: string) => void;
  handleCurrentNavAndValue: (course: InputType) => void;
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
    <div className="library-content">
      <div>
        <div className="library-toolbar">
          <label className="library-search">
            <span className="sr-only">Search courses</span>
            <span className="search-glyph" aria-hidden="true">⌕</span>
            <input
              className="field-control"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses"
              type="search"
            />
          </label>
          <label>
            <span className="sr-only">Filter by category</span>
            <select className="field-control" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option>All categories</option>
              {categories.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by difficulty</span>
            <select className="field-control" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
              <option>All levels</option>
              {[...new Set(savedCourse.map((course) => course.difficulty))].sort().map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <span className="library-count">{filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}</span>
        </div>

        {savedCourse.length === 0 ? (
          <div className="empty-state">
            <h3 className="text-base font-semibold text-gray-900">Your library is ready</h3>
            <p className="mt-2 max-w-sm text-sm text-gray-500">Add a course to keep your learning resources together.</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="empty-state">
            <h3 className="text-base font-semibold text-gray-900">No matching courses</h3>
            <p className="mt-2 text-sm text-gray-500">Try another search term or clear a filter.</p>
            <button className="quiet-button mt-4" onClick={() => { setSearch(""); setCategory("All categories"); setDifficulty("All levels"); }} type="button">Clear filters</button>
          </div>
        ) : (
          <div className="course-grid">
            {filteredCourses.map((saved) => (
              <article
                key={saved.id}
                className="course-card surface-panel"
              >
                <div className="course-card-top">
                  <span className="course-category">{saved.category}</span>
                  <span className="course-level">{saved.difficulty}</span>
                </div>

                <div className="course-card-content">
                  <h3 className="line-clamp-1 text-base font-semibold text-gray-900">{saved.title}</h3>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {saved.description || "No description provided."}
                  </p>
                  <div className="course-card-actions">
                    <button
                      onClick={() => handleCurrentNavAndValue(saved)}
                      className="primary-button"
                    >
                      Open course
                    </button>
                    <button
                      type="button"
                      onClick={() => saved.id && handleDelete(saved.id)}
                      className="quiet-button"
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
