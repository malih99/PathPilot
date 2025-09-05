import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./services/supabase";

import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import ThemeModeProvider, {
  useThemeMode,
} from "./theme/mode/ThemeModeProvider.jsx";
import createMuiTheme from "./theme/muiTheme.js";

const queryClient = new QueryClient();
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

document.documentElement.setAttribute("dir", "rtl");
document.documentElement.setAttribute("lang", "fa");

function ThemedApp() {
  const { mode } = useThemeMode();
  const muiTheme = React.useMemo(() => createMuiTheme(mode), [mode]);
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={muiTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <ThemeModeProvider>
          <ThemedApp />
        </ThemeModeProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  </React.StrictMode>
);
