// MUI v7
import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: { main: "#7c3aed" }, // violet-600
    secondary: { main: "#06b6d4" }, // cyan-500
    background: { default: "#f8fafc" },
  },
  typography: {
    fontFamily: `IRANSans, Vazirmatn, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    fontSize: 13, // کوچیک‌تر از پیش‌فرض
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
    MuiTextField: {
      defaultProps: { size: "small", fullWidth: true },
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 16 } },
    },
  },
});

export default muiTheme;
