
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, ref, update } from "firebase/database";
import { db } from "../../FirebaseConfig";

type Priority = "low" | "medium" | "high";

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

const Edit = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 1) جلب بيانات المهمة وتعبئة الفورم
  useEffect(() => {
    const load = async () => {
      try {
        const snapshot = await get(ref(db, `todos/${id}`));
        if (!snapshot.exists()) {
          setError("The Task not here...");
          return;
        }
        const data = snapshot.val();
        setText(data.text ?? "");
        setDescription(data.description ?? "");
        setPriority(data.priority ?? "medium");
        setCategory(data.category ?? "Work");
        setDueDate(data.dueDate ?? "");
      } catch (er) {
        console.log(er);
        setError("Error in get task");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // 2) حفظ التعديل
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("The Title we need");
      return;
    }
    setSaving(true);
    try {
      await update(ref(db, `todos/${id}`), {
        text: text.trim(),
        description,
        priority,
        category,
        dueDate,
        updatedAt: Date.now(),
      });
      navigate("/tasks");
    } catch (er) {
      console.log(er);
      setError("we have error on save please try again");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="py-10 text-center text-on-surface-variant">Loading...</p>;
  }

  const inputBox = "w-full rounded-xl bg-surface-container p-4 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary-container";

  return (
    <form onSubmit={handleSave} className="mx-auto flex max-w-xl flex-col gap-4 text-on-surface">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="text-sm font-semibold text-on-surface-variant hover:text-on-surface"
        >
          Cancel
        </button>
        <h1 className="font-display text-xl font-semibold">Edit Task</h1>
        <button
          type="submit"
          disabled={saving}
          className="flex h-10 items-center gap-1 rounded-lg bg-primary-container px-4 text-sm font-semibold text-on-primary disabled:opacity-60"
        >
          <Icon name="check" className="!text-[18px]" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <div>
        <label className="mb-1 block text-[10px] font-bold tracking-wider text-primary">TASK TITLE</label>
        <input className={inputBox} value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-bold tracking-wider text-on-surface-variant">DESCRIPTION</label>
        <textarea rows={4} className={`${inputBox} resize-none`} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[10px] font-bold tracking-wider text-on-surface-variant">PRIORITY</label>
          <select className={inputBox} value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option className="bg-surface-container" value="low">Low</option>
            <option className="bg-surface-container" value="medium">Medium</option>
            <option className="bg-surface-container" value="high">High</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-bold tracking-wider text-on-surface-variant">CATEGORY</label>
          <select className={inputBox} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option className="bg-surface-container" value="Work">Work</option>
            <option className="bg-surface-container" value="Personal">Personal</option>
            <option className="bg-surface-container" value="Dev">Dev</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-bold tracking-wider text-on-surface-variant">DUE DATE</label>
        <input type="datetime-local" className={`${inputBox} [color-scheme:dark]`} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
    </form>
  );
};

export default Edit;
