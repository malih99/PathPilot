import { TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      fullWidth
      placeholder="جستجوی گفتگو…"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
}
