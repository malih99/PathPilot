import { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { useTheme, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { glass } from "./_shared";

function buildMonth(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstDay = start.getDay(); // 0..6
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= end.getDate(); d++)
    days.push(new Date(date.getFullYear(), date.getMonth(), d));
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

export default function MiniCalendar({ value, onChange, events = [] }) {
  const t = useTheme();
  const days = useMemo(() => buildMonth(value), [value]);
  const eventDates = new Set(
    events.map((e) => new Date(e.start).toDateString())
  );

  const next = () =>
    onChange(new Date(value.getFullYear(), value.getMonth() + 1, 1));
  const prev = () =>
    onChange(new Date(value.getFullYear(), value.getMonth() - 1, 1));

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      elevation={0}
      sx={glass(t)}
    >
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <IconButton onClick={prev}>
            <ChevronRightRoundedIcon />
          </IconButton>
          <Typography sx={{ fontWeight: 900 }}>
            {value.toLocaleDateString("fa-IR", {
              month: "long",
              year: "numeric",
            })}
          </Typography>
          <IconButton onClick={next}>
            <ChevronLeftRoundedIcon />
          </IconButton>
        </Stack>

        <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-1">
          {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            const isToday = d && d.toDateString() === new Date().toDateString();
            const hasEvent = d && eventDates.has(d.toDateString());
            const selected = d && d.toDateString() === value.toDateString();
            return (
              <button
                key={i}
                onClick={() => d && onChange(d)}
                className={`h-9 rounded-lg border text-sm ${
                  d ? "bg-white" : "bg-transparent"
                } ${selected ? "ring-2 ring-violet-400" : ""}`}
                style={{
                  borderColor: alpha(t.palette.divider, 0.6),
                  background: selected
                    ? alpha(t.palette.primary.main, 0.08)
                    : d
                    ? "white"
                    : "transparent",
                }}
              >
                {d ? d.getDate() : ""}
                {hasEvent && (
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      background: t.palette.primary.main,
                      margin: "2px auto 0",
                    }}
                  />
                )}
                {isToday && (
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      background: t.palette.success.main,
                      margin: "2px auto 0",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
