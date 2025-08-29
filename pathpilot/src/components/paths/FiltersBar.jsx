import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { useState } from "react";

export default function FiltersBar({
  value,
  onChange,
  filter,
  onFilterChange,
  count,
  onCreate,
  filterText,
}) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-extrabold tracking-tight">
          مسیرهای یادگیری
        </h1>
        {typeof count === "number" && (
          <span className="text-sm rounded-full px-2 py-0.5 bg-slate-100 text-slate-600">
            {count} مسیر
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* سرچ دسکتاپ */}
        <label className="relative hidden md:block">
          <SearchRoundedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="جستجو بین مسیرها…"
            className="w-64 rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
          />
        </label>

        {/* فیلتر منو */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu((s) => !s)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
            title="فیلتر"
          >
            <FilterListRoundedIcon fontSize="small" />
            {filterText}
          </button>

          {openMenu && (
            <div
              className="absolute z-20 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
              onMouseLeave={() => setOpenMenu(false)}
            >
              {[
                { k: "all", l: "همه" },
                { k: "active", l: "در حال انجام" },
                { k: "completed", l: "تکمیل‌شده" },
                { k: "starred", l: "برگزیده" },
              ].map((opt) => (
                <button
                  key={opt.k}
                  onClick={() => {
                    onFilterChange(opt.k);
                    setOpenMenu(false);
                  }}
                  className={`block w-full text-right px-3 py-2 text-sm hover:bg-slate-50 ${
                    filter === opt.k
                      ? "font-extrabold text-violet-700"
                      : "text-slate-700"
                  }`}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ساخت مسیر */}
        <button
          className="btn-primary inline-flex items-center gap-2"
          onClick={onCreate}
        >
          <AddRoundedIcon />
          افزودن مسیر
        </button>
      </div>

      {/* سرچ موبایل */}
      <label className="relative md:hidden">
        <SearchRoundedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="جستجو بین مسیرها…"
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
        />
      </label>
    </div>
  );
}
