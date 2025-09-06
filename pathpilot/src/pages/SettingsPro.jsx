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
} from "@mui/material";
import { motion } from "framer-motion";
import { glassCard, fadeUp } from "../components/dashboardPro/_shared";

export default function SettingsPro() {
  const t = useTheme();
  const [tab, setTab] = useState(0);
  const [dark, setDark] = useState(false);
  const [push, setPush] = useState(true);

  return (
    <DashboardLayout>
      <Card
        component={motion.div}
        {...fadeUp(0)}
        elevation={0}
        sx={glassCard(t)}
      >
        <CardHeader
          title={<Typography sx={{ fontWeight: 900 }}>⚙️ تنظیمات</Typography>}
        />
        <CardContent>
          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              mb: 2,
              "& .MuiTab-root": { fontWeight: 800, minHeight: 48 },
            }}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="ظاهر" />
            <Tab label="اعلان‌ها" />
            <Tab label="اتصال‌ها" />
          </Tabs>

          {/* ظاهر */}
          {tab === 0 && (
            <Stack spacing={2} component={motion.div} {...fadeUp(0.05)}>
              <FormControlLabel
                control={
                  <Switch
                    checked={dark}
                    onChange={(e) => setDark(e.target.checked)}
                  />
                }
                label="فعال‌سازی تم تاریک"
              />
              <Button
                variant="contained"
                sx={{ alignSelf: "flex-start", fontWeight: 900 }}
              >
                اعمال تغییرات
              </Button>
            </Stack>
          )}

          {/* اعلان‌ها */}
          {tab === 1 && (
            <Stack spacing={2} component={motion.div} {...fadeUp(0.1)}>
              <FormControlLabel
                control={
                  <Switch
                    checked={push}
                    onChange={(e) => setPush(e.target.checked)}
                  />
                }
                label="دریافت اعلان‌های Push"
              />
              <TextField
                fullWidth
                label="ایمیل اعلان‌ها"
                placeholder="you@example.com"
              />
              <Button
                variant="contained"
                sx={{ alignSelf: "flex-start", fontWeight: 900 }}
              >
                ذخیره
              </Button>
            </Stack>
          )}

          {/* اتصال‌ها */}
          {tab === 2 && (
            <Stack spacing={3} component={motion.div} {...fadeUp(0.15)}>
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 800 }}>
                  اتصال به Google Calendar
                </Typography>
                <Button variant="outlined" sx={{ width: 220, fontWeight: 800 }}>
                  اتصال / قطع اتصال
                </Button>
              </Stack>

              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 800 }}>
                  اتصال به GitHub (Issueهای آموزشی)
                </Typography>
                <Button variant="outlined" sx={{ width: 220, fontWeight: 800 }}>
                  اتصال / قطع اتصال
                </Button>
              </Stack>
            </Stack>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
