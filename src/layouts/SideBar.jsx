
import { NavLink } from "react-router";

export default function SideBar() {
  return (
    <aside className="box-border w-12 sm:w-14 lg:w-45 shrink-0 min-h-screen overflow-x-hidden bg-background flex flex-col p-1">

      {/* Logo and App Name */}
      <div className="w-full min-w-0 flex items-center justify-center lg:justify-start gap-2 p-1 lg:p-2 rounded-sm">
        <span className="w-5 h-5 shrink-0 flex items-center justify-center rounded-sm bg-primary-hover">
          <i className="fa-solid fa-clipboard-check text-[10px] text-surface"></i>
        </span>

        <p className="hidden lg:block min-w-0 flex-1 font-bold text-text text-xs truncate">
          The Agenda
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mt-2 w-full min-w-0">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          title="Dashboard"
          className={({ isActive }) =>
            `w-full box-border min-w-0 flex items-center justify-center lg:justify-start gap-2 p-2 rounded-sm hover:bg-border hover:text-primary-hover cursor-pointer ${
              isActive ? "text-primary-hover" : "text-text"
            }`
          }
        >
          <i className="fa-solid fa-house text-xs w-4 text-center shrink-0"></i>

          <span className="hidden lg:block min-w-0 flex-1 font-medium text-xs truncate">
            Dashboard
          </span>
        </NavLink>

        {/* My Tasks */}
        <NavLink
          to="/tasks"
          title="My Tasks"
          className={({ isActive }) =>
            `w-full box-border min-w-0 flex items-center justify-center lg:justify-start gap-2 p-2 rounded-sm hover:bg-border hover:text-primary-hover cursor-pointer ${
              isActive ? "text-primary-hover" : "text-text"
            }`
          }
        >
          <i className="fa-solid fa-bars-staggered text-xs w-4 text-center shrink-0"></i>

          <span className="hidden lg:block min-w-0 flex-1 font-medium text-xs truncate">
            My Tasks
          </span>
        </NavLink>

      </nav>
    </aside>
  );
}

