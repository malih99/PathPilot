export default function AddPathDialog({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="fixed inset-0 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold mb-4">افزودن مسیر جدید</h2>
        <label className="block mb-2 text-sm">عنوان</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block mt-3 mb-2 text-sm">توضیحات</label>
        <textarea
          className="textarea"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mt-5 flex gap-2 justify-end">
          <button className="btn-ghost" onClick={onClose}>
            انصراف
          </button>
          <button
            className="btn-primary"
            onClick={() => onSubmit({ title, description })}
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
