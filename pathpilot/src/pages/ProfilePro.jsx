import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Avatar,
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

export default function ProfilePro() {
  const t = useTheme();
  const [name, setName] = useState("Path Pilot");
  const [bio, setBio] = useState("عاشق یادگیری و کدنویسی!");
  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            elevation={0}
            sx={glass(t)}
          >
            <CardHeader
              title={<Typography sx={{ fontWeight: 900 }}>پروفایل</Typography>}
            />
            <CardContent>
              <Stack alignItems="center" spacing={2}>
                <Avatar sx={{ width: 88, height: 88, fontWeight: 900 }}>
                  PP
                </Avatar>
                <Button variant="outlined" size="small">
                  تغییر عکس
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            elevation={0}
            sx={glass(t)}
          >
            <CardHeader
              title={
                <Typography sx={{ fontWeight: 900 }}>اطلاعات کاربری</Typography>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="نام"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="بیو"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  multiline
                  rows={3}
                />
                <Stack direction="row" gap={1} justifyContent="flex-end">
                  <Button variant="outlined">انصراف</Button>
                  <Button variant="contained" sx={{ fontWeight: 900 }}>
                    ذخیره
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
