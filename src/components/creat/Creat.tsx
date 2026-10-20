import { push } from "firebase/database";
import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { todosRef } from "../../FirebaseConfig";

type Priority = "low" | "medium" | "high";

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

const priorities: { key: Priority; label: string; icon: string; active: string }[] = [
  { key: "low", label: "Low", icon: "density_small", active: "bg-surface-high text-on-surface" },
  { key: "medium", label: "Med", icon: "equal", active: "bg-primary-container/25 text-primary" },
  { key: "high", label: "High", icon: "local_fire_department", active: "bg-error-container text-error shadow-sm" },
];

const Creat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [text, setText] = useState(
    (location.state as { title?: string } | null)?.title ?? ""
  );
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");
  const [remind, setRemind] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setText("");
    setDescription("");
    setPriority("medium");
    setCategory("Work");
    setDueDate("");
    setRemind(true);
  };

  const addTask = async (event: FormEvent) => {
    event.preventDefault();
    if (!text.trim()) {
      setError("Write The Title of the task first");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await push(todosRef, {
        text: text.trim(),
        description,
        priority,
        category,
        dueDate,
        remind,
        completed: false,
        createdAt: Date.now(),
      });
      resetForm();
      navigate("/tasks");
    } catch (er) {
      console.log("error", er);
      setError("Try Again Please");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={addTask} className="w-full text-on-surface">
      {/* شريط العنوان */}
      <div className="mb-2 flex items-center justify-between py-2 md:mb-4">
        <button
          type="button"
          onClick={resetForm}
          className="h-10 rounded-lg px-2 text-sm font-semibold text-on-surface-variant transition hover:text-on-surface active:scale-95"
        >
          Clear
        </button>
        <div className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-secondary" />
          <span className="font-display text-[17px] font-semibold md:text-xl">Create New Task</span>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex h-10 items-center gap-1 rounded-lg bg-primary-container px-4 text-sm font-semibold text-on-primary shadow-md transition hover:brightness-110 active:scale-95 disabled:opacity-60 md:px-6"
        >
          <Icon name="check" className="!text-[18px]" />
          {saving ? "Saving..." : "Save Task"}
        </button>
      </div>

      {/* البانر */}
      <div className="mb-4 flex h-24 items-center justify-between gap-3 overflow-hidden rounded-xl bg-surface-low p-4 shadow-md md:mb-6 md:h-28 md:px-6">
        <div className="flex max-w-[70%] flex-col justify-center">
          <div className="mb-1 flex items-center gap-1.5">
            <Icon name="bolt" className="!text-[16px] text-secondary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
              Flow State Mode
            </span>
          </div>
          <p className="line-clamp-2 text-xs text-on-surface-variant md:text-sm">
            TaskPulse will schedule high-priority tasks in your optimal focus block tomorrow morning.
          </p>
        </div>
        <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-container to-secondary shadow-inner md:size-20">
          <Icon name="bolt" className="!text-[28px] text-on-primary md:!text-[36px]" />
        </div>
      </div>

      {/* عمودين من lg: المحتوى عالشمال، الخصائص عاليمين */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-start lg:gap-8">
        {/* العنوان والوصف */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          <div className="rounded-xl bg-surface-container p-4 shadow-sm md:p-5">
            <label htmlFor="taskTitle" className="mb-1 block text-[10px] font-bold tracking-wider text-primary">
              TASK TITLE
            </label>
            <input
              id="taskTitle"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Finalize design system documentation"
              className="w-full bg-transparent font-display text-2xl font-bold tracking-tight text-on-surface outline-none placeholder:text-outline-variant/60 md:text-3xl"
            />
            {error && <p className="mt-1 text-xs text-error">{error}</p>}
          </div>

          <div className="rounded-xl bg-surface-container p-4 shadow-sm md:p-5">
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="taskDesc" className="text-[10px] font-bold tracking-wider text-on-surface-variant">
                DESCRIPTION &amp; NOTES
              </label>
              <span className="flex items-center gap-1 text-[10px] font-bold text-outline">
                <Icon name="markdown" className="!text-[14px]" /> Markdown supported
              </span>
            </div>
            <textarea
              id="taskDesc"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, acceptance criteria, or markdown notes..."
              className="w-full resize-none bg-transparent text-sm leading-relaxed text-on-surface outline-none placeholder:text-outline-variant/60 md:text-base lg:min-h-48"
            />
          </div>
        </div>

        {/* الخصائص */}
        <div className="flex flex-col gap-2 lg:col-span-2">
          <span className="px-1 text-[10px] font-bold uppercase tracking-wider text-outline">
            Task Attributes
          </span>

          {/* التاريخ */}
          <label className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-surface-container p-4 shadow-sm transition hover:bg-surface-high">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-bright text-primary">
                <Icon name="calendar_today" className="!text-[22px]" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-[10px] font-bold text-on-surface-variant">Due Date &amp; Time</span>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-on-surface outline-none [color-scheme:dark]"
                />
              </div>
            </div>
            <Icon name="chevron_right" className="shrink-0 text-outline-variant" />
          </label>

          {/* الأولوية */}
          <div className="rounded-xl bg-surface-container p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold text-on-surface-variant">Priority Level</span>
              {priority === "high" && <span className="text-[10px] font-bold text-error">Critical Impact</span>}
            </div>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-surface-lowest p-1">
              {priorities.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setPriority(p.key)}
                  className={`flex items-center justify-center gap-1 rounded-lg py-2.5 text-xs font-semibold transition active:scale-95 ${
                    priority === p.key ? p.active : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <Icon name={p.icon} className="!text-[16px]" />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* التصنيف */}
          <div className="flex w-full items-center justify-between rounded-xl bg-surface-container p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-bright text-secondary">
                <Icon name="folder" className="!text-[22px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-on-surface-variant">Project Category</span>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-secondary-container" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-on-surface outline-none"
                  >
                    <option className="bg-surface-container" value="Work">Work</option>
                    <option className="bg-surface-container" value="Personal">Personal</option>
                    <option className="bg-surface-container" value="Dev">Dev</option>
                  </select>
                </div>
              </div>
            </div>
            <Icon name="expand_more" className="shrink-0 text-outline-variant" />
          </div>

          {/* التذكير */}
          <div className="flex w-full items-center justify-between rounded-xl bg-surface-container p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-bright text-tertiary">
                <Icon name="notifications_active" className="!text-[22px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-on-surface">Remind Me</span>
                <span className="text-xs text-on-surface-variant">15 min before deadline</span>
              </div>
            </div>
            <label className="relative inline-flex shrink-0 cursor-pointer items-center">
              <input
                type="checkbox"
                checked={remind}
                onChange={(e) => setRemind(e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-7 w-12 rounded-full bg-surface-variant transition peer-checked:bg-secondary-container after:absolute after:left-[2px] after:top-[2px] after:size-6 after:rounded-full after:bg-on-surface after:transition-all after:content-[''] peer-checked:after:translate-x-5" />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Creat;