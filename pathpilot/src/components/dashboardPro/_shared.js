import { alpha } from "@mui/material/styles";

export const glassCard = (t) => ({
  borderRadius: t.shape.borderRadius, // 12px
  border: `1px solid ${t.palette.divider}`,
  background:
    t.palette.mode === "light"
      ? "linear-gradient(180deg,rgba(255,255,255,.98),rgba(255,255,255,.94))"
      : alpha(t.palette.background.paper, 0.85),
  backdropFilter: "saturate(140%) blur(6px)",
  // سایه‌ی کوتاه و طبیعی‌تر
  boxShadow:
    t.palette.mode === "light"
      ? "0 4px 14px rgba(15,18,24,.06)"
      : "0 10px 24px rgba(0,0,0,.32)",
  transition: "transform .18s ease, box-shadow .18s ease, border-color .18s",

  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow:
      t.palette.mode === "light"
        ? "0 8px 24px rgba(15,18,24,.08)"
        : "0 14px 32px rgba(0,0,0,.38)",
    borderColor:
      t.palette.mode === "light"
        ? alpha(t.palette.primary.main, 0.22)
        : alpha("#fff", 0.16),
  },
});
