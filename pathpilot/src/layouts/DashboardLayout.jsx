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
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useTheme } from "@mui/material/styles";
import Sidebar, { DRAWER_WIDTH, MINI_WIDTH } from "../components/SidebarPro";

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
            <Avatar sx={{ width: 30, height: 30 }}>P</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Sidebar
        open={open}
        onToggle={() => setOpen((s) => !s)}
        isMdUp={isMdUp}
      />

      <Box
        component="main"
        sx={{
          flex: 1,
          pt: 2,
          ...(isRtl
            ? { ml: { md: `${sidebarOffset}px`, xs: 0 } }
            : { mr: { md: `${sidebarOffset}px`, xs: 0 } }),
          ...(isRtl
            ? { pr: 2, pl: { xs: 2, md: 2 } } // در RTL، سایدبار چپ است؛ پس padding راست آزاد است
            : { pl: 2, pr: { xs: 2, md: 2 } }), // در LTR، سایدبار راست است؛ پس padding چپ آزاد است
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ minHeight: 56 }} />
        <Box sx={{ width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
}
