import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useMemo, useEffect } from "react";
import RootRoutes from "./routes/RootRoutes";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { refreshAccessToken } from "./api/refreshAccessToken";
import "./App.css"
const queryClient = new QueryClient();
import { initAuthChannel } from "./api/authChannel";
import { applyRemoteAccessToken, applyRemoteAccessTokenTime } from "./api/authStore";

function App() {

  const { mode, token, lastAccessTokenTime } = useSelector((state) => state.auth);
  const theme = useMemo(() => createTheme(themeSettings({ mode })), [mode])

  useEffect(() => {
    console.log("Last access token time changed", lastAccessTokenTime);
  }, [lastAccessTokenTime]);

  useEffect(() => {


    const initializeAuth = async () => {
      try {
        await refreshAccessToken(true);
      } catch (err) {
      }
    };

    initializeAuth();

    const cleanup = initAuthChannel((data) => {
      if (data.type === "ACCESS_TOKEN_UPDATED") {
        applyRemoteAccessToken(data.token, data.timestamp);
      }
      else if (data.type === "LAST_ACCESS_TOKEN_TIME_UPDATED") {
        applyRemoteAccessTokenTime(data.timestamp);
      }
      else if (data.type === "LOGOUT") {
        applyRemoteAccessToken(null, 0);
        window.location.href = "/login";
      }
    });

    return () => {
      cleanup?.();
    }
  }, []);

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