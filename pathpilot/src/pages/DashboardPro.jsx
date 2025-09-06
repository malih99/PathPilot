import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import HeroBar from "../components/dashboardPro/HeroBar";
import GoalsProgress from "../components/dashboardPro/GoalsProgress";
import UpcomingList from "../components/dashboardPro/UpcomingList";
import FocusTimer from "../components/dashboardPro/FocusTimer";
import RecentPaths from "../components/dashboardPro/RecentPaths";
import ActivityFeed from "../components/dashboardPro/ActivityFeed";
import QuickAddDialog from "../components/dashboardPro/QuickAddDialog";
import PlaceholderCard from "../components/dashboardPro/PlaceholderCard";

const mockStats = [
  { id: "tasks", label: "Tasks left", value: 12, hint: "", icon: "tasks" },
  {
    id: "weeklyTime",
    label: "Weekly progress",
    value: "320h",
    hint: "",
    icon: "time",
  },
];

const mockGoals = [
  { id: "react", label: "React", total: 5, done: 2 },
  { id: "ts", label: "TypeScript", total: 4, done: 3 },
  { id: "test", label: "Testing", total: 3, done: 1, rightLabel: "Testing" },
];

const mockTasks = [
  { id: 1, title: "Chapter 2 — TS", tag: "TypeScript", due: "now" },
  { id: 2, title: "TDD — Jest", tag: "Testing", due: "3 days" },
  { id: 3, title: "Review notes — React", tag: "React", due: "5 days" },
];

const mockPaths = [
  {
    id: "p1",
    icon: "react",
    title: "React — از صفر تا تولید",
    description: "هوک‌ها، فرم‌ها، مدیریت وضعیت",
    progress: 40,
  },
  {
    id: "p2",
    icon: "ts",
    title: "TypeScript Deep Dive",
    description: "Generics, Utility Types, TSConfig",
    progress: 62,
  },
];

const mockActivity = [
  { text: "«درک JSX» را انجام‌شده علامت زدی", time: "۱ ساعت قبل" },
  { text: "یادداشت جدید برای «Hooks Basics» اضافه شد", time: "دیروز" },
  { text: "مسیر «TypeScript Deep Dive» ساخته شد", time: "۳ روز قبل" },
];

export default function DashboardPro() {
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleCreatePath = async (payload) => {
    console.log("create path", payload);
  };

  return (
    <DashboardLayout>
      <HeroBar
        onQuickAdd={() => setOpenAdd(true)}
        miniStats={mockStats}
        daysStreak={999}
      />

      <div className="grid grid-cols-1 xl:grid-cols-6 gap-4">
        {" "}
        <div className="xl:col-span-2 space-y-4">
          <RecentPaths items={mockPaths} title="مسیرهای یادگیری" />
          <ActivityFeed items={mockActivity} />+{" "}
        </div>
        <div className="xl:col-span-3 space-y-4">
          <GoalsProgress goals={mockGoals} title="اهداف این هفته" />
          <FocusTimer defaultMinutes={25} />+{" "}
        </div>
        <div className="xl:col-span-1 space-y-4">
          <UpcomingList items={mockTasks} title="لیست کارها" showAdd />
          <PlaceholderCard title="پومودورو" />+{" "}
        </div>{" "}
      </div>

      <QuickAddDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreatePath={handleCreatePath}
      />
    </DashboardLayout>
  );
}
