import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useMemo } from "react";
import RootRoutes from "./routes/RootRoutes";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { themeSettings } from "./theme";
import "./App.css"
const queryClient = new QueryClient();
function App() {

  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings({ mode })), [mode])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>

        <BrowserRouter>
          <CssBaseline />
          <RootRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;