import { Box, Chip, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

const TAGS = ["All", "React", "Testing", "TS"];

export default function FiltersBar({ value, onChange }) {
  const set = (tag) => {
    if (tag === "All") onChange({ tags: ["All"] });
    else {
      const tags = new Set(value.tags.includes("All") ? [] : value.tags);
      tags.has(tag) ? tags.delete(tag) : tags.add(tag);
      onChange({ tags: tags.size ? Array.from(tags) : ["All"] });
    }
  };
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      sx={{ mb: 2 }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="body2" color="text.secondary">
          فیلترها:
        </Typography>
        {TAGS.map((t) => (
          <Chip
            key={t}
            size="small"
            label={t}
            color={
              value.tags.includes(t) ||
              (t === "All" && value.tags.includes("All"))
                ? "primary"
                : "default"
            }
            onClick={() => set(t)}
            sx={{ fontWeight: 800 }}
          />
        ))}
      </Stack>
    </Box>
  );
}
