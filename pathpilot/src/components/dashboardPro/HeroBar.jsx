import { Box, Stack, Typography, Paper } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { fadeUp } from "./_shared";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Chip, InputBase } from "@mui/material";

function StatPill({ value, label }) {
  return (
    <Paper
      elevation={0}
      sx={{
        px: 2.2,
        py: 1.2,
        borderRadius: 3,
        border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.18)}`,
        bgcolor: (t) =>
          t.palette.mode === "light"
            ? "rgba(255,255,255,.9)"
            : alpha(t.palette.background.paper, 0.6),
        backdropFilter: "blur(8px)",
        minWidth: 130,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );
}

export default function HeroBar({
  onQuickAdd,
  miniStats = [],
  daysStreak = 0,
}) {
  const t = useTheme();
  return (
    <Box
      component={motion.div}
      {...fadeUp(0)}
      sx={{
        position: { md: "sticky", xs: "static" },
        top: 8,
        zIndex: 3,
        borderRadius: 3,
        p: 2.5,
        mb: 2,
        background:
          t.palette.mode === "light"
            ? "linear-gradient(180deg,#ffffff,#f7f8fc)"
            : alpha(t.palette.background.default, 0.6),
        border: "1px solid",
        borderColor: alpha(t.palette.primary.main, 0.18),
        backdropFilter: "blur(8px) saturate(140%)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 900, mb: 0.5 }}>
            خوش برگشتی
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <Chip
              label={`${daysStreak} روز تمرکز پیاپی`}
              color="primary"
              variant="outlined"
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              امروز روی مهم‌ترین کارها تمرکز کن
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.5,
              px: 1.5,
              py: 1,
              borderRadius: 999,
              border: (th) =>
                `1px solid ${alpha(th.palette.primary.main, 0.18)}`,
              bgcolor: (th) =>
                th.palette.mode === "light"
                  ? "rgba(255,255,255,.9)"
                  : alpha(th.palette.background.paper, 0.6),
            }}
          >
            <SearchRoundedIcon fontSize="small" />
            <InputBase placeholder="جستجو..." sx={{ fontSize: 14 }} />
          </Box>
          {miniStats.map((s) => (
            <StatPill key={s.id} value={s.value} label={s.label} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
