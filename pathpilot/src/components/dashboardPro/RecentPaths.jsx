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
import { useTheme, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { glassCard, fadeUp } from "./_shared";
import { Link } from "react-router-dom";

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
        <Typography sx={{ fontWeight: 900, mb: 0.5 }}>{p.title}</Typography>
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
            پیشرفت: <b>{p.progress ?? 0}%</b>
          </Typography>
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
