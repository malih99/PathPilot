import { useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { usePaths, useCreatePath } from "../../queries/paths";
import FiltersBar from "../../components/paths/FiltersBar";
import PathGrid from "../../components/paths/PathGrid";
import EmptyState from "../../components/paths/EmptyState";
import SkeletonCards from "../../components/common/SkeletonCards";
import AddPathDialog from "../../features/paths/AddPathDialog";
import { filterLabel } from "../../utils/paths";

export default function LearningPathsPage() {
  const { data, isLoading, isError, refetch } = usePaths();
  const createPath = useCreatePath();

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed | starred

  const filtered = useMemo(() => {
    let list = data ?? [];
    const t = q.trim().toLowerCase();
    if (t) {
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(t) ||
          p.description?.toLowerCase().includes(t)
      );
    }
    if (filter === "active") list = list.filter((p) => (p.progress ?? 0) < 100);
    else if (filter === "completed")
      list = list.filter((p) => (p.progress ?? 0) >= 100);
    else if (filter === "starred") list = list.filter((p) => !!p.starred);
    return list;
  }, [data, q, filter]);

  return (
    <DashboardLayout>
      {/* Header / Filters */}
      <div className="mb-4">
        <FiltersBar
          value={q}
          onChange={setQ}
          filter={filter}
          onFilterChange={setFilter}
          count={!isLoading ? filtered.length : undefined}
          onCreate={() => setOpen(true)}
          filterText={filterLabel(filter)}
        />
      </div>

      {/* States */}
      {isError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-rose-700">
                خطا در دریافت مسیرها
              </h3>
              <p className="text-sm text-rose-700/80">لطفاً دوباره تلاش کن.</p>
            </div>
            <button
              onClick={refetch}
              className="rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      ) : isLoading ? (
        <SkeletonCards count={6} />
      ) : filtered.length === 0 ? (
        <EmptyState onCreate={() => setOpen(true)} />
      ) : (
        <PathGrid items={filtered} />
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
