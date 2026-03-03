import { useState } from "react";
import { createTask } from "../api/tasks.api";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/useAuth";

export default function TaskForm({ users, onTaskAdded }) {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [assignedTo, setAssignedTo] = useState("");

  const handleCreate = async () => {
    if (!title || !description || !assignedTo) {
      alert("All fields are required");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("team_id")
      .eq("id", user.id)
      .single();

    const res = await createTask({
      title,
      description,
      status,
      assigned_to: assignedTo,
      team_id: profile.team_id,
    });

    if (res.success) {
      setTitle("");
      setDescription("");
      setAssignedTo("");
      setStatus("todo");
      onTaskAdded();
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Create Task</h3>

      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        className="border p-2 w-full mb-3 rounded"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Assign to user</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.id}
          </option>
        ))}
      </select>

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Task
      </button>
    </div>
  );
}