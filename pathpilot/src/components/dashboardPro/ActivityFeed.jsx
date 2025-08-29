import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { glassCard, fadeUp } from "./_shared";

export default function ActivityFeed({ items }) {
  const t = useTheme();
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
            🕘 فعالیت اخیر
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <List dense>
          {items.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ListItem disablePadding sx={{ py: 0.5 }}>
                <ListItemText
                  primary={<Typography variant="body2">{a.text}</Typography>}
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {a.time}
                    </Typography>
                  }
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
