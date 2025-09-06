import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { usePaths, useCreatePath } from "../queries/paths";

import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Button,
  IconButton,
  InputBase,
  Stack,
  LinearProgress,
  Paper,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  glassCard,
  fadeUp,
  slideLeft,
} from "../components/dashboardPro/_shared";

// Icons
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

// Dialog
import AddPathDialog from "../features/paths/AddPathDialog";

/* ============================= Page ============================= */
export default function LearningPaths() {
  const t = useTheme();
  const { data, isLoading, isError, refetch } = usePaths();
  const createPath = useCreatePath();

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    let list = data ?? [];
    if (q.trim()) {
      const k = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(k) ||
          p.description?.toLowerCase().includes(k)
      );
    }
    if (filter === "active") list = list.filter((p) => getProgress(p) < 100);
    if (filter === "completed")
      list = list.filter((p) => getProgress(p) >= 100);
    if (filter === "starred") list = list.filter((p) => !!p.starred);
    return list;
  }, [data, q, filter]);

  const cycleFilter = () =>
    setFilter((f) =>
      f === "all"
        ? "active"
        : f === "active"
        ? "completed"
        : f === "completed"
        ? "starred"
        : "all"
    );

  return (
    <DashboardLayout>
      {/* Header – شیشه‌ای و فشرده مثل هیروباری که ساختیم */}
      <Paper
        component={motion.div}
        {...fadeUp(0)}
        elevation={0}
        sx={{
          ...glassCard(t),
          mb: 2,
          p: 1.5,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          gap={1.5}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography sx={{ fontSize: 22, fontWeight: 900 }}>
              مسیرهای یادگیری
            </Typography>
            {!isLoading && (
              <Chip
                size="small"
                variant="outlined"
                color="primary"
                label={`${filtered.length} مسیر`}
              />
            )}
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            {/* Search pill */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.75,
                borderRadius: 999,
                border: `1px solid ${alpha(t.palette.primary.main, 0.18)}`,
                bgcolor:
                  t.palette.mode === "light"
                    ? "rgba(255,255,255,.9)"
                    : alpha(t.palette.background.paper, 0.6),
              }}
            >
              <SearchRoundedIcon fontSize="small" />
              <InputBase
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="جستجو بین مسیرها…"
                sx={{ fontSize: 14, minWidth: 240 }}
              />
            </Box>

            {/* Filter chip (چرخه‌ای) */}
            <Chip
              icon={<FilterListRoundedIcon />}
              label={filterLabel(filter)}
              onClick={cycleFilter}
              variant="outlined"
              sx={{ fontWeight: 800 }}
            />

            {/* Add Path */}
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              startIcon={<AddRoundedIcon />}
              sx={{ fontWeight: 900, borderRadius: 2 }}
            >
              افزودن مسیر
            </Button>
          </Stack>
        </Stack>

        {/* سرچ موبایل */}
        <Box sx={{ mt: 1, display: { xs: "block", md: "none" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.25,
              py: 0.75,
              borderRadius: 999,
              border: `1px solid ${alpha(t.palette.primary.main, 0.18)}`,
              bgcolor:
                t.palette.mode === "light"
                  ? "rgba(255,255,255,.9)"
                  : alpha(t.palette.background.paper, 0.6),
            }}
          >
            <SearchRoundedIcon fontSize="small" />
            <InputBase
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجو بین مسیرها…"
              sx={{ fontSize: 14, flex: 1 }}
            />
          </Box>
        </Box>
      </Paper>

      {/* States */}
      {isError && <ErrorState onRetry={refetch} />}

      {isLoading ? (
        <SkeletonGrid />
      ) : filtered.length === 0 ? (
        <EmptyState onCreate={() => setOpen(true)} />
      ) : (
        <Grid container spacing={2}>
          {filtered.map((p, i) => (
            <Grid key={p.id} item xs={12} sm={6} xl={4}>
              <PathCard p={p} delay={i * 0.04} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog */}
      {open && (
        <AddPathDialog
          onClose={() => setOpen(false)}
          onSubmit={(payload) =>
            createPath.mutate(payload, { onSuccess: () => setOpen(false) })
          }
        />
      )}
    </DashboardLayout>
  );
}

/* ========================= Components ========================= */

function PathCard({ p, delay = 0 }) {
  const t = useTheme();
  const progress = getProgress(p);
  const total = p.stats?.total ?? p.lessonsCount ?? p.units?.length ?? 0;
  const done =
    p.stats?.completed ??
    p.completedCount ??
    Math.round((progress * total) / 100);

  return (
    <Card
      component={motion.div}
      {...slideLeft(delay)}
      elevation={0}
      sx={glassCard(t)}
    >
      <CardHeader
        sx={{ pb: 1 }}
        title={
          <Stack direction="row" alignItems="center" gap={1} minWidth={0}>
            <Typography
              noWrap
              variant="subtitle1"
              sx={{ fontWeight: 900, flex: 1, minWidth: 0 }}
              title={p.title}
            >
              {p.title}
            </Typography>
            {p.starred && (
              <Chip
                size="small"
                icon={<StarRoundedIcon />}
                label="برگزیده"
                color="warning"
                variant="outlined"
                sx={{ fontWeight: 800 }}
              />
            )}
            {p.duration && (
              <Chip
                size="small"
                icon={<AccessTimeRoundedIcon />}
                label={formatDuration(p.duration)}
                variant="outlined"
              />
            )}
          </Stack>
        }
        action={
          <IconButton size="small">
            <MoreHorizRoundedIcon />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        {p.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {p.description}
          </Typography>
        )}

        {/* Progress */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="caption" sx={{ fontWeight: 800 }}>
            پیشرفت
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 900 }}>
            {progress}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            mt: 1,
            height: 10,
            borderRadius: 6,
            bgcolor: (th) => alpha(th.palette.primary.main, 0.08),
            "& .MuiLinearProgress-bar": {
              borderRadius: 6,
              transition: "width .6s ease",
              background: (th) =>
                `linear-gradient(90deg, ${th.palette.primary.main}, ${alpha(
                  th.palette.primary.dark,
                  0.9
                )})`,
            },
          }}
        />
        {total > 0 && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.75, display: "block" }}
          >
            {done} از {total} فصل/درس تکمیل شده
          </Typography>
        )}

        {/* Footer */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1.5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {progress >= 100 ? (
              <Chip
                size="small"
                color="success"
                label="تکمیل شد"
                icon={<CheckCircleRoundedIcon />}
                variant="outlined"
              />
            ) : p.nextDue ? (
              <Chip
                size="small"
                variant="outlined"
                icon={<AccessTimeRoundedIcon />}
                label={`موعد بعدی: ${formatDate(p.nextDue)}`}
              />
            ) : null}
          </Box>
          <Button
            component={Link}
            to={`/paths/${p.id}`}
            variant="contained"
            endIcon={<PlayArrowRoundedIcon />}
            sx={{ fontWeight: 900, borderRadius: 2 }}
          >
            ادامه بده
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

function SkeletonGrid() {
  const t = useTheme();
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid key={i} item xs={12} sm={6} xl={4}>
          <Card
            component={motion.div}
            {...fadeUp(i * 0.04)}
            elevation={0}
            sx={glassCard(t)}
          >
            <CardContent>
              <Box
                sx={{
                  height: 14,
                  width: 220,
                  bgcolor: "action.hover",
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  mt: 1,
                  height: 12,
                  width: 300,
                  bgcolor: "action.hover",
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  mt: 1,
                  height: 12,
                  width: 260,
                  bgcolor: "action.hover",
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  mt: 2,
                  height: 10,
                  width: "100%",
                  bgcolor: "action.hover",
                  borderRadius: 1,
                }}
              />
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                <Box
                  sx={{
                    height: 36,
                    width: 120,
                    bgcolor: "action.hover",
                    borderRadius: 1,
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function EmptyState({ onCreate }) {
  const t = useTheme();
  return (
    <Paper
      component={motion.div}
      {...fadeUp(0.04)}
      elevation={0}
      sx={{
        ...glassCard(t),
        borderStyle: "dashed",
        py: 6,
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontWeight: 900, mb: 1 }}>
        هنوز مسیری تعریف نکردی
      </Typography>
      <Typography variant="body2" color="text.secondary">
        با ساخت یک «مسیر یادگیری»، فصل‌ها و اهداف هفتگی‌ات را منظم کن تا پیشرفتت
        همیشه جلوی چشم باشد.
      </Typography>
      <Button
        onClick={onCreate}
        startIcon={<AddRoundedIcon />}
        variant="contained"
        sx={{ mt: 2, fontWeight: 900 }}
      >
        ساخت مسیر جدید
      </Button>
    </Paper>
  );
}

function ErrorState({ onRetry }) {
  const t = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        ...glassCard(t),
        borderColor: alpha("#ef4444", 0.35),
        bgcolor: alpha("#ef4444", 0.04),
        p: 2,
        mb: 2,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography sx={{ fontWeight: 900, color: "#b91c1c" }}>
            خطا در دریافت مسیرها
          </Typography>
          <Typography variant="body2" color="text.secondary">
            لطفاً دوباره تلاش کن.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="error"
          onClick={onRetry}
          sx={{ fontWeight: 900 }}
        >
          تلاش مجدد
        </Button>
      </Stack>
    </Paper>
  );
}

/* ============================ Helpers ============================ */
function filterLabel(filter) {
  switch (filter) {
    case "all":
      return "همه";
    case "active":
      return "در حال انجام";
    case "completed":
      return "تکمیل‌شده";
    case "starred":
      return "برگزیده";
    default:
      return "همه";
  }
}
function getProgress(p) {
  if (typeof p.progress === "number") return clamp(p.progress, 0, 100);
  if (p.stats?.total > 0 && typeof p.stats?.completed === "number") {
    return clamp(Math.round((p.stats.completed / p.stats.total) * 100), 0, 100);
  }
  return 0;
}
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}
function formatDuration(mins) {
  if (!mins) return "—";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}س ${m}د`;
  if (h) return `${h}ساعت`;
  return `${m}دقیقه`;
}
function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fa-IR");
  } catch {
    return iso ?? "—";
  }
}
