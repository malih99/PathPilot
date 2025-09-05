import * as React from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { useTheme } from "@mui/material/styles";
import Sidebar, { DRAWER_WIDTH, MINI_WIDTH } from "../components/SidebarPro";
import ThemeToggleFloating from "../components/ThemeToggleFloating";

function useLocalMode() {
  const theme = useTheme();
  const [mode, setMode] = React.useState(theme.palette.mode);
  React.useEffect(() => {
    const saved = localStorage.getItem("pp-mode");
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-pp-mode", saved);
      setMode(saved);
    }
  }, []);
  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    localStorage.setItem("pp-mode", next);
    document.documentElement.setAttribute("data-pp-mode", next);
    setMode(next);
  };
  return { mode, toggle };
}

export default function DashboardLayout({ children }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isRtl = theme.direction === "rtl";
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (!isMdUp) setOpen(false);
  }, [isMdUp]);

  const sidebarOffset = isMdUp ? (open ? DRAWER_WIDTH : MINI_WIDTH) : 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        bgcolor: "#f3f4f6",
      }}
    >
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ...(isRtl
            ? { left: sidebarOffset, right: 0 }
            : { right: sidebarOffset, left: 0 }),
          height: 56,
          zIndex: (t) => t.zIndex.drawer + 1,
          background: "rgba(230,237,245,.85)",
          color: "#1e293b",
          borderBottom: "1px solid #d9e2ec",
          backdropFilter: "saturate(140%) blur(6px)",
          transition: (t) =>
            t.transitions.create(isRtl ? "left" : "right", {
              duration: t.transitions.duration.shortest,
            }),
        }}
      >
        <Toolbar
          sx={{
            minHeight: 56,
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 1.5, md: 2 },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            PathPilot
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isMdUp && (
              <IconButton onClick={() => setOpen((s) => !s)}>
                <MenuRoundedIcon />
              </IconButton>
            )}
            {/* اینجا دکمه تم یا هر اکشن دیگری رو بگذار؛ همیشه داخل عرض AppBar می‌ماند */}
            <Avatar sx={{ width: 30, height: 30 }}>P</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Sidebar
        open={open}
        onToggle={() => setOpen((s) => !s)}
        isMdUp={isMdUp}
      />

      <ThemeToggleFloating
        sidebarOpen={open}
        isMdUp={isMdUp}
        drawerWidth={DRAWER_WIDTH}
        miniWidth={MINI_WIDTH}
      />

      <Box
        component="main"
        sx={{
          flex: 1,
          pt: 2,
          ...(isRtl
            ? { ml: { md: `${sidebarOffset}px`, xs: 0 } }
            : { mr: { md: `${sidebarOffset}px`, xs: 0 } }),
          px: { xs: 2, md: 3 }, // گاتر یکنواخت
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ minHeight: 56 }} />
        <Box sx={{ width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
}
