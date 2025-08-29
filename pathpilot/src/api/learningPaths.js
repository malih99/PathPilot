import { supabase } from "../services/supabase";

export async function listPaths() {
  const { data, error } = await supabase
    .from("learning_paths")
    .select(
      `
      id, title, description, created_at,
      milestones(id, title, status, due_date, created_at)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createPath(payload) {
  const { data, error } = await supabase
    .from("learning_paths")
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePath(id, patch) {
  const { data, error } = await supabase
    .from("learning_paths")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePath(id) {
  const { error } = await supabase.from("learning_paths").delete().eq("id", id);
  if (error) throw error;
  return true;
}
