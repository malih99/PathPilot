import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

export default function QuickAddDialog({ open, onClose, onCreatePath }) {
  const [tab, setTab] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const submitPath = async () => {
    if (!title.trim()) return;
    await onCreatePath?.({ title: title.trim(), description: desc });
    setTitle("");
    setDesc("");
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 900 }}>افزودن سریع</DialogTitle>
      <DialogContent dividers>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="مسیر جدید" />
          <Tab label="یادداشت/تسک" />
        </Tabs>

        {tab === 0 && (
          <Stack spacing={2}>
            <TextField
              label="عنوان مسیر"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <TextField
              label="توضیحات"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              multiline
              rows={3}
            />
          </Stack>
        )}

        {tab === 1 && (
          <Stack spacing={2}>
            <TextField
              label="عنوان یادداشت/تسک"
              placeholder="امروز چه کاری انجام می‌دی؟"
            />
            <TextField label="توضیحات" multiline rows={3} />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>
        <Button
          variant="contained"
          startIcon={<SaveRoundedIcon />}
          onClick={tab === 0 ? submitPath : onClose}
          sx={{ fontWeight: 900 }}
        >
          ذخیره
        </Button>
      </DialogActions>
    </Dialog>
  );
}
