import React from 'react';
import { Box, Button, Stack, Typography, Paper, TextField } from '@mui/material';
import { ArrowBack, CalendarMonth } from '@mui/icons-material';

export default function DashboardHeader({ startDate, endDate, setStartDate, setEndDate, onBack, glassSx, theme }) {

    const formatDateForInput = (dateObj) => {
        if (!dateObj) return '';
        try {
            const d = new Date(dateObj);
            if (isNaN(d.getTime())) return '';
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        } catch (e) {
            return '';
        }
    };

    const handleDateChange = (dateStr, isEnd) => {
        if (!dateStr) return null;
        try {
            const [year, month, day] = dateStr.split('-');
            const newDate = new Date(year, month - 1, day);
            if (isEnd) {
                newDate.setHours(23, 59, 59, 999);
            } else {
                newDate.setHours(0, 0, 0, 0);
            }
            return newDate;
        } catch (e) {
            return null;
        }
    };

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

                <Paper sx={{ ...glassSx, p: 1.5, px: { xs: 2, sm: 3 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: { xs: 1, sm: 3 }, width: { xs: '100%', sm: 'auto' } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' }, width: { xs: '100%', sm: 'auto' } }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Pick Start Date
                        </Typography>
                        <TextField
                            type="date"
                            value={formatDateForInput(startDate)}
                            onChange={(e) => setStartDate(handleDateChange(e.target.value, false))}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            onKeyDown={(e) => e.preventDefault()}
                            onMouseEnter={(e) => { try { e.target.showPicker && e.target.showPicker() } catch (err) { } }}
                            onClick={(e) => { try { e.target.showPicker && e.target.showPicker() } catch (err) { } }}
                            sx={{
                                mt: 0.5,
                                input: {
                                    textAlign: { xs: 'center', sm: 'left' },
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color: 'text.primary',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    zIndex: 1,
                                    '&::-webkit-calendar-picker-indicator': {
                                        opacity: 0,
                                        width: '100%',
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        height: '100%',
                                        cursor: 'pointer',
                                        zIndex: 2
                                    }
                                },
                                position: 'relative'
                            }}
                        />
                    </Box>

                    <Typography color="text.secondary" sx={{ mt: { xs: 0, sm: 2 }, fontWeight: 'bold' }}>to</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' }, width: { xs: '100%', sm: 'auto' } }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Pick End Date
                        </Typography>
                        <TextField
                            type="date"
                            value={formatDateForInput(endDate)}
                            onChange={(e) => setEndDate(handleDateChange(e.target.value, true))}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            onKeyDown={(e) => e.preventDefault()}
                            onMouseEnter={(e) => { try { e.target.showPicker && e.target.showPicker() } catch (err) { } }}
                            onClick={(e) => { try { e.target.showPicker && e.target.showPicker() } catch (err) { } }}
                            sx={{
                                mt: 0.5,
                                input: {
                                    textAlign: { xs: 'center', sm: 'left' },
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color: 'text.primary',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    zIndex: 1,
                                    '&::-webkit-calendar-picker-indicator': {
                                        opacity: 0,
                                        width: '100%',
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        height: '100%',
                                        cursor: 'pointer',
                                        zIndex: 2
                                    }
                                },
                                position: 'relative'
                            }}
                        />
                    </Box>
                </Paper>
            </Stack>
        </>
    );
}
