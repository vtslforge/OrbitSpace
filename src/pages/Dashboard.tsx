import { Link, useOutletContext } from "react-router-dom";
import Header from "../components/dashboard/components/Header";
import PriorityTask from "../components/dashboard/components/PriorityTask";
import type { TodoOutletContext } from "../components/todo/taskTypes";
import CourseStat from "../components/course/components/CourseStat";
import type { UseStatType } from "../components/course/hooks/useLibrary";
import type { UseBookmarkType } from "../components/bookmarks/hooks/BookmarkTypes";
import { useClerk } from "@clerk/react";

const Dashboard = () => {
  const { savedData } = useOutletContext<TodoOutletContext>();

  const { currentWatch, handleCurrentNavAndValue } =
    useOutletContext<UseStatType>();

  const { savedBookmarks } = useOutletContext<UseBookmarkType>();
  const { signOut } = useClerk();
  const favoriteBookmarks = savedBookmarks.filter((bookmark) => bookmark.isFavorite);
  const highPriorityCount = savedData.filter((task) => task.priority === "High").length;

  return (
    <div className="page-content">
      <Header onSignOut={() => void signOut()} />

      <section className="dashboard-metrics" aria-label="Workspace summary">
        <article className="metric-panel">
          <p className="metric-label">Active tasks</p>
          <p className="metric-value">{savedData.length}</p>
        </article>
        <article className="metric-panel">
          <p className="metric-label">High priority</p>
          <p className="metric-value">{highPriorityCount}</p>
        </article>
        <article className="metric-panel">
          <p className="metric-label">Saved favorites</p>
          <p className="metric-value">{favoriteBookmarks.length}</p>
        </article>
      </section>

      <div className="dashboard-content-grid">
        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Priority tasks</h2>
              <p>Your highest-priority work, first</p>
            </div>
            <Link className="section-link" to="/todo">View tasks <span aria-hidden="true">→</span></Link>
          </div>
          <PriorityTask tasks={savedData} />
        </section>

        <div className="dashboard-rail">
          <CourseStat
            handleCurrentNavAndValue={handleCurrentNavAndValue}
            currentWatch={currentWatch}
          />

          <section className="dashboard-section">
            <div className="section-heading">
              <div>
                <h2>Favorite resources</h2>
                <p>{favoriteBookmarks.length} saved</p>
              </div>
              <Link className="section-link" to="/bookmarks">View all <span aria-hidden="true">→</span></Link>
            </div>

            {favoriteBookmarks.length ? (
              <div className="dashboard-resource-list">
                {favoriteBookmarks.slice(0, 3).map((bookmark) => (
                  <article className="dashboard-resource" key={bookmark.id}>
                    <span className="resource-type">{bookmark.category}</span>
                    <h3 className="truncate text-sm font-semibold text-gray-900">{bookmark.title}</h3>
                    {bookmark.description && <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">{bookmark.description}</p>}
                    <a className="resource-link" href={bookmark.url} target="_blank" rel="noopener noreferrer">Open resource <span aria-hidden="true">↗</span></a>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state dashboard-empty">
                <p className="text-sm text-gray-500">Your favorite links will appear here.</p>
                <Link className="section-link" to="/bookmarks">Browse bookmarks <span aria-hidden="true">→</span></Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;