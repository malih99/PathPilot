import { useState } from "react";
import { createLearningPath } from "../api/learningPaths";
import { useUser } from "@supabase/auth-helpers-react";

export default function AddPathForm({ onAdd }) {
  const user = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPath = {
      title,
      description,
      user_id: user.id,
    };

    try {
      const added = await createLearningPath(newPath);
      onAdd(added);
      setTitle("");
      setDescription("");
    } catch (err) {
      alert("خطا در افزودن مسیر: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="عنوان مسیر"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="توضیحات (اختیاری)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">افزودن</button>
    </form>
  );
}
