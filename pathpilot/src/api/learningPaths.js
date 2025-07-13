import { supabase } from "../services/supabase";

// دریافت همه مسیرهای یادگیری کاربر لاگین‌شده
export const fetchLearningPaths = async (userId) => {
  const { data, error } = await supabase
    .from("learning_paths")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// اضافه‌کردن مسیر یادگیری جدید
export const createLearningPath = async (pathData) => {
  const { data, error } = await supabase
    .from("learning_paths")
    .insert([pathData]);

  if (error) throw error;
  return data[0];
};
