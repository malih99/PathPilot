import { Link } from "react-router-dom";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { getProgress, formatDate, formatDuration } from "../../utils/paths";

export default function PathCard({ p }) {
  const progress = getProgress(p);
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
          <div className="flex flex-wrap items-center gap-2">
            {p.starred && (
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-bold text-yellow-700">
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

      {/* Footer */}
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
