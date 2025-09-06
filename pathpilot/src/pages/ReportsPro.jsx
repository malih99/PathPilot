// src/pages/ReportsPro.jsx
import { useMemo } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { glassCard, fadeUp } from "../components/dashboardPro/_shared";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const weekly = [
  { d: "شنبه", v: 20 },
  { d: "یک", v: 40 },
  { d: "دو", v: 50 },
  { d: "سه", v: 70 },
  { d: "چهار", v: 65 },
  { d: "پنج", v: 80 },
  { d: "جمعه", v: 45 },
];
const monthly = [
  { m: "خرد", p: 30 },
  { m: "تیر", p: 45 },
  { m: "مرد", p: 60 },
  { m: "شه", p: 75 },
  { m: "مهر", p: 82 },
  { m: "آبا", p: 90 },
];

// KPI pill
function StatPill({ icon, label, value }) {
  const t = useTheme();
  return (
    <Paper
      component={motion.div}
      {...fadeUp(0.02)}
      elevation={0}
      sx={{
        px: 1.5,
        py: 1,
        borderRadius: 2.5,
        border: `1px solid ${alpha(t.palette.primary.main, 0.14)}`,
        bgcolor:
          t.palette.mode === "light"
            ? "rgba(255,255,255,.9)"
            : alpha(t.palette.background.paper, 0.6),
        display: "flex",
        alignItems: "center",
        gap: 1,
        minWidth: 140,
      }}
    >
      <Box
        sx={{
          width: 26,
          height: 26,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          background:
            t.palette.mode === "light"
              ? "linear-gradient(180deg,#fff,rgba(248,248,255,.9))"
              : alpha(t.palette.background.paper, 0.6),
          border: `1px solid ${alpha(t.palette.primary.main, 0.16)}`,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 900, lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Paper>
  );
}

function CardShell({ title, action, delay = 0, children }) {
  const t = useTheme();
  return (
    <Card
      component={motion.div}
      {...fadeUp(delay)}
      elevation={0}
      sx={glassCard(t)}
    >
      <CardHeader
        sx={{ pb: 1 }}
        title={
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {title}
          </Typography>
        }
        action={action}
      />
      <CardContent sx={{ pt: 0.5 }}>{children}</CardContent>
    </Card>
  );
}

function SoftTooltip({ active, payload, label }) {
  const t = useTheme();
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        px: 1,
        py: 0.5,
        borderRadius: 2,
        border: `1px solid ${alpha(t.palette.primary.main, 0.16)}`,
        bgcolor:
          t.palette.mode === "light"
            ? "rgba(255,255,255,.96)"
            : alpha(t.palette.background.paper, 0.92),
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      <div>{label}</div>
      <div style={{ color: t.palette.primary.main }}>{payload[0].value}</div>
    </Box>
  );
}

export default function ReportsPro() {
  const t = useTheme();
  const ids = useMemo(() => ({ line: "grad-line", bar: "grad-bar" }), []);

  return (
    <DashboardLayout>
      {/* کانتینر پهن و وسط‌چین تا نمودارها جا داشته باشند */}
      <Box sx={{ maxWidth: 1320, mx: "auto", width: "100%" }}>
        {/* هدر فشرده + KPIها */}
        <Box
          component={motion.div}
          {...fadeUp(0)}
          sx={{
            mb: 2,
            borderRadius: 3,
            p: 1.5,
            border: `1px solid ${alpha(t.palette.primary.main, 0.16)}`,
            background:
              t.palette.mode === "light"
                ? "linear-gradient(180deg,#ffffff,#f7f8fc)"
                : alpha(t.palette.background.default, 0.6),
            backdropFilter: "blur(8px)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            gap={1.25}
          >
            <Box>
              <Typography sx={{ fontSize: 20, fontWeight: 900, mb: 0.25 }}>
                گزارش‌ها
              </Typography>
              <Typography variant="caption" color="text.secondary">
                مرور سریعِ عملکرد
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <StatPill
                icon={<AccessTimeRoundedIcon fontSize="small" />}
                label="ساعات مطالعه"
                value="14h 20m"
              />
              <StatPill
                icon={<TimelineRoundedIcon fontSize="small" />}
                label="میانگین روزانه"
                value="2h 02m"
              />
              <StatPill
                icon={<CheckCircleRoundedIcon fontSize="small" />}
                label="تکمیل این ماه"
                value="12 تسک"
              />
              <StatPill
                icon={<LocalFireDepartmentRoundedIcon fontSize="small" />}
                label="Streak"
                value="5 روز"
              />
            </Stack>
          </Stack>
        </Box>

        {/* چیدمان جدید: CSS Grid با نسبت 2fr / 1fr */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 2,
          }}
        >
          {/* چارت خطی – عریض */}
          <CardShell
            title="📈 پیشرفت هفتگی"
            action={
              <Chip
                size="small"
                label="این هفته"
                color="primary"
                variant="outlined"
              />
            }
            delay={0.02}
          >
            <Box sx={{ height: { xs: 300, md: 440 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weekly}
                  margin={{ top: 8, right: 10, bottom: 8, left: 10 }}
                >
                  <defs>
                    <linearGradient id={ids.line} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={t.palette.primary.main} />
                      <stop offset="100%" stopColor={t.palette.primary.dark} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke={alpha(t.palette.text.primary, 0.08)}
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="d"
                    tick={{
                      fill: alpha(t.palette.text.primary, 0.6),
                      fontSize: 12,
                    }}
                    tickLine={false}
                    axisLine={{ stroke: alpha(t.palette.text.primary, 0.12) }}
                  />
                  <YAxis
                    tick={{
                      fill: alpha(t.palette.text.primary, 0.6),
                      fontSize: 12,
                    }}
                    tickLine={false}
                    axisLine={{ stroke: alpha(t.palette.text.primary, 0.12) }}
                  />
                  <Tooltip content={<SoftTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke={`url(#${ids.line})`}
                    strokeWidth={4}
                    dot={false}
                    activeDot={{
                      r: 5,
                      stroke: alpha(t.palette.primary.main, 0.2),
                      strokeWidth: 8,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardShell>

          {/* بارچارت – باریک اما بلند، با میله‌های پهن‌تر */}
          <CardShell title="🎯 تکمیل ماهیانه" delay={0.04}>
            <Box sx={{ height: { xs: 300, md: 440 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthly}
                  barSize={28}
                  barCategoryGap={18}
                  margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                >
                  <defs>
                    <linearGradient id={ids.bar} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={t.palette.primary.light} />
                      <stop offset="100%" stopColor={t.palette.primary.main} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke={alpha(t.palette.text.primary, 0.08)}
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="m"
                    tick={{
                      fill: alpha(t.palette.text.primary, 0.6),
                      fontSize: 12,
                    }}
                    tickLine={false}
                    axisLine={{ stroke: alpha(t.palette.text.primary, 0.12) }}
                  />
                  <YAxis
                    tick={{
                      fill: alpha(t.palette.text.primary, 0.6),
                      fontSize: 12,
                    }}
                    tickLine={false}
                    axisLine={{ stroke: alpha(t.palette.text.primary, 0.12) }}
                  />
                  <Tooltip content={<SoftTooltip />} />
                  <Bar
                    dataKey="p"
                    fill={`url(#${ids.bar})`}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardShell>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
