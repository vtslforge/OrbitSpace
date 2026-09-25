import type { Dispatch, SetStateAction } from "react";
import type { InputType } from "../hooks/useCourse";

type CourseLibraryProps = {
  savedCourse: InputType[];
  handleDelete: (id: string) => void;
  setCurrentWatch: Dispatch<SetStateAction<InputType[] | undefined>>;
  handleCurrentNavAndValue: (course: InputType) => void;
};

const CourseLibrary = ({
  savedCourse,
  handleDelete,
  handleCurrentNavAndValue,
}: CourseLibraryProps) => {
  return (
    <main className="w-full min-h-125 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Empty State */}
        {savedCourse.length === 0 ? (
          <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 bg-gray-900/50 px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-800 text-2xl">
              📚
            </div>

            <h3 className="text-lg font-semibold text-white">No courses yet</h3>

            <p className="mt-2 max-w-sm text-sm text-gray-400">
              Add your first course to start building your personal learning
              library.
            </p>
          </div>
        ) : (
          /* Course Grid */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {savedCourse.map((saved) => (
              <article
                key={saved.id}
                className="group overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 transition-all duration-200 hover:-translate-y-1 hover:border-gray-600 hover:shadow-xl"
              >
                {/* Course Preview */}
                <div className="relative flex h-36 items-center justify-center bg-gray-800">
                  <div className="text-5xl opacity-70 transition-transform duration-200 group-hover:scale-110">
                    🎓
                  </div>

                  <span className="absolute right-3 top-3 rounded-full bg-gray-950/80 px-3 py-1 text-xs font-medium text-gray-300 backdrop-blur">
                    {saved.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        saved.difficulty === "Beginner"
                          ? "bg-green-500/10 text-green-400"
                          : saved.difficulty === "Intermediate"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {saved.difficulty}
                    </span>
                  </div>

                  <h3 className="line-clamp-1 text-lg font-semibold text-white">
                    {saved.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
                    {saved.description || "No description provided."}
                  </p>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
                    {saved.category || "No description provided."}
                  </p>
                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">
                    <button
                      onClick={() => handleCurrentNavAndValue(saved)}
                      className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-200"
                    >
                      Open Course
                    </button>
                    <button
                      type="button"
                      onClick={() => saved.id && handleDelete(saved.id)}
                      className="rounded-lg border border-red-500/50 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default CourseLibrary;
