import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Card,
  CardHeader,
  CardContent,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  Stack,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";

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

export default function SettingsPro() {
  const t = useTheme();
  const [tab, setTab] = useState(0);
  const [dark, setDark] = useState(false);
  const [push, setPush] = useState(true);

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
          title={<Typography sx={{ fontWeight: 900 }}>تنظیمات</Typography>}
        />
        <CardContent>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="ظاهر" />
            <Tab label="اعلان‌ها" />
            <Tab label="اتصال‌ها" />
          </Tabs>

          {tab === 0 && (
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={dark}
                    onChange={(e) => setDark(e.target.checked)}
                  />
                }
                label="تم تاریک"
              />
              <Button variant="contained" sx={{ width: 160, fontWeight: 900 }}>
                اعمال تغییرات
              </Button>
            </Stack>
          )}

          {tab === 1 && (
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={push}
                    onChange={(e) => setPush(e.target.checked)}
                  />
                }
                label="اعلان‌های Push"
              />
              <TextField label="ایمیل اعلان‌ها" placeholder="you@example.com" />
              <Button variant="contained" sx={{ width: 160, fontWeight: 900 }}>
                ذخیره
              </Button>
            </Stack>
          )}

          {tab === 2 && (
            <Stack spacing={2}>
              <Typography>اتصال به Google Calendar</Typography>
              <Button variant="outlined" sx={{ width: 220 }}>
                اتصال / قطع اتصال
              </Button>
              <Typography>اتصال به GitHub (برای Issueهای آموزشی)</Typography>
              <Button variant="outlined" sx={{ width: 220 }}>
                اتصال / قطع اتصال
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
