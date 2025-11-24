export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return (
      <p className="text-gray-500 text-center mt-4 bg-white p-5 rounded-lg shadow">
        No tasks found. Add one! 🚀
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((t) => (
        <div
          key={t.id}
          className="bg-white shadow-md rounded-xl p-5 flex justify-between items-start"
        >
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{t.title}</h3>
            {t.description && (
              <p className="text-gray-600 text-sm mt-1">{t.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Priority: <strong>{t.priority}</strong> | Status:{" "}
              <strong>{t.status}</strong>{" "}
              {t.due_date && <>| Due: {t.due_date}</>}
            </p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => onEdit(t)}
              className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(t.id)}
              className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-sm font-semibold text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
