import React from "react";
import { Grid, Card, CardContent, Box, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { motion } from "framer-motion";
import { glassCard, fadeUp } from "./_shared";

function useCountUp(target, duration = 900) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const clean = String(target);
    const end = parseInt(clean.replace(/\D/g, "")) || 0;
    let n = 0;
    const step = Math.max(1, Math.round(end / (duration / 16)));
    const id = setInterval(() => {
      n += step;
      if (n >= end) {
        clearInterval(id);
        setVal(end);
      } else setVal(n);
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  const suffix = /[%a-z]/i.test(String(target).slice(-1))
    ? String(target).replace(/\d/g, "")
    : "";
  return `${val}${suffix}`;
}

function Stat({ icon, label, value, hint, delay }) {
  const t = useTheme();
  const counted = useCountUp(value);
  return (
    <Card
      component={motion.div}
      {...fadeUp(delay)}
      elevation={0}
      sx={glassCard(t)}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: (th) => alpha(th.palette.primary.main, 0.1),
            boxShadow: (th) =>
              `inset 0 0 0 1px ${alpha(th.palette.primary.main, 0.12)}`,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {counted}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          {hint && (
            <Typography
              variant="caption"
              sx={{ ml: 0.75, color: "success.main", fontWeight: 800 }}
            >
              {hint}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function KPIDeck({ stats }) {
  const icons = {
    tasks: <ChecklistRoundedIcon fontSize="small" />,
    time: <AccessTimeRoundedIcon fontSize="small" />,
    trend: <TrendingUpRoundedIcon fontSize="small" />,
    paths: <SchoolRoundedIcon fontSize="small" />,
  };
  return (
    <Grid container spacing={1.5} sx={{ mb: 2 }}>
      {stats.map((s, i) => (
        <Grid key={s.id} item xs={12} sm={6} md={3}>
          <Stat
            delay={i * 0.08}
            icon={icons[s.icon] || icons.trend}
            label={s.label}
            value={s.value}
            hint={s.hint}
          />
        </Grid>
      ))}
    </Grid>
  );
}
