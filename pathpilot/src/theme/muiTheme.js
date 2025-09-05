import { createTheme, alpha } from "@mui/material/styles";

export default function createMuiTheme(mode = "light") {
  const isDark = mode === "dark";

  return createTheme({
    direction: "rtl",
    palette: {
      mode,
      primary: { main: "#7c3aed" },
      secondary: { main: "#06b6d4" },
      background: {
        default: isDark ? "#0b0f14" : "#f8fafc",
        paper: isDark ? "#0f141b" : "#ffffff",
      },
      divider: isDark ? alpha("#fff", 0.1) : alpha("#0b1220", 0.1),
    },
    shape: { borderRadius: 2 },
    typography: {
      fontFamily: `IRANSans, Vazirmatn, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
      fontSize: 13,
      h1: { fontSize: 28, fontWeight: 800 },
      h2: { fontSize: 22, fontWeight: 800 },
      h3: { fontSize: 18, fontWeight: 700 },
      body1: { fontSize: 13 },
      body2: { fontSize: 12 },
      button: { textTransform: "none", fontWeight: 700 },
    },
    components: {
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius, // 12px
            border: `1px solid ${theme.palette.divider}`,
            // سایه خیلی لطیف
            boxShadow:
              theme.palette.mode === "light"
                ? "0 4px 14px rgba(15,18,24,.06)"
                : "0 6px 18px rgba(0,0,0,.28)",
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
          }),
        },
      },
      MuiTextField: { defaultProps: { size: "small", fullWidth: true } },
      MuiPaper: { styleOverrides: { rounded: { borderRadius: 2 } } },
    },
  });
}
