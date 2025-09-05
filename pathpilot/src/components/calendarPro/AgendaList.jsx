import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { motion } from "framer-motion";

function fmt(t) {
  return new Date(t).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AgendaList({ date, items = [] }) {
  if (!items.length) {
    return (
      <Card variant="outlined" sx={{ borderStyle: "dashed" }}>
        <CardContent>
          <Typography align="center" color="text.secondary">
            رویدادی برای امروز ثبت نشده.
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <List dense>
      {items.map((e, i) => (
        <motion.div
          key={e.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <ListItem
            disablePadding
            secondaryAction={
              <Chip
                size="small"
                color={e.color || "default"}
                label={`${fmt(e.start)} - ${fmt(e.end)}`}
                icon={<AccessTimeRoundedIcon />}
              />
            }
            sx={{ py: 0.75 }}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 800 }}>{e.title}</Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {e.tag}
                </Typography>
              }
              sx={{ pr: 1 }}
            />
          </ListItem>
        </motion.div>
      ))}
    </List>
  );
}
