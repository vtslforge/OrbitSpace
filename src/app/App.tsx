import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";
import DashboardPage from "../features/dashboard/DashboardPage";
import TasksPage from "../features/tasks/TasksPage";
import LibraryPage from "../features/library/LibraryPage";
import BookmarksPage from "../features/bookmarks/BookmarksPage";

const CoursePlayer = lazy(() => import("../features/library/components/CoursePlayer"));

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/todo" element={<TasksPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route
          path="/player/:url"
          element={
            <Suspense fallback={<div className="grid min-h-[50vh] place-items-center text-sm text-[#78857d]">Opening course player...</div>}>
              <CoursePlayer />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
