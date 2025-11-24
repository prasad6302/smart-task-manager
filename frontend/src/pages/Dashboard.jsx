import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const load = async () => {
    const res = await axiosClient.get("/tasks/");
    setTasks(res.data);
  };

  useEffect(() => {
    load().catch(() => {
      logout();
      navigate("/login");
    });
  }, []);

  const submit = async (task) => {
    if (editing) {
      await axiosClient.put(`/tasks/${editing.id}/`, task);
      setEditing(null);
    } else {
      await axiosClient.post("/tasks/", task);
    }
    load();
  };

  const del = async (id) => {
    await axiosClient.delete(`/tasks/${id}/`);
    load();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Smart Task Manager</h1>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total Tasks" value={tasks.length} color="blue" />
          <StatCard
            label="Completed"
            value={tasks.filter((t) => t.status === "COMPLETED").length}
            color="green"
          />
          <StatCard
            label="Pending"
            value={tasks.filter((t) => t.status !== "COMPLETED").length}
            color="yellow"
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TaskForm onSubmit={submit} editing={editing} />
          <TaskList tasks={tasks} onEdit={setEditing} onDelete={del} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    blue: "bg-blue-500/20 text-blue-300",
    green: "bg-green-500/20 text-green-300",
    yellow: "bg-yellow-500/20 text-yellow-300",
  };
  return (
    <div className={`p-6 rounded-2xl shadow ${colors[color]} text-center`}>
      <p className="text-sm opacity-80">{label}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}
