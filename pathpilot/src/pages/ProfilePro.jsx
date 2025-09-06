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
  IconButton,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { glassCard, fadeUp } from "../components/dashboardPro/_shared";

import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

export default function ProfilePro() {
  const t = useTheme();
  const [name, setName] = useState("Path Pilot");
  const [bio, setBio] = useState("عاشق یادگیری و کدنویسی!");

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        {/* کارت پروفایل سمت چپ */}
        <Grid item xs={12} md={4}>
          <Card
            component={motion.div}
            {...fadeUp(0)}
            elevation={0}
            sx={glassCard(t)}
          >
            <CardHeader
              title={<Typography sx={{ fontWeight: 900 }}>پروفایل</Typography>}
            />
            <CardContent>
              <Stack alignItems="center" spacing={2}>
                <BoxWithAvatar name={name} />
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CameraAltRoundedIcon />}
                  sx={{ fontWeight: 800 }}
                >
                  تغییر عکس
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* کارت اطلاعات کاربری سمت راست */}
        <Grid item xs={12} md={8}>
          <Card
            component={motion.div}
            {...fadeUp(0.05)}
            elevation={0}
            sx={glassCard(t)}
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
                  fullWidth
                />
                <TextField
                  label="بیو"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
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

/* -------------------- Subcomponent -------------------- */
function BoxWithAvatar({ name }) {
  const t = useTheme();
  return (
    <Stack
      sx={{
        position: "relative",
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${alpha(
          t.palette.primary.main,
          0.9
        )}, ${alpha(t.palette.secondary.main, 0.9)})`,
        display: "grid",
        placeItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,.15)",
      }}
    >
      <Avatar
        sx={{
          width: 88,
          height: 88,
          fontWeight: 900,
          fontSize: 28,
          bgcolor: "white",
          color: t.palette.primary.main,
        }}
      >
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()}
      </Avatar>
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          bottom: 4,
          right: 4,
          bgcolor: "white",
          border: `1px solid ${alpha(t.palette.primary.main, 0.2)}`,
          boxShadow: "0 2px 6px rgba(0,0,0,.1)",
        }}
      >
        <CameraAltRoundedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
