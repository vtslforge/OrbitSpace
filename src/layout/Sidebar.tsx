import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckSquare2,
  Home,
  Sparkles,
} from "lucide-react";

const navigation = [
  { to: "/dashboard", label: "Overview", icon: Home },
  { to: "/todo", label: "Tasks", icon: CheckSquare2 },
  { to: "/library", label: "Library", icon: BookOpen },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
];

const Sidebar = () => {
  return (
    <aside className="sticky top-0 flex h-screen w-68 flex-none flex-col bg-sidebar-bg p-2.5 text-sidebar-text select-none max-[1100px]:w-58 max-[760px]:fixed max-[760px]:inset-x-0 max-[760px]:top-auto max-[760px]:bottom-0 max-[760px]:z-20 max-[760px]:h-auto max-[760px]:w-full max-[760px]:border-t max-[760px]:border-sidebar-border max-[760px]:bg-sidebar-bg/97 max-[760px]:p-2 max-[760px]:backdrop-blur-2xl">
      {/* Inner Rounded Panel */}
      <div className="flex flex-1 flex-col overflow-y-auto rounded-2xl border border-sidebar-border bg-sidebar-panel px-3 py-3.5 shadow-2xs max-[760px]:flex-row max-[760px]:items-center max-[760px]:justify-between max-[760px]:p-2">
        {/* Brand / Logo Header (Hidden on Mobile Nav bar) */}
        <div className="flex items-center gap-3 px-2 pb-5 max-[760px]:hidden">
          <span
            className="flex size-10 flex-none items-center justify-center rounded-xl border border-sidebar-border-strong bg-sidebar-active text-sidebar-text shadow-xs"
            aria-hidden="true"
          >
            <span className="flex size-5.25 items-center justify-center rounded-full border-2 border-current font-sans text-base font-extrabold leading-none">
              o
            </span>
          </span>
          <div className="flex flex-col">
            <p className="m-0 font-sans text-base font-extrabold tracking-tight text-sidebar-text">
              OrbitSpace
            </p>
            <p className="mt-0.5 mb-0 text-[8px] font-bold tracking-[1.25px] text-sidebar-text-muted">
              YOUR QUIET CORNER
            </p>
          </div>
        </div>

        {/* Workspace Label */}
        <div className="mb-2 px-2.5 text-xs font-semibold tracking-tight text-sidebar-text-muted max-[760px]:hidden">
          Workspace
        </div>

        {/* Main Navigation */}
        <nav
          className="flex flex-col gap-0.5 max-[760px]:flex-row max-[760px]:w-full max-[760px]:justify-around"
          aria-label="Main navigation"
        >
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                `group flex h-9 items-center gap-3 rounded-lg px-2.5 text-[13.5px] no-underline transition-colors max-[760px]:h-12 max-[760px]:flex-col max-[760px]:justify-center max-[760px]:gap-0.5 max-[760px]:px-2 max-[760px]:text-[10px] ${
                  isActive
                    ? "bg-sidebar-active font-semibold text-sidebar-text"
                    : "font-medium text-sidebar-text-secondary hover:bg-sidebar-hover hover:text-sidebar-text"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`size-4.25 flex-none transition-colors max-[760px]:size-5 ${
                      isActive ? "text-sidebar-text" : "text-sidebar-text-muted"
                    }`}
                    strokeWidth={1.85}
                  />
                  <span>{label}</span>
                  <ArrowRight
                    className={`ml-auto size-3 text-sidebar-icon-muted transition-all max-[760px]:hidden ${
                      isActive
                        ? "opacity-100"
                        : "-translate-x-1 translate-y-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    }`}
                    aria-hidden="true"
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer / Info Card */}
        <div className="mt-auto flex items-center gap-2.5 rounded-xl border border-sidebar-card-border bg-white px-3 py-3 shadow-2xs max-[760px]:hidden">
          <span
            className="flex size-7.5 flex-none items-center justify-center rounded-lg bg-sidebar-bg text-sidebar-text"
            aria-hidden="true"
          >
            <Sparkles size={15} strokeWidth={1.85} />
          </span>
          <div className="flex flex-col">
            <p className="m-0 text-xs font-semibold text-sidebar-text">
              Made for your focus
            </p>
            <span className="mt-0.5 text-[11px] text-sidebar-text-muted">
              Your space, your pace.
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;