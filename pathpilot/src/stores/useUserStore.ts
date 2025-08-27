import { create } from "zustand";

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  theme: "light", // یا "dark"
  setTheme: (theme) => set({ theme }),
}));
