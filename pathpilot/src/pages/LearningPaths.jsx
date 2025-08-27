import DashboardLayout from "../layouts/DashboardLayout";
import { usePaths, useCreatePath } from "../queries/paths";
import { useState } from "react";

export default function LearningPaths() {
  const { data, isLoading } = usePaths();
  const createPath = useCreatePath();
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">مسیرهای یادگیری</h1>
        <button className="btn-primary" onClick={() => setOpen(true)}>
          افزودن مسیر
        </button>
      </div>

      {isLoading ? (
        <div className="animate-pulse h-24 bg-slate-100 rounded-xl" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data?.map((p) => (
            <article key={p.id} className="rounded-2xl border p-4 bg-white">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-slate-600 text-sm line-clamp-2">
                {p.description}
              </p>
              {/* Progress Bar اینجا */}
              <div className="mt-3 flex justify-end">
                <a href={`/paths/${p.id}`} className="text-violet-600">
                  ادامه بده →
                </a>
              </div>
            </article>
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
