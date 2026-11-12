import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  useTaskCreation,
  useTaskFilter,
  useToggleForm,
} from "../features/tasks/hooks/useTasks";
import { useLearningProgress } from "../features/library/hooks/useLibrary";
import { useBookmarks } from "../features/bookmarks/hooks/useBookmark";

const Layout = () => {
  const { pathname } = useLocation();
  const toggleFormState = useToggleForm();
  const taskCreationState = useTaskCreation();
  const taskFilterState = useTaskFilter(taskCreationState.savedData);
  const learningProgress = useLearningProgress();
  const bookmarks = useBookmarks();
  const pageTitle = pathname.startsWith("/player/")
    ? "Course player"
    : ({
        "/dashboard": "Overview",
        "/todo": "Tasks",
        "/library": "Learning library",
        "/bookmarks": "Bookmarks",
      }[pathname] ?? "Overview");

  return (
    <div className="grid min-h-screen grid-cols-[272px_minmax(0,1fr)] bg-dash-bg max-[760px]:flex max-[760px]:flex-col">
      <Sidebar />
      <main className="min-h-screen min-w-0 max-[760px]:pb-20">
        <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-4 border-b border-dash-border  px-[clamp(24px,4vw,58px)] backdrop-blur-2xl max-[760px]:min-h-14.5 max-[760px]:px-4.75">
          <div className="flex items-center gap-2.75 text-[9px] font-bold tracking-[1.15px] text-dash-text-muted max-[760px]:hidden">
            <span>YOUR WORKSPACE</span>
            <span className="text-sm font-normal text-dash-icon-muted" aria-hidden="true">/</span>
            <strong className="text-xs font-semibold tracking-normal text-dash-text-main">{pageTitle}</strong>
          </div>
          <Link className="-order-1 inline-flex items-center gap-2.25 font-sans text-[13px] font-extrabold text-dash-text-main no-underline min-[761px]:hidden" to="/dashboard" aria-label="OrbitSpace home">
            <span className="grid size-7.75 place-items-center rounded-2.5 border border-dash-border-strong bg-dash-active text-[0px] text-dash-text-main shadow-xs" aria-hidden="true">
              <span className="grid size-4.25 place-items-center rounded-full border-2 border-current text-xs font-extrabold">o</span>
            </span>
            <span>OrbitSpace</span>
          </Link>
        </header>
        <Outlet
          context={{
            ...toggleFormState,
            ...taskCreationState,
            ...taskFilterState,
            ...learningProgress,
            ...bookmarks
          }}
        />
      </main>
    </div>
  );
};

export default Layout;