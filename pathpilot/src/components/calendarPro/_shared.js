// components/calendarPro/_shared.js
import { alpha } from "@mui/material/styles";
export const glass = (t) => ({
  borderRadius: 16,
  border: "1px solid",
  borderColor: alpha(t.palette.divider, 0.55),
  background:
    t.palette.mode === "light"
      ? "linear-gradient(180deg,#fff,rgba(255,255,255,.92))"
      : alpha(t.palette.background.paper, 0.7),
  backdropFilter: "saturate(140%) blur(8px)",
  boxShadow: "0 10px 28px rgba(0,0,0,.08)",
});
