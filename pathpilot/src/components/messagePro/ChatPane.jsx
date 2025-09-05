import { Box, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";

export default function ChatPane({ thread, items = [] }) {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography sx={{ fontWeight: 900 }}>
          {thread?.title || "گفتگو"}
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          p: 2,
          gap: 1.25,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {items.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            style={{
              display: "flex",
              justifyContent: m.me ? "flex-start" : "flex-end",
            }}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-3 py-2 shadow-sm ${
                m.me
                  ? "bg-violet-600 text-white rounded-bl-sm"
                  : "bg-white border border-slate-200 rounded-br-sm"
              }`}
              dir="auto"
            >
              <div className="text-sm font-medium">{m.text}</div>
              <div
                className={`text-[10px] mt-0.5 opacity-80 ${
                  m.me ? "text-violet-100" : "text-slate-500"
                }`}
              >
                {m.at}
              </div>
            </div>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
