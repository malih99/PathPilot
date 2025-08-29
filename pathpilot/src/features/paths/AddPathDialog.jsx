import { useEffect, useMemo, useRef, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

export default function AddPathDialog({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ title: false });
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  // فوکوس اولیه روی عنوان
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // بستن با ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !isSubmitting) onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, isSubmitting]);

  // ولیدیشن ساده
  const errors = useMemo(() => {
    const e = {};
    if (!title.trim()) e.title = "عنوان الزامی است.";
    else if (title.trim().length < 3) e.title = "حداقل ۳ کاراکتر وارد کن.";
    return e;
  }, [title]);

  const canSubmit = Object.keys(errors).length === 0 && !isSubmitting;

  // کلیک روی بک‌دراپ برای بستن
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ title: true });
    if (!canSubmit) return;
    try {
      setIsSubmitting(true);
      // onSubmit می‌تونه Promise برگردونه
      await Promise.resolve(onSubmit?.({ title: title.trim(), description }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      onMouseDown={onBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-path-title"
    >
      {/* Panel با انیمیشن */}
      <div
        ref={panelRef}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all duration-150 animate-[fadeIn_.12s_ease-out]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 id="add-path-title" className="text-lg font-extrabold">
            افزودن مسیر جدید
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            aria-label="بستن"
            title="بستن"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">
              عنوان <span className="text-rose-600">*</span>
            </label>
            <input
              ref={inputRef}
              className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 ${
                touched.title && errors.title
                  ? "border-rose-300"
                  : "border-slate-200"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, title: true }))}
              placeholder="مثلاً: «React — از صفر تا تولید»"
              maxLength={100}
            />
            <div className="mt-1 flex items-center justify-between">
              <p className="h-5 text-xs text-rose-600">
                {touched.title && errors.title ? errors.title : "\u00A0"}
              </p>
              <p className="text-xs text-slate-400">{title.length}/100</p>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">
              توضیحات
            </label>
            <textarea
              className="textarea w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="مرور کلی از اهداف مسیر، سرفصل‌ها و خروجی نهایی…"
              maxLength={800}
            />
            <div className="mt-1 text-right text-xs text-slate-400">
              {description.length}/800
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              className="btn-ghost rounded-xl px-3 py-2 text-sm"
              onClick={onClose}
              disabled={isSubmitting}
            >
              انصراف
            </button>

            <button
              type="submit"
              className={`btn-primary inline-flex items-center gap-2 ${
                !canSubmit ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={!canSubmit}
            >
              <SaveRoundedIcon fontSize="small" />
              {isSubmitting ? "در حال ذخیره…" : "ذخیره"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
