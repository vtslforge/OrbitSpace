import { useOutletContext } from "react-router-dom";
import Header from "../components/dashboard/components/Header";
import PriorityTask from "../components/dashboard/components/PriorityTask";
import type { TodoOutletContext } from "../components/todo/taskTypes";
import CourseStat from "../components/course/components/CourseStat";
import type { UseStatType } from "../components/course/hooks/useLibrary";
import type { UseBookmarkType } from "../components/bookmarks/hooks/BookmarkTypes";

const Dashboard = () => {
  const { savedData } = useOutletContext<TodoOutletContext>();

  const { currentWatch, handleCurrentNavAndValue } =
    useOutletContext<UseStatType>();

  const { savedBookmarks } = useOutletContext<UseBookmarkType>();

  return (
    <div className="flex w-full flex-col gap-6">
      <Header />

      <PriorityTask tasks={savedData} />

      <CourseStat
        handleCurrentNavAndValue={handleCurrentNavAndValue}
        currentWatch={currentWatch}
      />

      {/* Favorite Bookmarks */}
      <section className="px-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Favorite Bookmarks
            </h2>

            <p className="text-sm text-gray-500">
              Your saved favorite resources
            </p>
          </div>

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            ★{" "}
            {savedBookmarks.filter((bookmark) => bookmark.isFavorite).length}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedBookmarks
            .filter((savedData) => savedData.isFavorite)
            .map((savedData) => (
              <div
                key={savedData.id}
                className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {savedData.title}
                    </h3>

                    <span className="text-xl text-yellow-500">★</span>
                  </div>

                  <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-600">
                    {savedData.description}
                  </p>

                  <span className="mb-5 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {savedData.category}
                  </span>
                </div>

                <a
                  href={savedData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-fit items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Visit →
                </a>
              </div>
            ))}
        </div>

        {savedBookmarks.filter((bookmark) => bookmark.isFavorite).length ===
          0 && (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
            <div className="mb-2 text-3xl">☆</div>

            <h3 className="font-medium text-gray-800">
              No favorite bookmarks
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add some bookmarks to your favorites and they will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;