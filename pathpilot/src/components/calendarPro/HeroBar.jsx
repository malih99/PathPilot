import { Box, Stack, Typography, Button, IconButton } from "@mui/material";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useTheme, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

export default function HeroBar({ onAdd, selectedDate }) {
  const t = useTheme();
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        position: { md: "sticky", xs: "static" },
        top: 8,
        zIndex: 2,
        borderRadius: 2,
        p: 2,
        mb: 2,
        border: "1px solid",
        borderColor: alpha(t.palette.primary.main, 0.18),
        background:
          t.palette.mode === "light"
            ? "linear-gradient(90deg,#fafcff,#f3f6ff)"
            : alpha(t.palette.background.default, 0.6),
        backdropFilter: "blur(8px) saturate(140%)",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton color="primary">
            <TodayRoundedIcon />
          </IconButton>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 900 }}>
              تقویم
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedDate.toLocaleDateString("fa-IR")}
            </Typography>
          </Box>
        </Stack>
        <Button
          onClick={onAdd}
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{ borderRadius: 2, fontWeight: 900 }}
        >
          رویداد جدید
        </Button>
      </Stack>
    </Box>
  );
}
