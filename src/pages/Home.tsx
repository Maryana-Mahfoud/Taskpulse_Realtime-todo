import { useNavigate } from "react-router-dom";

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

const starters = [
  { icon: "terminal", color: "text-primary", title: "Work sprint goals", desc: "Define 3 core deliverables for this cycle" },
  { icon: "self_improvement", color: "text-secondary", title: "Daily wellness & habits", desc: "Hydration, mindful walks, reading routines" },
  { icon: "cloud_sync", color: "text-tertiary", title: "Plan my week", desc: "Turn scattered ideas into active tasks" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {/* الشريط العلوي الصغير */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-high px-2.5 py-1 text-[10px] font-bold text-secondary shadow-sm">
          <span className="size-1.5 animate-pulse rounded-full bg-secondary" />
          Ready to start
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-[10px] font-bold text-tertiary">
          <Icon name="local_fire_department" className="!text-[13px]" />
          Stay in flow
        </span>
      </div>

      {/* الكرت الرئيسي */}
      <section className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-surface-low p-6 text-center shadow-xl md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary-container/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-secondary/10 blur-3xl" />

        {/* الرسمة */}
        <div className="group relative my-2 flex size-36 items-center justify-center md:size-44">
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-surface-high via-surface-container to-surface-variant/40 shadow-inner" />
          <svg className="relative z-10 size-full" fill="none" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="planeGrad" gradientUnits="userSpaceOnUse" x1="40" x2="120" y1="30" y2="130">
                <stop offset="0%" stopColor="#c0c1ff" />
                <stop offset="60%" stopColor="#8083ff" />
                <stop offset="100%" stopColor="#494bd6" />
              </linearGradient>
              <linearGradient id="trailGrad" gradientUnits="userSpaceOnUse" x1="30" x2="90" y1="120" y2="70">
                <stop offset="0%" stopColor="#4edea3" stopOpacity="0" />
                <stop offset="100%" stopColor="#4edea3" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path d="M 28 126 C 45 120, 64 96, 92 68" stroke="url(#trailGrad)" strokeDasharray="4 4" strokeLinecap="round" strokeWidth="2.5" />
            <rect fill="#222a3d" height="34" opacity="0.8" rx="6" transform="rotate(-14 26 52)" width="28" x="26" y="52" />
            <line stroke="#908fa0" strokeLinecap="round" strokeWidth="2" x1="32" x2="44" y1="63" y2="60" />
            <line stroke="#908fa0" strokeLinecap="round" strokeWidth="2" x1="34" x2="48" y1="71" y2="67" />
            <rect fill="#2d3449" height="30" opacity="0.85" rx="5" transform="rotate(18 108 76)" width="26" x="108" y="76" />
            <circle cx="116" cy="88" fill="#4edea3" r="2.5" />
            <line stroke="#c7c4d7" strokeLinecap="round" strokeWidth="1.8" x1="122" x2="130" y1="88" y2="88" />
            <g className="origin-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
              <polygon fill="url(#planeGrad)" points="128,40 44,78 84,94" />
              <polygon fill="#6366f1" points="128,40 84,94 102,96" />
              <polygon fill="#494bd6" opacity="0.9" points="84,94 88,114 96,95" />
              <circle cx="128" cy="40" fill="#ffffff" r="3.5" />
            </g>
            <path d="M120 22L122 26L126 28L122 30L120 34L118 30L114 28L118 26Z" fill="#ffb95f" />
            <path d="M42 28L43.5 31L46.5 32.5L43.5 34L42 37L40.5 34L37.5 32.5L40.5 31Z" fill="#4edea3" />
          </svg>
        </div>

        <h1 className="mb-1 mt-2 font-display text-2xl font-bold tracking-tight md:text-4xl">
          Your day is yours to organize
        </h1>
        <p className="mb-6 max-w-[280px] text-sm leading-relaxed text-on-surface-variant md:max-w-md md:text-base">
          Start by capturing a thought, project milestone, or quick reminder to get into your flow.
        </p>

        <div className="flex w-full max-w-[300px] flex-col gap-2">
          <button
            onClick={() => navigate("/new")}
            className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-on-primary shadow-[0_8px_20px_rgba(128,131,255,0.3)] transition hover:shadow-[0_10px_24px_rgba(128,131,255,0.45)] active:scale-[0.98]"
          >
            <Icon name="add" className="transition-transform group-hover:rotate-90" />
            Create your first task
          </button>
          <button
            onClick={() => navigate("/tasks")}
            className="flex h-11 items-center justify-center gap-1.5 rounded-lg bg-surface-high text-xs font-semibold transition hover:bg-surface-variant active:scale-[0.98]"
          >
            <Icon name="checklist" className="!text-[17px] text-primary" />
            View my tasks
          </button>
        </div>
      </section>

      {/* بدايات سريعة */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide">
            <Icon name="bolt" className="!text-[16px] text-tertiary" />
            Quick ways to start
          </span>
          <span className="text-[10px] font-bold text-on-surface-variant">Tap to create</span>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {starters.map((s) => (
            <button
              key={s.title}
              onClick={() => navigate("/new", { state: { title: s.title } })}
              className="group flex items-center justify-between rounded-lg bg-surface-low p-4 text-left transition hover:bg-surface-container active:scale-[0.99]"
            >
              <div className="flex min-w-0 items-center gap-2">
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-high ${s.color}`}>
                  <Icon name={s.icon} className="!text-[18px]" />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-xs font-semibold">{s.title}</span>
                  <span className="truncate text-xs text-on-surface-variant">{s.desc}</span>
                </div>
              </div>
              <Icon name="add_circle" className="ml-2 shrink-0 text-on-surface-variant transition group-hover:text-primary" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;