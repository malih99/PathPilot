// src/pages/AchievementsPro.jsx
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Avatar,
  Stack,
  Tooltip,
  Button,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { motion } from "framer-motion";
import {
  glassCard,
  fadeUp,
  pulseShadow,
} from "../components/dashboardPro/_shared";

// داده نمونه
const badges = [
  {
    id: "b1",
    title: "اولین مسیر تکمیل شد",
    earned: true,
    icon: <CheckCircleRoundedIcon />,
  },
  {
    id: "b2",
    title: "۵ روز Streak",
    earned: false,
    icon: <StarsRoundedIcon />,
  },
  {
    id: "b3",
    title: "۱۰ ساعت تمرکز",
    earned: false,
    icon: <BoltRoundedIcon />,
  },
  {
    id: "b4",
    title: "۳ مسیر در ماه جاری",
    earned: false,
    icon: <EmojiEventsRoundedIcon />,
  },
];

export default function AchievementsPro() {
  const t = useTheme();
  const level = 12,
    xp = 340,
    xpNext = 500;
  const pct = Math.round((xp / xpNext) * 100);

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        {/* هدر دستاوردها (شیشه‌ای، فشرده، با Progress) */}
        <Grid item xs={12}>
          <Card
            component={motion.div}
            {...fadeUp(0)}
            elevation={0}
            sx={glassCard(t)}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    fontWeight: 900,
                    bgcolor: alpha(t.palette.primary.main, 0.18),
                    color: t.palette.primary.main,
                    border: `1px solid ${alpha(t.palette.primary.main, 0.22)}`,
                  }}
                >
                  {level}
                </Avatar>
              }
              title={
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    🏅 دستاوردها
                  </Typography>
                  <Chip
                    size="small"
                    label={`Level ${level}`}
                    color="primary"
                    variant="outlined"
                  />
                </Stack>
              }
              subheader={
                <Typography variant="caption" color="text.secondary">
                  XP: <b>{xp}</b> از <b>{xpNext}</b>
                </Typography>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <LinearProgress
                variant="determinate"
                value={pct}
                sx={{
                  height: 12,
                  borderRadius: 8,
                  bgcolor: (th) => alpha(th.palette.primary.main, 0.08),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 8,
                    background: (th) =>
                      `linear-gradient(90deg, ${
                        th.palette.primary.main
                      }, ${alpha(th.palette.primary.dark, 0.9)})`,
                  },
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 1 }}
              >
                <Typography variant="caption" color="text.secondary">
                  پیشرفت تا Level بعدی
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 800 }}>
                  {pct}%
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* کارت هدف بعدی / راهنمای سریع */}
        <Grid item xs={12} md={4}>
          <Card
            component={motion.div}
            {...fadeUp(0.05)}
            elevation={0}
            sx={glassCard(t)}
          >
            <CardHeader
              title={
                <Typography sx={{ fontWeight: 900 }}>🎯 هدف بعدی</Typography>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                با تکمیل <b>۲ تسک</b> دیگر و <b>۳۰ دقیقه تمرکز</b>، نشان «۵ روز
                Streak» را آزاد می‌کنی.
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ fontWeight: 900 }}
                >
                  شروع تمرکز 25’
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 900 }}
                >
                  افزودن تسک
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* شبکه‌ی نشان‌ها */}
        <Grid item xs={12} md={8}>
          <Card
            component={motion.div}
            {...fadeUp(0.06)}
            elevation={0}
            sx={glassCard(t)}
          >
            <CardHeader
              title={<Typography sx={{ fontWeight: 900 }}>نشان‌ها</Typography>}
              action={
                <Chip
                  size="small"
                  color="primary"
                  variant="outlined"
                  label={`${badges.filter((b) => b.earned).length} از ${
                    badges.length
                  } گرفته شده`}
                />
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={1.5}>
                {badges.map((b, i) => (
                  <Grid key={b.id} item xs={12} sm={6}>
                    <BadgeCard badge={b} delay={i * 0.05} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

/* —————————————————— اجزای فرعی —————————————————— */

function BadgeCard({ badge, delay = 0 }) {
  const t = useTheme();
  const earned = badge.earned;

  return (
    <Card
      component={motion.div}
      {...fadeUp(delay)}
      elevation={0}
      sx={{
        ...glassCard(t),
        px: 1.25,
        py: 1,
        position: "relative",
        overflow: "hidden",
        ...(earned ? pulseShadow(t) : {}),
      }}
    >
      {/* قفل نیمه‌شفاف برای حالت دریافت‌نشده */}
      {!earned && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: alpha(t.palette.background.default, 0.35),
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: alpha(t.palette.text.primary, 0.55),
            borderRadius: 2,
          }}
        >
          <Stack direction="row" gap={0.5} alignItems="center">
            <LockRoundedIcon fontSize="small" />
            <Typography variant="caption">قفل</Typography>
          </Stack>
        </Box>
      )}

      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Avatar
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: earned
              ? alpha(t.palette.primary.main, 0.18)
              : alpha("#9CA3AF", 0.18),
            color: earned ? t.palette.primary.main : "#6B7280",
            border: `1px solid ${
              earned
                ? alpha(t.palette.primary.main, 0.22)
                : alpha("#6B7280", 0.22)
            }`,
          }}
        >
          {badge.icon}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 900, mb: 0.25 }} noWrap>
            {badge.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {earned ? "گرفته‌شده" : "در انتظار"}
          </Typography>
        </Box>

        <Tooltip title={earned ? "تبریک! دریافت شد" : "شرایط را کامل کن"}>
          <Chip
            size="small"
            label={earned ? "✓" : "…"}
            color={earned ? "success" : "default"}
            variant={earned ? "filled" : "outlined"}
          />
        </Tooltip>
      </Stack>
    </Card>
  );
}
