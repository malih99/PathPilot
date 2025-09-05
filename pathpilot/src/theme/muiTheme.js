// MUI v7
import { createTheme, alpha } from "@mui/material/styles";

export default function createMuiTheme(mode = "light") {
  const isDark = mode === "dark";

  return createTheme({
    direction: "rtl",
    palette: {
      mode,
      primary: { main: "#7c3aed" }, // violet-600
      secondary: { main: "#06b6d4" }, // cyan-500
      background: {
        default: isDark ? "#0b0f14" : "#f8fafc",
        paper: isDark ? "#0f141b" : "#ffffff",
      },
      divider: isDark ? alpha("#fff", 0.12) : "#e5e7eb",
    },
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
      MuiButton: {
        defaultProps: { variant: "contained", size: "small" },
        styleOverrides: {
          root: { borderRadius: 12, paddingInline: 14, paddingBlock: 8 },
        },
      },
      MuiTextField: { defaultProps: { size: "small", fullWidth: true } },
      MuiPaper: { styleOverrides: { rounded: { borderRadius: 16 } } },
    },
  });
}
