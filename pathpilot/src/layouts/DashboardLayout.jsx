import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 font-sans">
  <h1 className="text-3xl font-bold text-slate-800">خوش برگشتی!</h1>

  <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
    <h2 className="text-lg font-semibold text-slate-700">🎯 اهداف یادگیری</h2>
    {[{ title: "React", done: 2, total: 5 }, ...].map(...)}
  </section>

  <section className="bg-white rounded-2xl border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-slate-700">✅ تازه‌ترین‌ها</h2>
    <ul className="text-sm text-gray-700 divide-y divide-gray-200 pt-2">
      <li className="py-1">Understanding JSX</li>
      <li className="py-1">Intro to TypeScript</li>
    </ul>
  </section>
</div>

  );
}
