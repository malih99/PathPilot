import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

export default function EventDialog({ open, onClose, onCreate, defaultDate }) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [start, setStart] = useState(
    new Date(defaultDate).toISOString().slice(0, 16)
  );
  const [end, setEnd] = useState(
    new Date(defaultDate.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16)
  );
  const [color, setColor] = useState("primary");

  const submit = async () => {
    if (!title.trim()) return;
    await onCreate?.({ title, tag, start, end, color });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 900 }}>رویداد جدید</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            label="عنوان"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <TextField
            label="برچسب"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="React / Testing / …"
          />
          <TextField
            label="شروع"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <TextField
            label="پایان"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <TextField
            select
            label="رنگ"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <MenuItem value="primary">Primary</MenuItem>
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="warning">Warning</MenuItem>
            <MenuItem value="error">Error</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>
        <Button onClick={submit} variant="contained" sx={{ fontWeight: 900 }}>
          ذخیره
        </Button>
      </DialogActions>
    </Dialog>
  );
}
