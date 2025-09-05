import React from "react";

const ModeContext = React.createContext({ mode: "light", toggle: () => {} });
export const useThemeMode = () => React.useContext(ModeContext);

const STORAGE_KEY = "pp_theme_mode";

export default function ThemeModeProvider({ children }) {
  // پیش‌فرض بر اساس سیستم کاربر
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  )?.matches;
  const [mode, setMode] = React.useState(
    () => localStorage.getItem(STORAGE_KEY) || (prefersDark ? "dark" : "light")
  );

  const toggle = React.useCallback(() => {
    setMode((m) => {
      const next = m === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = React.useMemo(() => ({ mode, toggle }), [mode, toggle]);
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}
