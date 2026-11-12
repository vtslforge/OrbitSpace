import { Link, useOutletContext } from "react-router-dom";
import PriorityTasks from "./components/PriorityTasks";
import type { TasksOutletContext } from "../tasks/types";
import ContinueLearning from "../library/components/ContinueLearning";
import type { LearningProgressOutletContext } from "../library/hooks/useLibrary";
import type { BookmarksOutletContext } from "../bookmarks/types";
import { ArrowRight, ArrowUpRight, Bookmark, Check } from "lucide-react";

const DashboardPage = () => {
  const { savedData } = useOutletContext<TasksOutletContext>();

  const { currentWatch, handleCurrentNavAndValue } =
    useOutletContext<LearningProgressOutletContext>();
  const { savedBookmarks } = useOutletContext<BookmarksOutletContext>();
  const favoriteBookmarks = savedBookmarks.filter(
    (bookmark) => bookmark.isFavorite,
  );
  const highPriorityCount = savedData.filter(
    (task) => task.priority === "High",
  ).length;

  return (
    <div className="mx-auto w-full max-w-375 px-[clamp(24px,4vw,58px)] pt-8.5 pb-15 select-none max-[760px]:px-4.5 max-[760px]:pt-5.75 max-[760px]:pb-8.5">
      {/* Top Summary Metric Cards */}
      <section
        className="mb-7 grid grid-cols-3 gap-3 max-[760px]:mb-4.75 max-[760px]:gap-2.25 max-[520px]:grid-cols-1"
        aria-label="Workspace summary"
      >
        <article className="flex min-h-22.75 items-center gap-3.25 rounded-2xl border border-dash-border bg-dash-card-surface px-4.25 py-4 shadow-2xs max-[760px]:min-h-20 max-[760px]:gap-2.25 max-[760px]:px-2.5 max-[760px]:py-3 max-[520px]:min-h-17.25 max-[520px]:px-3.5 max-[520px]:py-2.75">
          <div
            className="grid size-9.75 flex-none place-items-center rounded-xl bg-dash-active text-dash-text-main max-[760px]:size-7.75"
            aria-hidden="true"
          >
            <Check size={18} strokeWidth={2.2} />
          </div>
          <div>
            <p className="m-0 text-[10px] font-semibold text-dash-text-muted">
              Things in motion
            </p>
            <p className="mt-1.25 mb-0 font-sans text-2xl font-extrabold tracking-tight text-dash-text-main">
              {savedData.length}
            </p>
          </div>
          <span className="ml-auto text-[10px] text-dash-icon-muted max-[520px]:block">
            tasks
          </span>
        </article>

        <article className="flex min-h-22.75 items-center gap-3.25 rounded-2xl border border-dash-border bg-dash-card-surface px-4.25 py-4 shadow-2xs max-[760px]:min-h-20 max-[760px]:gap-2.25 max-[760px]:px-2.5 max-[760px]:py-3 max-[520px]:min-h-17.25 max-[520px]:px-3.5 max-[520px]:py-2.75">
          <div
            className="grid size-9.75 flex-none place-items-center rounded-xl bg-dash-active text-dash-text-main max-[760px]:size-7.75"
            aria-hidden="true"
          >
            <ArrowUpRight size={18} strokeWidth={1.9} />
          </div>
          <div>
            <p className="m-0 text-[10px] font-semibold text-dash-text-muted">
              Top of the list
            </p>
            <p className="mt-1.25 mb-0 font-sans text-2xl font-extrabold tracking-tight text-dash-text-main">
              {highPriorityCount}
            </p>
          </div>
          <span className="ml-auto text-[10px] text-dash-icon-muted max-[520px]:block">
            high priority
          </span>
        </article>

        <article className="flex min-h-22.75 items-center gap-3.25 rounded-2xl border border-dash-border bg-dash-card-surface px-4.25 py-4 shadow-2xs max-[760px]:min-h-20 max-[760px]:gap-2.25 max-[760px]:px-2.5 max-[760px]:py-3 max-[520px]:min-h-17.25 max-[520px]:px-3.5 max-[520px]:py-2.75">
          <div
            className="grid size-9.75 flex-none place-items-center rounded-xl bg-dash-active text-dash-text-main max-[760px]:size-7.75"
            aria-hidden="true"
          >
            <Bookmark size={17} strokeWidth={1.8} />
          </div>
          <div>
            <p className="m-0 text-[10px] font-semibold text-dash-text-muted">
              Worth keeping
            </p>
            <p className="mt-1.25 mb-0 font-sans text-2xl font-extrabold tracking-tight text-dash-text-main">
              {favoriteBookmarks.length}
            </p>
          </div>
          <span className="ml-auto text-[10px] text-dash-icon-muted max-[520px]:block">
            favorites
          </span>
        </article>
      </section>

      {/* Main Grid Content Sections */}
      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(285px,.85fr)] items-start gap-4.25 max-[1100px]:grid-cols-[minmax(0,1fr)_minmax(250px,.85fr)] max-[760px]:grid-cols-1">
        <section className="min-w-0 rounded-[18px] border border-dash-border bg-dash-card-surface p-5 shadow-2xs max-[520px]:p-4">
          <div className="mb-4.25 flex items-center justify-between gap-3.5">
            <div>
              <h2 className="m-0 font-sans text-sm font-bold tracking-tight text-dash-text-main">
                Priority tasks
              </h2>
              <p className="mt-1 mb-0 text-[11px] text-dash-text-muted">
                Your highest-priority work, first
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-bold text-dash-text-main no-underline hover:underline"
              to="/todo"
            >
              View tasks <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <PriorityTasks tasks={savedData} />
        </section>

        <div className="grid gap-4.25 max-[760px]:gap-3">
          <ContinueLearning
            handleCurrentNavAndValue={handleCurrentNavAndValue}
            currentWatch={currentWatch}
          />

          <section className="min-w-0 rounded-[18px] border border-dash-border bg-dash-card-surface p-5 shadow-2xs max-[520px]:p-4">
            <div className="mb-4.25 flex items-center justify-between gap-3.5">
              <div>
                <h2 className="m-0 font-sans text-sm font-bold tracking-tight text-dash-text-main">
                  Favorite resources
                </h2>
                <p className="mt-1 mb-0 text-[11px] text-dash-text-muted">
                  {favoriteBookmarks.length} saved
                </p>
              </div>
              <Link
                className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-bold text-dash-text-main no-underline hover:underline"
                to="/bookmarks"
              >
                View all <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>

            {favoriteBookmarks.length ? (
              <div className="grid gap-2">
                {favoriteBookmarks.slice(0, 3).map((bookmark) => (
                  <article
                    className="rounded-[13px] border border-dash-border-subtle bg-dash-card-bg p-3.25"
                    key={bookmark.id}
                  >
                    <span className="mb-2 inline-block text-[10px] font-bold uppercase text-dash-text-muted">
                      {bookmark.category}
                    </span>
                    <h3 className="truncate text-sm font-semibold text-dash-text-main">
                      {bookmark.title}
                    </h3>
                    {bookmark.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-dash-text-secondary">
                        {bookmark.description}
                      </p>
                    )}
                    <a
                      className="mt-2.75 inline-flex items-center gap-1.5 text-[11px] font-bold text-dash-text-main no-underline hover:underline"
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open resource{" "}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid min-h-40 content-center justify-items-center gap-3 rounded-[14px] border border-dashed border-dash-border bg-dash-card-bg p-8 text-center">
                <p className="text-sm text-dash-text-muted">
                  Your favorite links will appear here.
                </p>
                <Link
                  className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-bold text-dash-text-main no-underline hover:underline"
                  to="/bookmarks"
                >
                  Browse bookmarks <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
