import { supabase } from "../lib/supabase";

export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .is("deleted_at", null);

  return { success: !error, data, error: error?.message || null };
};

export const createTask = async (task) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert(task);

  return { success: !error, data, error: error?.message || null };
};

export const updateTask = async (id, updates) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id);

  return { success: !error, data, error: error?.message || null };
};

export const softDeleteTask = async (id) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ deleted_at: new Date() })
    .eq("id", id);

  return { success: !error, data, error: error?.message || null };
};