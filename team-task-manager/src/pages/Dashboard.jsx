import { useEffect, useState } from "react";
import { fetchTasks } from "../api/tasks.api";
import { logoutUser } from "../api/auth.api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {

      const taskRes = await fetchTasks();
      if (taskRes.success) setTasks(taskRes.data);


      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profile fetch error:", error.message);
        setRole("");
        return;
      }

      if (profile) {
        setRole(profile.role);
      }


      const { data: teamUsers } = await supabase
        .from("profiles")
        .select("id");

      setUsers(teamUsers || []);
    };

    loadData();

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("SESSION:", data);
    };

    checkSession();
  }, [user]);

  const refreshTasks = async () => {
    const taskRes = await fetchTasks();
    if (taskRes.success) setTasks(taskRes.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Team Task Manager</h1>
          <button
            onClick={logoutUser}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>


        {role === "admin" && (
          <TaskForm users={users} onTaskAdded={refreshTasks} />
        )}

        <TaskList
          tasks={tasks}
          role={role}
          user={user}
          onTaskUpdated={refreshTasks}
        />
      </div>
    </div>
  );
}