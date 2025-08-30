import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DashboardLayout from "../layouts/DashboardLayout";
import { motion } from "framer-motion";
import { alpha, useTheme } from "@mui/material/styles";

import HeroBar from "../components/calendarPro/HeroBar";
import MiniCalendar from "../components/calendarPro/MiniCalendar";
import AgendaList from "../components/calendarPro/AgendaList";
import EventDialog from "../components/calendarPro/EventDialog";
import FiltersBar from "../components/calendarPro/FiltersBar";

const mockEvents = [
  {
    id: "e1",
    title: "جلسه React",
    tag: "React",
    start: "2025-08-30T09:00",
    end: "2025-08-30T10:00",
    color: "primary",
  },
  {
    id: "e2",
    title: "تمرین TDD",
    tag: "Testing",
    start: "2025-08-30T13:00",
    end: "2025-08-30T14:30",
    color: "success",
  },
  {
    id: "e3",
    title: "TypeScript — Generics",
    tag: "TS",
    start: "2025-08-31T11:00",
    end: "2025-08-31T12:00",
    color: "warning",
  },
];

export default function CalendarPro() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({ tags: ["All"] });

  const filtered = mockEvents.filter((e) =>
    filters.tags.includes("All") ? true : filters.tags.includes(e.tag)
  );

  return (
    <DashboardLayout>
      <HeroBar onAdd={() => setOpen(true)} selectedDate={selectedDate} />
      <FiltersBar value={filters} onChange={setFilters} />

      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <MiniCalendar
            value={selectedDate}
            onChange={setSelectedDate}
            events={mockEvents}
          />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid",
              borderColor: (t) => alpha(t.palette.divider, 0.6),
              boxShadow: "0 10px 28px rgba(0,0,0,.06)",
              backdropFilter: "saturate(140%) blur(6px)",
            }}
          >
            <CardContent>
              <Typography sx={{ fontWeight: 900, mb: 1.5 }}>
                🗓 برنامه {selectedDate.toLocaleDateString("fa-IR")}
              </Typography>
              <AgendaList
                date={selectedDate}
                items={filtered.filter(
                  (e) =>
                    new Date(e.start).toDateString() ===
                    selectedDate.toDateString()
                )}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <EventDialog
        open={open}
        onClose={() => setOpen(false)}
        defaultDate={selectedDate}
        onCreate={(payload) => {
          // TODO: supabase insert
          console.log("create event", payload);
          setOpen(false);
        }}
      />
    </DashboardLayout>
  );
}
