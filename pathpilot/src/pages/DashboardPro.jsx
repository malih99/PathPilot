import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import HeroBar from "../components/dashboardPro/HeroBar";
import KPIDeck from "../components/dashboardPro/KPIDeck";
import GoalsProgress from "../components/dashboardPro/GoalsProgress";
import UpcomingList from "../components/dashboardPro/UpcomingList";
import FocusTimer from "../components/dashboardPro/FocusTimer";
import RecentPaths from "../components/dashboardPro/RecentPaths";
import ActivityFeed from "../components/dashboardPro/ActivityFeed";
import QuickAddDialog from "../components/dashboardPro/QuickAddDialog";

const mockStats = [
  { id: "paths", label: "مسیرهای فعال", value: 5, hint: "", icon: "paths" },
  {
    id: "weekly",
    label: "پیشرفت هفتگی",
    value: "78%",
    hint: "↑2%",
    icon: "trend",
  },
  {
    id: "focus",
    label: "زمان این هفته",
    value: "3h 20m",
    hint: "",
    icon: "time",
  },
  { id: "tasks", label: "تسک‌های باز", value: 12, hint: "+3", icon: "tasks" },
];
const mockGoals = [
  { id: "react", label: "React", total: 5, done: 2 },
  { id: "ts", label: "TypeScript", total: 4, done: 1 },
  { id: "test", label: "Testing", total: 3, done: 3 },
];
const mockUpcoming = [
  { id: 1, title: "Chapter 2 — TS", tag: "TypeScript", due: "فردا" },
  { id: 2, title: "TDD — Jest تمرین", tag: "Testing", due: "۳ روز دیگر" },
  {
    id: 3,
    title: "پیاده‌سازی فرم‌ها — React",
    tag: "React",
    due: "۵ روز دیگر",
  },
];
const mockPaths = [
  {
    id: "p1",
    title: "React — از صفر تا تولید",
    description: "هوک‌ها، فرم‌ها، مدیریت وضعیت",
    progress: 40,
  },
  {
    id: "p2",
    title: "TypeScript Deep Dive",
    description: "Generics, Utility Types, TSConfig",
    progress: 25,
  },
  {
    id: "p3",
    title: "تست‌نویسی با Jest",
    description: "Unit/Integration, Mock, TDD",
    progress: 100,
  },
];
const mockActivity = [
  { text: "«درک JSX» را انجام‌شده علامت زدی", time: "۱ ساعت قبل" },
  { text: "یادداشت جدید برای «Hooks Basics» اضافه شد", time: "دیروز" },
  { text: "مسیر «TypeScript Deep Dive» ساخته شد", time: "۳ روز قبل" },
];

export default function DashboardPro() {
  const [openAdd, setOpenAdd] = React.useState(false);

  // اگر useCreatePath داری، اینجا وصلش کن:
  const handleCreatePath = async (payload) => {
    // await createPath.mutateAsync(payload)
    console.log("create path", payload);
  };

  return (
    <DashboardLayout>
      <HeroBar onQuickAdd={() => setOpenAdd(true)} />
      <KPIDeck stats={mockStats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <GoalsProgress goals={mockGoals} />
          <RecentPaths items={mockPaths} />
        </div>
        <div className="space-y-4">
          <UpcomingList items={mockUpcoming} />
          <FocusTimer defaultMinutes={25} />
          <ActivityFeed items={mockActivity} />
        </div>
      </div>

      <QuickAddDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreatePath={handleCreatePath}
      />
    </DashboardLayout>
  );
}
