import { useState } from "react";
import { Box, TextField, IconButton, Stack } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";

export default function Composer({ onSend }) {
  const [text, setText] = useState("");
  const send = () => {
    if (!text.trim()) return;
    onSend?.(text.trim());
    setText("");
  };
  return (
    <Box sx={{ p: 1.5, borderTop: "1px solid", borderColor: "divider" }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton>
          <AttachFileRoundedIcon />
        </IconButton>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          size="small"
          placeholder="پیام خود را بنویسید…"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <IconButton color="primary" onClick={send}>
          <SendRoundedIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
