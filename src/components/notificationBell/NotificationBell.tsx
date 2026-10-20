import { useEffect, useRef, useState } from "react";
import { onChildAdded } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { todosRef } from "../../FirebaseConfig";

type Notif = { id: string; text: string; time: number };

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

const NotificationBell = () => {
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const startTime = useRef(Date.now());
  const boxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  //listen to new task
  useEffect(() => {
    const unsubscribe = onChildAdded(todosRef, (snapshot) => {
      const data = snapshot.val();
      //ignore last tasks
      if (!data?.createdAt || data.createdAt < startTime.current) return;

      setNotifs((prev) => [
        { id: snapshot.key!, text: data.text, time: data.createdAt },
        ...prev,
      ]);
      setUnread((n) => n + 1);
    });
    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = () => {
    setOpen((o) => !o);
    setUnread(0); 
  };

  const timeAgo = (t: number) => {
    const s = Math.floor((Date.now() - t) / 1000);
    if (s < 60) return "now";
    if (s < 3600) return `before ${Math.floor(s / 60)} د`;
    return `قبل ${Math.floor(s / 3600)} h`;
  };

  return (
    <div ref={boxRef} className="relative">
      <button
        onClick={toggle}
        aria-label="Notifications"
        className="relative flex size-10 items-center justify-center rounded-full text-on-surface-variant transition hover:bg-surface-high hover:text-on-surface active:scale-95"
      >
        <Icon name="notifications" />
        {unread > 0 && (
          <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold leading-4 text-on-secondary ring-2 ring-surface">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-3 top-[72px] z-[60] overflow-hidden rounded-2xl border border-white/5 bg-surface-container shadow-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-80">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <span className="font-display text-sm font-semibold">Notifications</span>
            {notifs.length > 0 && (
              <button
                onClick={() => setNotifs([])}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Delete All
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifs.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-on-surface-variant">
                No New Notificatios
              </p>
            ) : (
              notifs.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setOpen(false);
                    navigate("/tasks");
                  }}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-surface-high"
                >
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-highest text-secondary">
                    <Icon name="add_task" className="!text-[18px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">new Task</p>
                    <p className="truncate text-xs text-on-surface-variant">{n.text}</p>
                  </div>
                  <span className="shrink-0 text-[10px] text-outline">{timeAgo(n.time)}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;