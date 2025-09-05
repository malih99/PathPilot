import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";

const items = [
  {
    id: "r1",
    title: "React Docs — Effects",
    tag: "React",
    read: "10m",
    url: "#",
  },
  {
    id: "r2",
    title: "TS Handbook — Generics",
    tag: "TS",
    read: "15m",
    url: "#",
  },
  {
    id: "r3",
    title: "Testing Library — Queries",
    tag: "Testing",
    read: "8m",
    url: "#",
  },
];

const glass = (t) => ({
  borderRadius: 16,
  border: "1px solid",
  borderColor: alpha(t.palette.divider, 0.55),
  background:
    t.palette.mode === "light"
      ? "linear-gradient(180deg,#fff,rgba(255,255,255,.92))"
      : alpha(t.palette.background.paper, 0.7),
  backdropFilter: "saturate(140%) blur(8px)",
  boxShadow: "0 10px 28px rgba(0,0,0,.08)",
});

const TAGS = ["All", "React", "TS", "Testing"];

export default function ResourcesPro() {
  const t = useTheme();
  const [tag, setTag] = useState("All");
  const filtered = tag === "All" ? items : items.filter((i) => i.tag === tag);

  return (
    <DashboardLayout>
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        elevation={0}
        sx={glass(t)}
      >
        <CardHeader
          title={
            <Typography sx={{ fontWeight: 900 }}>🔗 منابع منتخب</Typography>
          }
          action={
            <Stack direction="row" spacing={1}>
              {TAGS.map((tname) => (
                <Chip
                  key={tname}
                  size="small"
                  label={tname}
                  color={tag === tname ? "primary" : "default"}
                  onClick={() => setTag(tname)}
                  sx={{ fontWeight: 800 }}
                />
              ))}
            </Stack>
          }
        />
        <CardContent>
          <Grid container spacing={1.5}>
            {filtered.map((r, i) => (
              <Grid key={r.id} item xs={12} sm={6} md={4}>
                <Card
                  component={motion.div}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  elevation={0}
                  sx={glass(t)}
                >
                  <CardContent>
                    <Typography sx={{ fontWeight: 900, mb: 0.5 }}>
                      {r.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {r.tag} • زمان مطالعه: {r.read}
                    </Typography>
                    <div className="mt-2">
                      <Button
                        href={r.url}
                        target="_blank"
                        size="small"
                        sx={{ fontWeight: 900 }}
                      >
                        باز کن
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
