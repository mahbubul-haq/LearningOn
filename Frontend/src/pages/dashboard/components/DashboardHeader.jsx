import React from 'react';
import { Box, Button, Stack, Typography, Paper, Select, MenuItem } from '@mui/material';
import { ArrowBack, CalendarMonth } from '@mui/icons-material';

export default function DashboardHeader({ minYear, maxYear, setMinYear, setMaxYear, onBack, glassSx, theme, firstYear, lastYear }) {
    const years = new Array(lastYear - firstYear + 1).fill(0).map((_, i) => firstYear + i);
    return (
        <>
            {/* BACK BUTTON */}
            <Box sx={{ mb: 2 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={onBack}
                    sx={{
                        color: theme.palette.text.primary,
                        textTransform: 'none',
                        fontWeight: 600
                    }}
                >
                    Back
                </Button>
            </Box>

            {/* HEADER SECTION */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
                sx={{ mb: 4 }}
            >
                <Box>
                    <Typography variant="h4" fontWeight="800" color="text.primary">Dashboard</Typography>
                    <Typography variant="body2" color="text.secondary">Real-time performance metrics</Typography>
                </Box>

                <Paper sx={{ ...glassSx, p: 1, px: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarMonth fontSize="small" sx={{ color: theme.palette.primary.lighter }} />
                    <Select value={minYear} onChange={(e) => setMinYear(e.target.value)} variant="standard" disableUnderline sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'text.primary' }}>
                        {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                    </Select>
                    <Typography color="text.secondary">to</Typography>
                    <Select value={maxYear} onChange={(e) => setMaxYear(e.target.value)} variant="standard" disableUnderline sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'text.primary' }}>
                        {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                    </Select>
                </Paper>
            </Stack>
        </>
    );
}
