import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function EmptyState({ onCreate }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
      <div className="mx-auto max-w-md px-4">
        <h3 className="text-lg font-extrabold text-slate-900">
          هنوز مسیری تعریف نکردی
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          با ساخت یک «مسیر یادگیری»، فصل‌ها و اهداف هفتگی‌ات را منظم کن تا
          پیشرفتت همیشه جلوی چشم باشد.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            className="btn-primary inline-flex items-center gap-2"
            onClick={onCreate}
          >
            <AddRoundedIcon />
            ساخت مسیر جدید
          </button>
        </div>
      </div>
    </div>
  );
}
