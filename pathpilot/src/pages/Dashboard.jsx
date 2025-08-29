import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  LinearProgress,
  Chip,
  Divider,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Stack,
  alpha,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

import DashboardLayout from "../layouts/DashboardLayout";

// ——— داده‌ی نمونه
const goals = [
  { title: "React", done: 2, total: 5 },
  { title: "TypeScript", done: 1, total: 4 },
  { title: "Testing", done: 3, total: 3 },
];

const upcoming = [
  { title: "اتمام Chapter 2 — TS", due: "فردا", tag: "TypeScript" },
  { title: "تمرین TDD — Jest", due: "۳ روز دیگر", tag: "Testing" },
  { title: "پیاده‌سازی فرم‌ها — React", due: "۵ روز دیگر", tag: "React" },
];

const activity = [
  { text: "Marked task: «درک JSX» as Done", time: "۱ ساعت قبل" },
  { text: "Added note to «Hooks Basics»", time: "دیروز" },
  { text: "Created path «TypeScript Deep Dive»", time: "۳ روز قبل" },
];

// ——— توکن‌های سبک
const cardStyle = {
  borderRadius: 3,
  border: "1px solid",
  borderColor: (t) => alpha(t.palette.divider, 0.6),
  boxShadow: "0 4px 24px rgba(0,0,0,.04)",
};

function KPI({ icon, value, label, hint }) {
  return (
    <Card elevation={0} sx={cardStyle}>
      <CardContent
        sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.75 }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
          }}
        >
          {icon}
        </Box>
        <Box sx={{ lineHeight: 1.15, minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, whiteSpace: "nowrap" }}
          >
            {value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          {hint && (
            <Typography
              variant="caption"
              sx={{ ml: 0.75, color: "success.main", fontWeight: 700 }}
            >
              {hint}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

function GoalRow({ title, done, total }) {
  const pct = Math.min(100, Math.round((done / total) * 100));
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {done} از {total}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 8,
          borderRadius: 2,
          bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
          "& .MuiLinearProgress-bar": { borderRadius: 2 },
        }}
      />
    </Box>
  );
}

