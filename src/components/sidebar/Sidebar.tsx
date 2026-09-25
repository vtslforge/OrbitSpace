import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="min-h-screen w-48 bg-white px-4 py-8 border">
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/todo"
          className={({ isActive }) =>
            `rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          Task's
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            `rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          Library
        </NavLink>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            `rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          Bookmarks
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
