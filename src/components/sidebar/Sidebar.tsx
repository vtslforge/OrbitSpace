import { NavLink } from "react-router-dom";

const navigation = [
  { to: "/dashboard", label: "Overview", hint: "01" },
  { to: "/todo", label: "Tasks", hint: "02" },
  { to: "/library", label: "Library", hint: "03" },
  { to: "/bookmarks", label: "Bookmarks", hint: "04" },
];

const Sidebar = () => {
  return (
    <aside className="workspace-sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark" aria-hidden="true">t</span>
        <div>
          <p className="brand-name">OrbitSpace</p>
          <p className="brand-caption">PERSONAL WORKSPACE</p>
        </div>
      </div>

      <div className="sidebar-section-label">Workspace</div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigation.map(({ to, label, hint }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
          >
            <span>{label}</span>
            <span className="sidebar-hint">{hint}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
