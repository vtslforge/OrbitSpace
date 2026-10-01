import type { InputType } from "../hooks/useCourse";
import { Link } from "react-router-dom";

type StatProp = {
  currentWatch: InputType[] | undefined;
  handleCurrentNavAndValue: (course: InputType) => void;
};

const CourseStat = ({ currentWatch, handleCurrentNavAndValue }: StatProp) => {
  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <h2>Continue learning</h2>
          <p>Pick up where you left off</p>
        </div>
        <Link className="section-link" to="/library">Library <span aria-hidden="true">→</span></Link>
      </div>

        {currentWatch?.length ? (
          <div>
            {currentWatch.map((watch) => (
              <div
                key={watch.id ?? watch.url}
                className="watch-row"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-gray-400">{watch.category} · {watch.difficulty}</p>
                  <h3 className="mt-1 truncate text-sm font-semibold text-gray-900">{watch.title}</h3>
                  {watch.description && <p className="mt-1 line-clamp-1 text-sm text-gray-500">{watch.description}</p>}
                </div>
                  <button
                    onClick={() => handleCurrentNavAndValue(watch)}
                    className="quiet-button shrink-0"
                  >
                    Resume
                  </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state"><p className="text-sm text-gray-500">Open a course from your library and it will be ready here.</p></div>
        )}
    </section>
  );
};

export default CourseStat;
