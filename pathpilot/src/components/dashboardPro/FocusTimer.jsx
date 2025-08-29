import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { useTheme, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { glassCard, fadeUp } from "./_shared";

export default function FocusTimer({ defaultMinutes = 25 }) {
  const t = useTheme();
  const total = defaultMinutes * 60;
  const [seconds, setSeconds] = React.useState(total);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const pct = Math.round(((total - seconds) / total) * 100);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <Card
      component={motion.div}
      {...fadeUp(0.08)}
      elevation={0}
      sx={glassCard(t)}
    >
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            ⌛ تمرکز سریع
          </Typography>
        }
      />
      <CardContent sx={{ pt: 1 }}>
        <Box
          sx={{
            position: "relative",
            width: 160,
            height: 160,
            mx: "auto",
            my: 1.5,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={160}
            thickness={2.5}
            sx={{ color: (th) => alpha(th.palette.text.disabled, 0.2) }}
          />
          <CircularProgress
            variant="determinate"
            value={pct}
            size={160}
            thickness={3}
            sx={{ position: "absolute", inset: 0, color: "primary.main" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 900, fontSize: 28 }}>
              {mm}:{ss}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              از {defaultMinutes} دقیقه
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1} justifyContent="center">
          <Button
            onClick={() => setRunning((r) => !r)}
            variant="contained"
            startIcon={
              running ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />
            }
            sx={{ borderRadius: 12, fontWeight: 900 }}
          >
            {running ? "توقف" : "شروع"}
          </Button>
          <Button
            onClick={() => {
              setSeconds(total);
              setRunning(false);
            }}
            variant="outlined"
            startIcon={<RestartAltRoundedIcon />}
            sx={{ borderRadius: 12, fontWeight: 900 }}
          >
            ریست
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
