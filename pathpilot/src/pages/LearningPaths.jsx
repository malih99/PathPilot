// src/pages/LearningPaths.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { usePaths, useCreatePath } from "../queries/paths";

// آیکون‌ها از MUI — با پروژه‌ات هماهنگه
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

// اگر قبلاً داری، همین رو نگه دار
import AddPathDialog from "../features/paths/AddPathDialog";

export default function LearningPaths() {
  const { data, isLoading, isError, refetch } = usePaths();
  const createPath = useCreatePath();

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    let list = data ?? [];
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(t) ||
          p.description?.toLowerCase().includes(t)
      );
    }
    if (filter === "active") {
      list = list.filter((p) => getProgress(p) < 100);
    } else if (filter === "completed") {
      list = list.filter((p) => getProgress(p) >= 100);
    } else if (filter === "starred") {
      list = list.filter((p) => !!p.starred);
    }
    return list;
  }, [data, q, filter]);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight">
            مسیرهای یادگیری
          </h1>
          {/* شمارش مسیرها */}
          {!isLoading && (
            <span className="text-sm rounded-full px-2 py-0.5 bg-slate-100 text-slate-600">
              {filtered.length} مسیر
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* جستجو */}
          <label className="relative hidden md:block">
            <SearchRoundedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجو بین مسیرها…"
              className="w-64 rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
            />
          </label>

          {/* فیلتر ساده */}
          <div className="relative">
            <button
              onClick={() =>
                setFilter((f) =>
                  f === "all"
                    ? "active"
                    : f === "active"
                    ? "completed"
                    : f === "completed"
                    ? "starred"
                    : "all"
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
              title="فیلتر"
            >
              <FilterListRoundedIcon fontSize="small" />
              {filterLabel(filter)}
            </button>
          </div>

          {/* افزودن مسیر */}
          <button
            className="btn-primary inline-flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <AddRoundedIcon />
            افزودن مسیر
          </button>
        </div>
      </div>

      {/* سرچ موبایل */}
      <label className="relative md:hidden mb-4 block">
        <SearchRoundedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو بین مسیرها…"
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
        />
      </label>

      {/* States */}
      {isError && <ErrorState onRetry={refetch} />}

      {isLoading ? (
        <SkeletonGrid />
      ) : filtered.length === 0 ? (
        <EmptyState onCreate={() => setOpen(true)} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <PathCard key={p.id} p={p} />
          ))}
        </div>
      )}

      {open && (
        <AddPathDialog
          onClose={() => setOpen(false)}
          onSubmit={(payload) =>
            createPath.mutate(payload, { onSuccess: () => setOpen(false) })
          }
        />
      )}
    </DashboardLayout>
  );
}

/* -------------------- Subcomponents -------------------- */

function PathCard({ p }) {
  const progress = getProgress(p); // 0..100
  const totalChapters =
    p.stats?.total ?? p.lessonsCount ?? p.units?.length ?? 0;
  const doneChapters =
    p.stats?.completed ??
    p.completedCount ??
    Math.round((progress * totalChapters) / 100);

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {p.starred && (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-bold text-yellow-700"
                title="نشان‌شده"
              >
                <StarBorderRoundedIcon fontSize="inherit" />
                برگزیده
              </span>
            )}
            {p.duration && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                <AccessTimeRoundedIcon fontSize="inherit" />
                {formatDuration(p.duration)}
              </span>
            )}
          </div>
          <h3 className="mt-1 truncate text-lg font-extrabold">{p.title}</h3>
          {p.description && (
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">
              {p.description}
            </p>
          )}
        </div>

        <button
          className="h-8 w-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
          title="گزینه‌ها"
        >
          <MoreHorizRoundedIcon fontSize="small" />
        </button>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700">پیشرفت</span>
          <span className="font-extrabold text-slate-900">{progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-l from-violet-500 to-violet-600 transition-[width]"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
        {totalChapters > 0 && (
          <div className="mt-1.5 text-xs text-slate-600">
            {doneChapters} از {totalChapters} فصل/درس تکمیل شده
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {progress >= 100 ? (
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
              <CheckCircleRoundedIcon fontSize="small" />
              تکمیل شد
            </span>
          ) : p.nextDue ? (
            <span className="inline-flex items-center gap-1">
              <AccessTimeRoundedIcon fontSize="small" />
              موعد بعدی: {formatDate(p.nextDue)}
            </span>
          ) : null}
        </div>

        <Link
          to={`/paths/${p.id}`}
          className="inline-flex items-center gap-1 rounded-xl bg-violet-600 px-3 py-2 text-sm font-bold text-white hover:bg-violet-700"
        >
          ادامه بده
          <PlayArrowRoundedIcon fontSize="small" />
        </Link>
      </div>
    </article>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 bg-white p-4"
        >
          <div className="h-5 w-40 animate-pulse rounded bg-slate-100" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-slate-100" />
          <div className="mt-1 h-4 w-56 animate-pulse rounded bg-slate-100" />
          <div className="mt-4 h-2 w-full animate-pulse rounded bg-slate-100" />
          <div className="mt-2 h-2 w-1/2 animate-pulse rounded bg-slate-100" />
          <div className="mt-4 flex justify-end">
            <div className="h-9 w-24 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onCreate }) {
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

function ErrorState({ onRetry }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-rose-700">خطا در دریافت مسیرها</h3>
          <p className="text-sm text-rose-700/80">لطفاً دوباره تلاش کن.</p>
        </div>
        <button
          onClick={onRetry}
          className="rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100"
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}

/* -------------------- Helpers -------------------- */

function filterLabel(filter) {
  switch (filter) {
    case "all":
      return "همه";
    case "active":
      return "در حال انجام";
    case "completed":
      return "تکمیل‌شده";
    case "starred":
      return "برگزیده";
    default:
      return "همه";
  }
}

function getProgress(p) {
  // از هر فیلدی که در دیتای فعلی‌ات هست محاسبه می‌کند
  if (typeof p.progress === "number") return clamp(p.progress, 0, 100);
  if (p.stats?.total > 0 && typeof p.stats?.completed === "number") {
    return clamp(Math.round((p.stats.completed / p.stats.total) * 100), 0, 100);
  }
  return 0;
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function formatDuration(mins) {
  if (!mins) return "—";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}س ${m}د`;
  if (h) return `${h}ساعت`;
  return `${m}دقیقه`;
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fa-IR");
  } catch {
    return iso ?? "—";
  }
}
