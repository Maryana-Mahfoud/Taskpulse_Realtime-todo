import { NavLink, Outlet } from "react-router-dom";
import NotificationBell from "../notificationBell/NotificationBell";

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

const links = [
  { to: "/", label: "Home", icon: "home", end: true },
  { to: "/tasks", label: "Tasks", icon: "check_circle", end: false },
];

const Layout = () => {
  return (
    <div className="min-h-screen text-on-surface">
      {/* الهيدر */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-surface/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-container to-secondary">
              <Icon name="check" className="!text-[20px] text-on-primary" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight">TaskPulse</span>
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                Tasks
              </span>
            </div>
          </NavLink>

          <div className="flex items-center gap-1">
            {/* روابط الديسكتوب */}
            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-surface-high text-primary"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <NavLink
                to="/new"
                className="ml-2 flex items-center gap-1 rounded-lg bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary shadow-md transition hover:brightness-110 active:scale-95"
              >
                <Icon name="add" className="!text-[18px]" />
                New Task
              </NavLink>
            </nav>

            {/* جرس الإشعارات (موبايل + ديسكتوب) */}
            <NotificationBell />
          </div>
        </div>
      </header>

      {/* محتوى الصفحة */}
      <main className="mx-auto w-full max-w-md px-4 pb-28 pt-20 md:max-w-3xl md:pb-10 lg:max-w-5xl xl:max-w-6xl">
        <Outlet />
      </main>

      {/* الشريط السفلي (موبايل فقط) */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/5 bg-surface/90 backdrop-blur-xl md:hidden">
        <div className="relative mx-auto flex h-16 max-w-md items-center justify-around px-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex h-12 min-w-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`
            }
          >
            <Icon name="home" className="!text-[24px]" />
            Home
          </NavLink>

          <NavLink
            to="/new"
            aria-label="Create task"
            className="-translate-y-4 flex size-[52px] items-center justify-center rounded-full bg-primary-container text-on-primary shadow-[0_8px_20px_rgba(128,131,255,0.35)] transition active:scale-95"
          >
            <Icon name="add" className="!text-[28px]" />
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `flex h-12 min-w-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`
            }
          >
            <Icon name="check_circle" className="!text-[24px]" />
            Tasks
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;