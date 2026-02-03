import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function StatCard({ title, value, color, icon, glassSx }) {
    return (
        <Paper sx={{ ...glassSx, p: 2.5, display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
            <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${color}15`, color: color }}>{icon}</Box>
            <Box>
                <Typography variant="caption" fontWeight="700" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>{title}</Typography>
                <Typography variant="h5" fontWeight="900" color="text.primary">{value}</Typography>
            </Box>
        </Paper>
    );
}
