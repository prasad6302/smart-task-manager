import { useEffect, useState } from "react";

export default function TaskForm({ onSubmit, editing }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "PENDING",
    due_date: "",
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="bg-white shadow-lg rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">
        {editing ? "✏️ Edit Task" : "📝 Add New Task"}
      </h2>

      <input
        className="border w-full p-3 rounded-lg"
        placeholder="Task Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="border w-full p-3 rounded-lg"
        placeholder="Description"
        rows="2"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          className="border p-3 rounded-lg"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <select
          className="border p-3 rounded-lg"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <input
        type="date"
        className="border p-3 rounded-lg w-full"
        value={form.due_date}
        onChange={(e) => setForm({ ...form, due_date: e.target.value })}
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-lg font-semibold">
        {editing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
