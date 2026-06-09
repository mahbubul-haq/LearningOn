import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useMemo, useEffect } from "react";
import RootRoutes from "./routes/RootRoutes";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import "./App.css"
import { AppProvider } from "./state/AppContext";
import AppInitializer from "./AppInitializer";

const queryClient = new QueryClient();

function App() {

  const { mode } = useSelector((state) => state.auth);
  const theme = useMemo(() => createTheme(themeSettings({ mode })), [mode])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>

        <BrowserRouter>
          <AppProvider>
            <CssBaseline />
            <AppInitializer />
            
            <RootRoutes />
          </AppProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;