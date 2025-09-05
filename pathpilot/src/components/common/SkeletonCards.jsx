export default function SkeletonCards({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
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
