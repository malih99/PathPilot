import DashboardLayout from "../layouts/DashboardLayout";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";

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

const badges = [
  { id: "b1", title: "اولین مسیر تکمیل شد", earned: true },
  { id: "b2", title: "۵ روز Streak", earned: false },
  { id: "b3", title: "۱۰ ساعت تمرکز", earned: false },
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
        <Grid item xs={12}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            elevation={0}
            sx={glass(t)}
          >
            <CardHeader
              title={
                <Typography sx={{ fontWeight: 900 }}>🏅 دستاوردها</Typography>
              }
            />
            <CardContent>
              <Typography sx={{ mb: 1.5 }}>
                Level <b>{level}</b> — XP: <b>{xp}</b>/<b>{xpNext}</b>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={pct}
                sx={{ height: 10, borderRadius: 6 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {badges.map((b, i) => (
          <Grid key={b.id} item xs={12} sm={6} md={4}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
              elevation={0}
              sx={glass(t)}
            >
              <CardHeader
                title={
                  <Typography sx={{ fontWeight: 900 }}>{b.title}</Typography>
                }
                action={
                  <Chip
                    size="small"
                    label={b.earned ? "گرفته‌شده" : "در انتظار"}
                    color={b.earned ? "success" : "default"}
                  />
                }
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
}
