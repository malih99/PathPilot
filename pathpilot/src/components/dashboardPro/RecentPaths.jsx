import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { glassCard, fadeUp } from "./_shared";
import { Link } from "react-router-dom";
import { IconReact, IconTS, IconTest } from "./icons";
import { alpha } from "@mui/material/styles";

const iconByKey = {
  react: <IconReact />,
  ts: <IconTS />,
  testing: <IconTest />,
};

function PathCard({ p, delay }) {
  const t = useTheme();
  return (
    <Card
      component={motion.div}
      {...fadeUp(delay)}
      elevation={0}
      sx={glassCard(t)}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              background:
                t.palette.mode === "light"
                  ? "linear-gradient(180deg, rgba(255,255,255,.95), rgba(248,248,255,.9))"
                  : alpha(t.palette.background.paper, 0.6),
              border: `1px solid ${alpha(t.palette.primary.main, 0.16)}`,
            }}
          >
            {iconByKey[p.icon || "react"]}
          </div>
          <Typography sx={{ fontWeight: 900 }}>{p.title}</Typography>
        </div>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minHeight: 40 }}
        >
          {p.description}
        </Typography>
        <Box
          sx={{
            mt: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            پیشرفت
          </Typography>
          <Box
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 10,
              fontWeight: 900,
              fontSize: 12,
              bgcolor: alpha(t.palette.primary.main, 0.12),
              color: t.palette.primary.main,
              border: `1px solid ${alpha(t.palette.primary.main, 0.18)}`,
            }}
          >
            {p.progress ?? 0}%
          </Box>
          <Button
            component={Link}
            to={`/paths/${p.id}`}
            size="small"
            endIcon={<PlayArrowRoundedIcon />}
            sx={{ fontWeight: 900 }}
          >
            ادامه بده
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function RecentPaths({ items }) {
  const t = useTheme();
  return (
    <Card
      component={motion.div}
      {...fadeUp(0.06)}
      elevation={0}
      sx={glassCard(t)}
    >
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            🔥 مسیرهای اخیر
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Grid container spacing={1.5}>
          {items.map((p, i) => (
            <Grid key={p.id} item xs={12} md={6} lg={4}>
              <PathCard p={p} delay={i * 0.08} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