export default function Dashboard() {
  const kpis = [
    {
      icon: <ChecklistRoundedIcon fontSize="small" />,
      value: 12,
      label: "تسک‌های باز",
      hint: "+3",
    },
    {
      icon: <AccessTimeRoundedIcon fontSize="small" />,
      value: "3h 20m",
      label: "زمان این هفته",
    },
    {
      icon: <TrendingUpRoundedIcon fontSize="small" />,
      value: "78%",
      label: "پیشرفت هفتگی",
      hint: "↑2%",
    },
    {
      icon: <SchoolRoundedIcon fontSize="small" />,
      value: 5,
      label: "مسیرهای فعال",
    },
  ];

  const [tab, setTab] = React.useState(0);

  return (
    <DashboardLayout>
      {/* هدر چسبان با اکشن‌های سریع */}
      <Box
        sx={{
          position: { md: "sticky", xs: "static" },
          top: 8,
          zIndex: 1,
          backdropFilter: "blur(6px) saturate(140%)",
          backgroundColor: (t) => alpha(t.palette.background.paper, 0.7),
          borderRadius: 2,
          border: "1px solid",
          borderColor: (t) => alpha(t.palette.divider, 0.6),
          px: 2,
          py: 1.25,
          mb: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="h2" sx={{ fontSize: 22, fontWeight: 900 }}>
              خوش برگشتی 👋
            </Typography>
            <Typography variant="body2" color="text.secondary">
              امروز روی مهم‌ترین کارها تمرکز کنیم.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Tooltip title="شروع تمرین (Pomodoro)">
              <IconButton
                color="primary"
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  "&:hover": { bgcolor: "primary.dark" },
                  borderRadius: 2,
                }}
              >
                <PlayArrowRoundedIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              sx={{ borderRadius: 2, fontWeight: 800 }}
              onClick={() => {}}
            >
              افزودن سریع
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* KPI ها تمام‌عرض، واکنش‌گرا */}
      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        {kpis.map((k, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <KPI {...k} />
          </Grid>
        ))}
      </Grid>

      {/* Tabs به‌سبک Segmented */}
      <Card elevation={0} sx={{ ...cardStyle, mb: 2 }}>
        <CardContent sx={{ pt: 1.25 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            sx={{
              minHeight: 0,
              "& .MuiTab-root": {
                minHeight: 0,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 800,
                mx: 0.5,
                px: 1.25,
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .Mui-selected": {
                bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
              },
            }}
          >
            <Tab label="مرور اجمالی" />
            <Tab label="مسیرهای یادگیری" />
            <Tab label="وظایف امروز" />
          </Tabs>
        </CardContent>
        <Divider />
        <CardContent sx={{ pt: 2 }}>
          {tab === 0 && (
            <Grid container spacing={2}>
              {/* اهداف یادگیری */}
              <Grid item xs={12} md={7} lg={8}>
                <Card elevation={0} sx={cardStyle}>
                  <CardHeader
                    title={
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        🎯 اهداف یادگیری
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
                  <CardContent sx={{ pt: 0 }}>
                    {goals.map((g) => (
                      <GoalRow key={g.title} {...g} />
                    ))}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        size="small"
                        endIcon={<ArrowOutwardRoundedIcon fontSize="small" />}
                        sx={{ mt: 1, fontWeight: 800 }}
                      >
                        دیدن همه‌ی مسیرها
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* نزدیک‌ترین موعدها + فعالیت اخیر */}
              <Grid item xs={12} md={5} lg={4}>
                <Card elevation={0} sx={{ ...cardStyle, mb: 2 }}>
                  <CardHeader
                    title={
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        📅 نزدیک‌ترین موعدها
                      </Typography>
                    }
                    subheader={
                      <Typography variant="caption" color="text.secondary">
                        ۷ روز آینده
                      </Typography>
                    }
                  />
                  <CardContent sx={{ pt: 0 }}>
                    <List dense>
                      {upcoming.map((it) => (
                        <ListItem
                          key={it.title}
                          secondaryAction={
                            <Chip
                              size="small"
                              label={it.due}
                              icon={<CalendarMonthRoundedIcon />}
                            />
                          }
                          disablePadding
                          sx={{ py: 0.75 }}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 700 }}
                              >
                                {it.title}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {it.tag}
                              </Typography>
                            }
                            sx={{ pr: 1 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>

                <Card elevation={0} sx={cardStyle}>
                  <CardHeader
                    title={
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        🕘 فعالیت اخیر
                      </Typography>
                    }
                  />
                  <CardContent sx={{ pt: 0 }}>
                    <List dense>
                      {activity.map((a, i) => (
                        <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                          <ListItemText
                            primary={
                              <Typography variant="body2">{a.text}</Typography>
                            }
                            secondary={
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {a.time}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {tab === 1 && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                لیست مسیرها به‌زودی به API متصل می‌شود.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<SchoolRoundedIcon />}
                sx={{ fontWeight: 800 }}
              >
                ساخت مسیر جدید
              </Button>
            </Box>
          )}

          {tab === 2 && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                وظایف امروز را اینجا می‌بینی و می‌توانی شروع به کار کنی.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ChecklistRoundedIcon />}
                sx={{ fontWeight: 800 }}
              >
                افزودن تسک
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* منابع و تمرکز سریع */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={cardStyle}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  🔗 منابع منتخب
                </Typography>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <List dense>
                <ListItem disablePadding sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <a
                        className="text-violet-700 font-bold"
                        href="#"
                        rel="noreferrer"
                      >
                        React Docs — Effect
                      </a>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        خواندن ۱۰ دقیقه
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <a
                        className="text-violet-700 font-bold"
                        href="#"
                        rel="noreferrer"
                      >
                        TypeScript Handbook — Generics
                      </a>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        خواندن ۱۵ دقیقه
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={cardStyle}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  ⌛ تمرکز سریع
                </Typography>
              }
            />
            <CardContent sx={{ pt: 0, display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<PlayArrowRoundedIcon />}
                sx={{ fontWeight: 800 }}
              >
                شروع 25m
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<PlayArrowRoundedIcon />}
                sx={{ fontWeight: 800 }}
              >
                شروع 50m
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
