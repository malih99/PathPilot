import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Chip,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { glassCard, fadeUp } from "./_shared";

export default function GoalsProgress({ goals }) {
  const t = useTheme();
  return (
    <Card
      component={motion.div}
      {...fadeUp(0.05)}
      elevation={0}
      sx={glassCard(t)}
    >
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
        {goals.map((g, i) => {
          const pct = g.total ? Math.round((g.done / g.total) * 100) : 0;
          return (
            <Box
              key={g.id || g.title}
              component={motion.div}
              {...fadeUp(i * 0.07)}
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.75,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 800 }}>
                  {g.label || g.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {g.done} از {g.total}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={pct}
                sx={{
                  height: 10,
                  borderRadius: 6,
                  bgcolor: (th) => alpha(th.palette.primary.main, 0.08),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 6,
                    transition: "width .6s ease",
                    background: (th) =>
                      `linear-gradient(90deg, ${
                        th.palette.primary.main
                      }, ${alpha(th.palette.primary.dark, 0.9)})`,
                  },
                }}
              />
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
}
