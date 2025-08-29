import { Box, Stack, Typography, IconButton, Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { fadeUp, pulseShadow } from "./_shared";

export default function HeroBar({ onQuickAdd }) {
  const t = useTheme();
  return (
    <Box
      component={motion.div}
      {...fadeUp(0)}
      sx={{
        position: { md: "sticky", xs: "static" },
        top: 8,
        zIndex: 3,
        borderRadius: 16,
        p: 2,
        mb: 2,
        background:
          t.palette.mode === "light"
            ? "linear-gradient(90deg,#fafcff,#f3f6ff)"
            : alpha(t.palette.background.default, 0.6),
        border: "1px solid",
        borderColor: alpha(t.palette.primary.main, 0.18),
        backdropFilter: "blur(8px) saturate(140%)",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography sx={{ fontSize: 22, fontWeight: 900 }}>
            خوش برگشتی 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            امروز روی مهم‌ترین کارها تمرکز کنیم.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              borderRadius: 12,
              "&:hover": { bgcolor: "primary.dark" },
              ...pulseShadow(t),
            }}
          >
            <PlayArrowRoundedIcon />
          </IconButton>
          <Button
            onClick={onQuickAdd}
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ borderRadius: 12, fontWeight: 900 }}
          >
            افزودن سریع
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
