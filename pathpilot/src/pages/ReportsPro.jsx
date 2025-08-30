import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

// اگر recharts نصب کردی این‌ها رو باز کن:
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

const glass = (t) => ({
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

export default function ReportsPro() {
  const t = useTheme();
  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        {/* Progress (Weekly Line) */}
        <Grid item xs={12} md={8}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            elevation={0}
            sx={glass(t)}
          >
            <CardHeader
              title={
                <Typography sx={{ fontWeight: 900 }}>
                  📈 پیشرفت هفتگی
                </Typography>
              }
              action={
                <Chip
                  size="small"
                  label="این هفته"
                  color="primary"
                  variant="outlined"
                />
              }
            />
            <CardContent sx={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weekly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="d" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke={t.palette.primary.main}
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Completion (Bar) */}
        <Grid item xs={12} md={4}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            elevation={0}
            sx={glass(t)}
          >
            <CardHeader
              title={
                <Typography sx={{ fontWeight: 900 }}>
                  🎯 تکمیل ماهیانه
                </Typography>
              }
            />
            <CardContent sx={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="m" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="p"
                    fill={t.palette.primary.main}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Summary KPI */}
        <Grid item xs={12}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            elevation={0}
            sx={glass(t)}
          >
            <CardContent
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                gap: 12,
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  ساعات مطالعه
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  14h 20m
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  میانگین روزانه
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  2h 02m
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  تکمیل این ماه
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  12 تسک
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  Streak
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  5 روز 🔥
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
