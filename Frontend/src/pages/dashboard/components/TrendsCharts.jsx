import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrendsCharts({ chartData, glassSx, theme }) {
    return (
        <Box sx={{ overflow: "hidden" }}>
            <Grid container spacing={3} >
                <Grid item xs={12} lg={6}>
                    <Paper sx={{ ...glassSx, p: 3, height: 350 }}>
                        <Typography variant="h6" fontWeight="700" mb={2} color="text.primary">Revenue Trends</Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00C853" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} minTickGap={30} stroke={theme.palette.text.secondary} />
                                <YAxis
                                    fontSize={10}
                                    axisLine={false}
                                    tickLine={false}
                                    stroke={theme.palette.text.secondary}
                                    tickFormatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(value)}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        backgroundColor: theme.palette.background.paper
                                    }}
                                    itemStyle={{ color: theme.palette.text.primary }}
                                    formatter={(value) => [new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value), 'Revenue']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#00C853" strokeWidth={3} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Paper sx={{ ...glassSx, p: 3, height: 350 }}>
                        <Typography variant="h6" fontWeight="700" mb={2} color="text.primary">Enrollment Trends</Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorEn" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={theme.palette.primary.lighter} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={theme.palette.primary.lighter} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} minTickGap={30} stroke={theme.palette.text.secondary} />
                                <YAxis
                                    fontSize={10}
                                    axisLine={false}
                                    tickLine={false}
                                    stroke={theme.palette.text.secondary}
                                    tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        backgroundColor: theme.palette.background.paper
                                    }}
                                    itemStyle={{ color: theme.palette.text.primary }}
                                />
                                <Area type="monotone" dataKey="enrollments" stroke={theme.palette.primary.lighter} strokeWidth={3} fill="url(#colorEn)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
