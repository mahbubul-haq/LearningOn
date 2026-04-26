import React from 'react'
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Box, CircularProgress, Typography } from '@mui/material';


const VerifyCertificate = lazy(() => import("../pages/verifycertificate"));

const UtilityRoutesFallback = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9fafb'
      }}
    >
      <CircularProgress size={40} thickness={4} sx={{ color: '#10b981', mb: 2 }} />
      <Typography sx={{ color: '#6b7280', fontSize: '14px', fontWeight: 500, letterSpacing: '0.5px' }}>
        Just loading...
      </Typography>
    </Box>
  );
};


const UtilityRoutes = () => {
  return (
    <Routes>
      <Route
        path="/verify-certificate/:certificateId"
        element={
          <Suspense fallback={<UtilityRoutesFallback />}>
            <VerifyCertificate />
          </Suspense>
        }
      />

    </Routes>
  )
}

export default UtilityRoutes