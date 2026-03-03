import { useState } from "react";
import { updateTask, softDeleteTask } from "../api/tasks.api";

export default function TaskList({ tasks, role, onTaskUpdated }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", status: "" });

  const startEdit = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const saveEdit = async (id) => {
    const res = await updateTask(id, form);
    if (res.success) {
      setEditingId(null);
      onTaskUpdated();
    } else {
      alert(res.error);
    }
  };

  const handleDelete = async (id) => {
    const res = await softDeleteTask(id);
    if (res.success) onTaskUpdated();
    else alert(res.error);
  };

  if (!tasks.length) {
    return <p className="text-gray-500">No tasks found.</p>;
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Tasks</h3>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="border p-3 rounded">
            {editingId === task.id ? (
              <>
                <input
                  className="border p-1 w-full mb-1"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />

                <textarea
                  className="border p-1 w-full mb-1"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />

                <select
                  className="border p-1 w-full mb-2"
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <button
                  onClick={() => saveEdit(task.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm italic">{task.status}</p>

                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => startEdit(task)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}