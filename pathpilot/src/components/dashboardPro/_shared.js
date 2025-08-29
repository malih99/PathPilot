// components/dashboardPro/_shared.js
import { alpha } from "@mui/material/styles";

export const glassCard = (t) => ({
  borderRadius: 16,
  border: "1px solid",
  borderColor: alpha(t.palette.divider, 0.55),
  background:
    t.palette.mode === "light"
      ? "linear-gradient(180deg,#fff,rgba(255,255,255,.92))"
      : alpha(t.palette.background.paper, 0.7),
  backdropFilter: "saturate(140%) blur(8px)",
  boxShadow: "0 10px 28px rgba(0,0,0,.08)",
  transition: "transform .18s ease, box-shadow .18s ease, border-color .18s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 16px 40px rgba(0,0,0,.12)",
    borderColor: alpha(t.palette.primary.main, 0.25),
  },
});

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.35 } },
});

export const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0, transition: { delay, duration: 0.3 } },
});

export const pulseShadow = (t) => ({
  boxShadow: `0 0 0 0 ${alpha(t.palette.primary.main, 0.35)}`,
  animation: "pulseGlow 2.4s ease-out infinite",
  "@keyframes pulseGlow": {
    "0%": { boxShadow: `0 0 0 0 ${alpha(t.palette.primary.main, 0.35)}` },
    "70%": { boxShadow: `0 0 0 16px ${alpha(t.palette.primary.main, 0)}` },
    "100%": { boxShadow: `0 0 0 0 ${alpha(t.palette.primary.main, 0)}` },
  },
});
