import { useEffect, useMemo, useState } from "react";
import { onValue, update, remove, ref } from "firebase/database";
import { db, todosRef } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority?: "high" | "medium" | "low";
  category?: string;
  dueDate?: string;
}

type Filter = "all" | "pending" | "urgent" | "completed";

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

const priorityStyle = {
  high: "bg-error-container text-on-error-container",
  medium: "bg-primary-container/20 text-primary",
  low: "bg-surface-highest text-on-surface-variant",
};
const priorityLabel = { high: "High", medium: "Medium", low: "Low" };

const Read = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list: Todo[] = Object.entries(data).map(([id, value]) => ({
        id,
        ...(value as Omit<Todo, "id">),
      }));
      setTodos(list);
    });
    return () => unsubscribe();
  }, []);

  const toggleTodo = (todo: Todo) =>
    update(ref(db, `todos/${todo.id}`), { completed: !todo.completed });

  const deleteTodo = (id: string) => remove(ref(db, `todos/${id}`));

  // الإحصائيات
  const total = todos.length;
  const doneCount = todos.filter((t) => t.completed).length;
  const pendingCount = total - doneCount;
  const rate = total === 0 ? 0 : Math.round((doneCount / total) * 100);
  const urgentCount = todos.filter((t) => t.priority === "high" && !t.completed).length;

  // البحث + الفلترة
  const visible = useMemo(() => {
    return todos.filter((t) => {
      const matchSearch = t.text?.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === "all" ||
        (filter === "pending" && !t.completed) ||
        (filter === "completed" && t.completed) ||
        (filter === "urgent" && t.priority === "high" && !t.completed);
      return matchSearch && matchFilter;
    });
  }, [todos, search, filter]);

  const chips: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: total },
    { key: "pending", label: "Pending", count: pendingCount },
    { key: "urgent", label: "Urgent", count: urgentCount },
    { key: "completed", label: "Completed", count: doneCount },
  ];

  return (
    <div className="text-on-surface">
      {/* بطاقة التقدم */}
      <section className="relative mb-4 overflow-hidden rounded-2xl border border-white/5 bg-surface-container p-4 shadow-md md:mb-6 md:p-6">
        <div className="pointer-events-none absolute -bottom-6 -right-6 size-32 rounded-full bg-[radial-gradient(circle,rgba(128,131,255,0.18)_0%,transparent_70%)] md:size-48" />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-[22px] font-bold leading-7 tracking-tight md:text-3xl md:leading-9">
              My Tasks
            </h1>
            <p className="mt-0.5 text-[13px] text-on-surface-variant md:mt-1 md:text-sm">
              You have{" "}
              <span className="font-semibold text-primary">{pendingCount} tasks</span> pending
            </p>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap rounded-full bg-surface-high px-2.5 py-1 text-[11px] font-bold text-secondary shadow-sm md:px-3.5 md:py-1.5 md:text-xs">
            <Icon name="bolt" className="!text-[15px]" />
            {doneCount} Done
          </div>
        </div>

        <div className="relative mt-3.5 flex flex-col gap-1.5 border-t border-white/5 pt-2.5 md:mt-5 md:gap-2 md:pt-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-on-surface-variant md:text-xs">
            <span className="flex items-center gap-1">
              <Icon name="trending_up" className="!text-[14px] text-tertiary" />
              Completion
            </span>
            <span className="text-[13px] font-bold text-on-surface md:text-base">{rate}%</span>
          </div>
          <div className="flex h-2 w-full items-center overflow-hidden rounded-full bg-surface-highest p-[1.5px] md:h-2.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary transition-[width] duration-500"
              style={{ width: `${rate}%` }}
            />
          </div>
          <div className="text-[11px] text-on-surface-variant/80 md:text-xs">
            {doneCount} of {total} tasks resolved
          </div>
        </div>
      </section>

      {/* البحث + الفلاتر */}
      <div className="mb-3.5 flex flex-col gap-3 md:mb-5 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex h-12 items-center gap-2.5 rounded-xl bg-surface-high px-3.5 focus-within:bg-surface-highest focus-within:ring-2 focus-within:ring-primary-container md:w-80 md:shrink-0">
          <Icon name="search" className="text-outline" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-outline"
          />
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1.5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-end md:overflow-visible md:px-0 md:pb-0">
          {chips.map((c) => {
            const active = filter === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-[7px] text-xs font-semibold shadow-sm transition active:scale-95 ${
                  active
                    ? "bg-primary-container text-on-primary"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-high hover:text-on-surface"
                }`}
              >
                {c.key === "urgent" && <span className="size-1.5 rounded-full bg-error" />}
                {c.label}
                <span
                  className={`rounded-full px-1.5 py-px text-[10px] font-bold ${
                    active ? "bg-on-primary/25" : "bg-surface-highest"
                  }`}
                >
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* قائمة المهام */}
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {visible.length === 0 && (
          <p className="py-10 text-center text-sm text-on-surface-variant md:col-span-2 xl:col-span-3">
            No tasks found
          </p>
        )}

        {visible.map((todo) => (
          <article
            key={todo.id}
            className={`flex items-start gap-3 rounded-2xl border border-white/[0.03] p-4 shadow-sm transition active:scale-[0.99] md:p-5 ${
              todo.completed
                ? "bg-surface-low/70 opacity-75"
                : "bg-surface-container hover:bg-surface-high"
            }`}
          >
            {/* زر الإنجاز */}
            <button
              onClick={() => toggleTodo(todo)}
              aria-label="Toggle complete"
              className={`mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-md transition ${
                todo.completed ? "bg-secondary" : "bg-surface-highest hover:brightness-125"
              }`}
            >
              <Icon
                name="check"
                className={`!text-base ${todo.completed ? "text-on-secondary" : "text-transparent"}`}
              />
            </button>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={`break-words font-display text-base font-semibold leading-[22px] tracking-tight ${
                    todo.completed ? "text-on-surface-variant line-through" : "text-on-surface"
                  }`}
                >
                  {todo.text}
                </h3>

                {/* أزرار التعديل والحذف */}
                <div className="-mr-1 flex shrink-0 items-center">
                  <button
                    onClick={() => navigate(`/edit/${todo.id}`)}
                    aria-label="Edit task"
                    className="rounded p-0.5 text-outline transition hover:text-primary"
                  >
                    <Icon name="edit" className="!text-[20px]" />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    aria-label="Delete task"
                    className="rounded p-0.5 text-outline transition hover:text-error"
                  >
                    <Icon name="delete" className="!text-[20px]" />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                {todo.completed ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-bold text-on-secondary">
                    <Icon name="done_all" className="!text-[12px]" />
                    Completed
                  </span>
                ) : (
                  todo.priority && (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${priorityStyle[todo.priority]}`}
                    >
                      <span className="size-[5px] rounded-full bg-current" />
                      {priorityLabel[todo.priority]}
                    </span>
                  )
                )}

                {todo.category && (
                  <span className="rounded-full bg-surface-highest px-2 py-0.5 text-[10px] font-bold text-on-surface-variant">
                    {todo.category}
                  </span>
                )}

                {todo.dueDate && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-on-surface-variant">
                    <Icon name="event" className="!text-[14px]" />
                    {todo.dueDate}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Read;