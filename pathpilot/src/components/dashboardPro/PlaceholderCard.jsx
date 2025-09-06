import { Card, CardHeader, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { glassCard, fadeUp } from "./_shared";

export default function PlaceholderCard({ title = "پومودورو", delay = 0.08 }) {
  const t = useTheme();
  return (
    <Card
      component={motion.div}
      {...fadeUp(delay)}
      elevation={0}
      sx={glassCard(t)}
    >
      <CardHeader title={title} />
      <Box sx={{ height: 120 }} />
    </Card>
  );
}
