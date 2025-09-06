// src/pages/MessagesPro.jsx
import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  glassCard,
  fadeUp,
  slideLeft,
} from "../components/dashboardPro/_shared";

import ThreadsPane from "../components/messagePro/ThreadsPane";
import ChatPane from "../components/messagePro/ChatPane";
import Composer from "../components/messagePro/Composer";
import SearchBar from "../components/messagePro/SearchBar";

const mockThreads = [
  { id: "t1", title: "Path: React", last: "ممنون! انجام شد.", unread: 2 },
  { id: "t2", title: "Mentor — سارا", last: "تمرین رو دیدم 👌", unread: 0 },
  { id: "t3", title: "TS Group", last: "فردا جلسه داریم.", unread: 1 },
];

const mockMessages = {
  t1: [
    { id: 1, me: false, text: "سلام! وضعیت پروژه؟", at: "09:01" },
    { id: 2, me: true, text: "سلام، الان روی فرم‌ها هستم.", at: "09:03" },
    { id: 3, me: false, text: "عالی. اسکرین بفرست.", at: "09:04" },
  ],
  t2: [{ id: 1, me: false, text: "تمرین رو دیدم 👌", at: "08:10" }],
  t3: [{ id: 1, me: false, text: "فردا جلسه داریم.", at: "12:30" }],
};

export default function MessagesPro() {
  const t = useTheme();
  const [q, setQ] = useState("");
  const [active, setActive] = useState("t1");
  const [items, setItems] = useState(mockMessages[active]);

  const onSelect = (id) => {
    setActive(id);
    setItems(mockMessages[id] || []);
  };

  const onSend = (text) => {
    const msg = {
      id: Date.now(),
      me: true,
      text,
      at: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setItems((prev) => [...prev, msg]);
  };

  const filteredThreads = mockThreads.filter((t) =>
    t.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        {/* لیست گفتگوها */}
        <Grid item xs={12} md={4} lg={3}>
          <Card
            component={motion.div}
            {...slideLeft(0.02)}
            elevation={0}
            sx={{
              ...glassCard(t),
              display: "flex",
              flexDirection: "column",
              height: "calc(100dvh - 160px)",
            }}
          >
            <CardContent sx={{ p: 1.5 }}>
              <SearchBar value={q} onChange={setQ} />
            </CardContent>
            <ThreadsPane
              items={filteredThreads}
              active={active}
              onSelect={onSelect}
            />
          </Card>
        </Grid>

        {/* پنل گفتگو */}
        <Grid item xs={12} md={8} lg={9}>
          <Card
            component={motion.div}
            {...fadeUp(0.04)}
            elevation={0}
            sx={{
              ...glassCard(t),
              display: "flex",
              flexDirection: "column",
              height: "calc(100dvh - 160px)",
            }}
          >
            <ChatPane
              thread={mockThreads.find((t) => t.id === active)}
              items={items}
            />
            <Composer onSend={onSend} />
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
