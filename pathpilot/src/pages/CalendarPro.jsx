// src/pages/CalendarPro.jsx
import { useState, useMemo } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  glassCard,
  fadeUp,
  slideLeft,
} from "../components/dashboardPro/_shared";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

// Calendar sub-components (قبلی خودت)
import HeroBar from "../components/calendarPro/HeroBar";
import MiniCalendar from "../components/calendarPro/MiniCalendar";
import AgendaList from "../components/calendarPro/AgendaList";
import EventDialog from "../components/calendarPro/EventDialog";
import FiltersBar from "../components/calendarPro/FiltersBar";

// Mock
const mockEvents = [
  {
    id: "e1",
    title: "جلسه React",
    tag: "React",
    start: "2025-08-30T09:00",
    end: "2025-08-30T10:00",
    color: "primary",
  },
  {
    id: "e2",
    title: "تمرین TDD",
    tag: "Testing",
    start: "2025-08-30T13:00",
    end: "2025-08-30T14:30",
    color: "success",
  },
  {
    id: "e3",
    title: "TypeScript — Generics",
    tag: "TS",
    start: "2025-08-31T11:00",
    end: "2025-08-31T12:00",
    color: "warning",
  },
];

export default function CalendarPro() {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({ tags: ["All"] });

  const filtered = useMemo(
    () =>
      mockEvents.filter((e) =>
        filters.tags.includes("All") ? true : filters.tags.includes(e.tag)
      ),
    [filters]
  );

  const sameDay = (a, b) => a.toDateString() === b.toDateString();
  const dayEvents = filtered.filter((e) =>
    sameDay(new Date(e.start), selectedDate)
  );

  const go = (days) =>
    setSelectedDate(
      (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + days)
    );

  return (
    <DashboardLayout>
      {/* هدر شیشه‌ای فشرده (هم‌استایل داشبورد) */}
      <Paper
        component={motion.div}
        {...fadeUp(0)}
        elevation={0}
        sx={{ ...glassCard(t), mb: 2, p: 1.5 }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          gap={1.25}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography sx={{ fontSize: 22, fontWeight: 900 }}>
              تقویم
            </Typography>
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              label={selectedDate.toLocaleDateString("fa-IR")}
            />
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            <IconButton onClick={() => go(-1)}>
              <ArrowBackRoundedIcon />
            </IconButton>
            <Button
              size="small"
              startIcon={<TodayRoundedIcon />}
              onClick={() => setSelectedDate(new Date())}
              sx={{ fontWeight: 900, borderRadius: 2 }}
              variant="outlined"
            >
              امروز
            </Button>
            <IconButton onClick={() => go(1)}>
              <ArrowForwardRoundedIcon />
            </IconButton>

            <Chip
              icon={<FilterListRoundedIcon />}
              label={
                filters.tags.includes("All")
                  ? "همه تگ‌ها"
                  : filters.tags.join("، ")
              }
              onClick={() =>
                setFilters((f) =>
                  f.tags[0] === "All"
                    ? { tags: ["React", "Testing", "TS"] }
                    : { tags: ["All"] }
                )
              }
              variant="outlined"
            />

            <Button
              onClick={() => setOpen(true)}
              startIcon={<AddRoundedIcon />}
              variant="contained"
              sx={{ fontWeight: 900, borderRadius: 2 }}
            >
              رویداد جدید
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* نوار فیلتر قدیمی (اگر نیاز داری نگه‌دار) */}
      {/* <FiltersBar value={filters} onChange={setFilters} /> */}

      <Grid container spacing={2}>
        {/* سایدبار تاریخ‌ها: چسبنده و شیشه‌ای */}
        <Grid item xs={12} lg={4}>
          <Card
            component={motion.div}
            {...slideLeft(0.02)}
            elevation={0}
            sx={{ ...glassCard(t), position: { lg: "sticky" }, top: 72 }}
          >
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  ماه جاری
                </Typography>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <MiniCalendar
                value={selectedDate}
                onChange={setSelectedDate}
                events={mockEvents}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* برنامه روز: عریض، با کارت شیشه‌ای و عنوان بولد */}
        <Grid item xs={12} lg={8}>
          <Card
            component={motion.div}
            {...fadeUp(0.04)}
            elevation={0}
            sx={glassCard(t)}
          >
            <CardHeader
              title={
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    🗓 برنامه روز
                  </Typography>
                  <Chip
                    size="small"
                    variant="outlined"
                    color="primary"
                    label={selectedDate.toLocaleDateString("fa-IR")}
                  />
                  <Chip
                    size="small"
                    label={`${dayEvents.length} رویداد`}
                    variant="outlined"
                  />
                </Stack>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <AgendaList date={selectedDate} items={dayEvents} />
              {dayEvents.length === 0 && (
                <Box
                  sx={{
                    mt: 2,
                    py: 3,
                    borderRadius: 2,
                    border: `1px dashed ${alpha(t.palette.primary.main, 0.18)}`,
                    textAlign: "center",
                    bgcolor: alpha(t.palette.primary.main, 0.04),
                  }}
                >
                  <Typography color="text.secondary">
                    رویدادی برای این روز ثبت نشده.
                  </Typography>
                  <Button
                    onClick={() => setOpen(true)}
                    startIcon={<AddRoundedIcon />}
                    sx={{ mt: 1, fontWeight: 900 }}
                    variant="contained"
                  >
                    افزودن رویداد
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <EventDialog
        open={open}
        onClose={() => setOpen(false)}
        defaultDate={selectedDate}
        onCreate={(payload) => {
          // TODO: اتصال به API
          console.log("create event", payload);
          setOpen(false);
        }}
      />
    </DashboardLayout>
  );
}
