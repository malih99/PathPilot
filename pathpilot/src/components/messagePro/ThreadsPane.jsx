import {
  List,
  ListItemButton,
  ListItemText,
  Badge,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function ThreadsPane({ items = [], active, onSelect }) {
  return (
    <List
      disablePadding
      sx={{ maxHeight: "calc(100dvh - 230px)", overflow: "auto" }}
    >
      {items.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          <ListItemButton
            selected={t.id === active}
            onClick={() => onSelect(t.id)}
            sx={{ py: 1.25 }}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 800, mb: 0.25 }}>
                  {t.title}
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {t.last}
                </Typography>
              }
            />
            {t.unread > 0 && <Badge color="error" badgeContent={t.unread} />}
          </ListItemButton>
        </motion.div>
      ))}
    </List>
  );
}
