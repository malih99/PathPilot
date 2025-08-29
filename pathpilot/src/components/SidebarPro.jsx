// components/SidebarPro.jsx
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Avatar,
  Chip,
  ListSubheader,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { NavLink, useLocation } from "react-router-dom";

export const DRAWER_WIDTH = 264;
export const MINI_WIDTH = 72;
const APPBAR_HEIGHT = 56;

// —— Tokens (راحت‌ترت می‌کند برای تم/دارک)
const bgGrad = "linear-gradient(180deg,#0f141b 0%,#0e1117 40%,#0b0e13 100%)";
const borderCol = "rgba(255,255,255,.08)";
const textPrimary = "#e5e7eb";
const textMuted = "#9ca3af";
const brand = "#8b5cf6";

// open/closed mixins
const openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  width: MINI_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const PermanentDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "fixed",
    top: APPBAR_HEIGHT,
    height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
    background: bgGrad,
    color: textPrimary,
    borderLeft: `1px solid ${borderCol}`,
    boxShadow: "inset 1px 0 0 rgba(255,255,255,.06), 0 0 24px rgba(0,0,0,.35)",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    ...(open ? openedMixin(theme) : closedMixin(theme)),
  },
}));

// ——— داده‌ها با سکشن‌بندی حرفه‌ای
const sections = [
  {
    header: "Overview",
    items: [{ to: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" }],
  },
  {
    header: "Workspace",
    items: [
      {
        to: "/paths",
        icon: <SchoolRoundedIcon />,
        label: "Learning Paths",
        chip: "3",
      },
      {
        to: "/calendar",
        icon: <CalendarMonthRoundedIcon />,
        label: "Calendar",
      },
      { to: "/messages", icon: <MailOutlineRoundedIcon />, label: "Messages" },
    ],
  },
];

export default function Sidebar({ open, onToggle, isMdUp }) {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isRtl = theme.direction === "rtl";
  const anchorSide = isRtl ? "left" : "right";
  if (!isMdUp) {
    return (
      <MuiDrawer
        variant="temporary"
        anchor={anchorSide}
        open={open}
        onClose={onToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            background: bgGrad,
            color: textPrimary,
            borderLeft: `1px solid ${borderCol}`,
            top: APPBAR_HEIGHT,
            height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
            boxSizing: "border-box",
            position: "fixed",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <SidebarContent open onToggle={onToggle} pathname={pathname} />
      </MuiDrawer>
    );
  }

  return (
    <PermanentDrawer variant="permanent" anchor={anchorSide} open={open}>
      <SidebarContent open={open} onToggle={onToggle} pathname={pathname} />
    </PermanentDrawer>
  );
}

const NavItem = ({ open, to, icon, label, chip, active }) => {
  const content = (
    <ListItemButton
      selected={active}
      sx={{
        mx: 1,
        my: 0.5,
        borderRadius: 2,
        px: open ? 1.25 : 1,
        minHeight: 44,
        position: "relative",
        overflow: "hidden",
        "& .MuiListItemIcon-root": {
          minWidth: 0,
          mr: open ? 1.5 : 0,
          color: textPrimary,
          transition: "margin .15s",
        },
        // حالت هاور نرم
        "&:hover": {
          backgroundColor: alpha("#ffffff", 0.06),
        },
        // حالت انتخابی: pill
        "&.Mui-selected": {
          backgroundColor: alpha("#ffffff", 0.08),
          "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
        },
        // indicator بارکَناری
        "&::before": active
          ? {
              content: '""',
              position: "absolute",
              right: 6, // چون راست‌چینیم
              top: 8,
              bottom: 8,
              width: 3,
              borderRadius: 8,
              background:
                "linear-gradient(180deg, rgba(139,92,246,1) 0%, rgba(139,92,246,.35) 100%)",
              boxShadow: "0 0 0 1px rgba(139,92,246,.2)",
            }
          : {},
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      {open && (
        <ListItemText
          primary={label}
          primaryTypographyProps={{ fontWeight: 700, fontSize: 14 }}
        />
      )}
      {open && chip && (
        <Chip
          label={chip}
          size="small"
          sx={{
            ml: 1,
            height: 20,
            bgcolor: brand,
            color: "#fff",
            fontWeight: 700,
          }}
        />
      )}
    </ListItemButton>
  );

  return open ? (
    <NavLink to={to} style={{ textDecoration: "none", color: "inherit" }}>
      {content}
    </NavLink>
  ) : (
    <Tooltip title={label} placement="left">
      <NavLink to={to} style={{ textDecoration: "none", color: "inherit" }}>
        {content}
      </NavLink>
    </Tooltip>
  );
};

function SidebarContent({ open, onToggle, pathname }) {
  return (
    <>
      {/* Header (brand + toggle) */}
      <Toolbar
        sx={{
          minHeight: APPBAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          px: 1,
          borderBottom: `1px solid ${borderCol}`,
          backdropFilter: "saturate(140%) blur(6px)",
          backgroundColor: alpha("#111827", 0.2),
        }}
      >
        {open ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
                bgcolor: brand,
                fontWeight: 800,
                boxShadow: "0 6px 18px rgba(139,92,246,.45)",
              }}
            >
              P
            </Avatar>
            <span style={{ fontWeight: 900, letterSpacing: 0.2 }}>
              PathPilot
            </span>
          </Box>
        ) : null}

        <Tooltip title={open ? "Collapse" : "Expand"}>
          <IconButton
            size="small"
            onClick={onToggle}
            sx={{
              color: textPrimary,
              bgcolor: "rgba(255,255,255,.08)",
              "&:hover": { bgcolor: "rgba(255,255,255,.16)" },
              border: `1px solid ${alpha("#fff", 0.08)}`,
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuOpenRoundedIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>

      {/* Scroll area */}
      <Box sx={{ flex: 1, overflowY: "auto", py: 1 }}>
        {sections.map((sec, si) => (
          <Box key={si} sx={{ mb: 1 }}>
            <List
              dense
              subheader={
                <ListSubheader
                  component="div"
                  disableSticky
                  sx={{
                    position: "static",
                    bgcolor: "transparent",
                    color: textMuted,
                    px: open ? 2 : 1.5,
                    py: 1,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    fontSize: 11,
                  }}
                >
                  {open ? sec.header : " "}
                </ListSubheader>
              }
              sx={{ py: 0.5 }}
            >
              {sec.items.map((it) => {
                const active =
                  pathname === it.to ||
                  (pathname.startsWith(it.to) && it.to !== "/");
                return (
                  <NavItem
                    key={it.to}
                    open={open}
                    to={it.to}
                    icon={it.icon}
                    label={it.label}
                    chip={it.chip}
                    active={active}
                  />
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* Footer: status + account actions */}
      <Divider sx={{ borderColor: borderCol }} />
      <Box
        sx={{
          p: open ? 1.25 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          gap: 1,
        }}
      >
        {open && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="System Status">
              <FiberManualRecordRoundedIcon
                sx={{ fontSize: 10, color: "#22c55e" }}
              />
            </Tooltip>
            <span style={{ fontSize: 12, color: textMuted }}>
              Realtime • {new Date().getFullYear()}
            </span>
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {open && (
            <Button
              size="small"
              startIcon={<SettingsRoundedIcon />}
              sx={{
                color: textPrimary,
                "&:hover": { backgroundColor: alpha("#ffffff", 0.06) },
                borderRadius: 2,
                px: 1.25,
                minWidth: 0,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Settings
            </Button>
          )}
          <Tooltip title="Sign out">
            <IconButton
              size="small"
              sx={{
                color: textPrimary,
                "&:hover": { backgroundColor: alpha("#ffffff", 0.06) },
              }}
            >
              <LogoutRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
}
