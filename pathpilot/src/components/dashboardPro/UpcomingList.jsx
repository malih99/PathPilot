import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
  Button,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { glassCard, slideLeft } from "./_shared";

export default function UpcomingList({
  items,
  title = "Task list",
  showAdd = false,
  onAdd,
}) {
  const t = useTheme();
  return (
    <Card
      component={motion.div}
      {...slideLeft(0.05)}
      elevation={0}
      sx={glassCard(t)}
    >
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {title}
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <List dense>
          {items.map((it, i) => (
            <motion.div
              key={it.id || it.title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <ListItem
                disablePadding
                secondaryAction={
                  <Chip
                    size="small"
                    label={it.due}
                    icon={<CalendarMonthRoundedIcon />}
                  />
                }
                sx={{ py: 0.75 }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {it.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {it.tag}
                    </Typography>
                  }
                  sx={{ pr: 1 }}
                />
              </ListItem>
            </motion.div>
          ))}
        </List>

        {showAdd && (
          <Button
            onClick={onAdd}
            startIcon={<AddRoundedIcon />}
            sx={{ mt: 1, fontWeight: 900 }}
          >
            Add task
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
