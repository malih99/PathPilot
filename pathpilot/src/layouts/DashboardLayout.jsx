import { useState } from "react";
import { HiOutlineViewGrid, HiOutlineMail } from "react-icons/hi";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: "یادگیری", icon: <HiOutlineViewGrid /> },
    { label: "پیام‌ها", icon: <HiOutlineMail /> },
  ];

  return (
    <div className="flex min-w-screen h-screen bg-[#f8fafc] font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-[#eef3f9] border-r border-gray-200 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-6 px-2">
            مسیر یادگیری
          </h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center w-full gap-3 px-3 py-2 rounded-lg hover:bg-white text-gray-700 transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      {/* <div className="flex-1 flex flex-col"> */}
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto w-full">{children}</div>
      </main>
      {/* </div> */}
    </div>
  );
}
