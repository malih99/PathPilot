import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./services/supabase";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SessionContextProvider>
  </React.StrictMode>
);
