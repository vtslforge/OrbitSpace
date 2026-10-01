import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/react";

import Auth from "../auth/Auth";
import ProtectedRoute from "../auth/ProtectedRoute";
import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard";
import Task from "../pages/Task";
import Course from "../pages/Course";
import Bookmarks from "../pages/Bookmarks";

const VideoPlayer = lazy(() => import("../components/course/components/VideoPlayer"));

const clerkAppearance = {
  theme: "simple" as const,
  variables: {
    colorBackground: "#fbfcfa",
    colorPrimary: "#236b5b",
    colorText: "#17211f",
    colorInputBackground: "#ffffff",
    colorInputText: "#17211f",
  },
  options: {
    elevation: "flush" as const,
  },
  elements: {
    card: "rounded-xl border border-gray-200 bg-white shadow-sm",
    headerTitle: "font-semibold text-gray-900",
    headerSubtitle: "text-gray-500",
    formFieldLabel: "text-xs font-semibold text-gray-600",
    formFieldInput: "rounded-lg border-gray-200 shadow-none",
    formButtonPrimary: "rounded-lg bg-emerald-800 hover:bg-emerald-900",
    socialButtonsBlockButton: "rounded-lg border-gray-200 shadow-none",
    footerAction: "bg-white",
    footerItem: "bg-white",
  },
};

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Navigate to="/sign-in" replace />} />

      <Route element={<Auth />}>
        <Route
          path="/sign-in"
          element={
            <SignIn
              appearance={clerkAppearance}
            />
          }
        />

        <Route
          path="/sign-up"
          element={
            <SignUp
              appearance={clerkAppearance}
            />
          }
        />
      </Route>

      {/* Protected Route */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/todo" element={<Task />} />
          <Route path="/library" element={<Course />} />
          <Route path="/bookmarks" element={<Bookmarks/>} />
          <Route
            path="/player/:url"
            element={
              <Suspense fallback={<div className="player-loading">Opening course player...</div>}>
                <VideoPlayer />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
};

export default App;
