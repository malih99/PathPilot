import * as React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "../theme/mode/ThemeModeProvider";

/**
 * این دکمه به صورت fixed کنار صفحه قرار می‌گیرد و بسته به باز/بسته بودن سایدبار
 * از لبه‌ی سایدبار فاصله می‌گیرد تا زیر آن نرود.
 */
export default function ThemeToggleFloating({
  sidebarOpen,
  isMdUp,
  drawerWidth = 264,
  miniWidth = 72,
}) {
  const mui = useTheme();
  const { mode, toggle } = useThemeMode();
  const isRtl = mui.direction === "rtl";

  // روی دسکتاپ: کنار سایدبار؛ روی موبایل: فقط 12px از لبه
  const logicalEdge = isRtl ? "left" : "right";
  const edgePx = isMdUp
    ? sidebarOpen
      ? drawerWidth + 12
      : miniWidth + 12
    : 12;

  return (
    <Tooltip
      title={mode === "light" ? "تبدیل به حالت تیره" : "تبدیل به حالت روشن"}
    >
      <IconButton
        onClick={toggle}
        size="small"
        sx={{
          position: "fixed",
          top: 10,
          [logicalEdge]: edgePx,
          zIndex: (t) => t.zIndex.drawer + 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: 2,
          border: (t) => `1px solid ${t.palette.divider}`,
          "&:hover": { boxShadow: 3 },
          width: 36,
          height: 36,
        }}
      >
        {mode === "light" ? (
          <DarkModeRounded fontSize="small" />
        ) : (
          <LightModeRounded fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
