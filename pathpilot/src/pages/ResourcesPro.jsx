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
  Avatar,
  IconButton,
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

import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import JavascriptRoundedIcon from "@mui/icons-material/JavascriptRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";

const ITEMS = [
  {
    id: "r1",
    title: "React Docs — Effects",
    tag: "React",
    read: "10m",
    url: "#",
  },
  {
    id: "r2",
    title: "TS Handbook — Generics",
    tag: "TS",
    read: "15m",
    url: "#",
  },
  {
    id: "r3",
    title: "Testing Library — Queries",
    tag: "Testing",
    read: "8m",
    url: "#",
  },
];

const TAGS = ["All", "React", "TS", "Testing"];

const tagIcon = {
  React: <JavascriptRoundedIcon />,
  TS: <ScienceRoundedIcon />,
  Testing: <BugReportRoundedIcon />,
};

export default function ResourcesPro() {
  const t = useTheme();
  const [tag, setTag] = useState("All");

  const filtered = useMemo(
    () => (tag === "All" ? ITEMS : ITEMS.filter((i) => i.tag === tag)),
    [tag]
  );

  return (
    <DashboardLayout>
      {/* Header شیشه‌ای و فشرده مثل داشبورد */}
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
              🔗 منابع منتخب
            </Typography>
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              label={`${filtered.length} مورد`}
            />
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {TAGS.map((tname) => (
              <Chip
                key={tname}
                size="small"
                label={tname}
                color={tag === tname ? "primary" : "default"}
                onClick={() => setTag(tname)}
                variant={tag === tname ? "filled" : "outlined"}
                sx={{ fontWeight: 800 }}
              />
            ))}
          </Stack>
        </Stack>
      </Paper>

      {/* Grid کارت‌ها */}
      <Grid container spacing={2}>
        {filtered.map((r, i) => (
          <Grid key={r.id} item xs={12} sm={6} md={4}>
            <ResourceCard r={r} delay={i * 0.05} />
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
}

/* -------------------- کارت منبع -------------------- */
function ResourceCard({ r, delay = 0 }) {
  const t = useTheme();
  return (
    <Card
      component={motion.div}
      {...slideLeft(delay)}
      elevation={0}
      sx={glassCard(t)}
    >
      <CardHeader
        sx={{ pb: 1 }}
        avatar={
          <Avatar
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              bgcolor: alpha(t.palette.primary.main, 0.16),
              color: t.palette.primary.main,
              border: `1px solid ${alpha(t.palette.primary.main, 0.22)}`,
            }}
          >
            {tagIcon[r.tag] ?? <AutoStoriesRoundedIcon />}
          </Avatar>
        }
        title={
          <Typography
            noWrap
            variant="subtitle1"
            sx={{ fontWeight: 900 }}
            title={r.title}
          >
            {r.title}
          </Typography>
        }
        subheader={
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip size="small" label={r.tag} variant="outlined" />
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessTimeRoundedIcon fontSize="inherit" />
              <Typography variant="caption" color="text.secondary">
                {r.read}
              </Typography>
            </Stack>
          </Stack>
        }
        action={
          <IconButton size="small" title="افزودن به نشان‌کرده‌ها">
            <BookmarkAddRoundedIcon />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            منبع پیشنهادی برای مطالعه سریع و مرور نکات کلیدی این موضوع.
          </Typography>
          <Button
            href={r.url}
            target="_blank"
            size="small"
            endIcon={<OpenInNewRoundedIcon />}
            sx={{ fontWeight: 900, ml: 1, whiteSpace: "nowrap" }}
          >
            باز کن
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
