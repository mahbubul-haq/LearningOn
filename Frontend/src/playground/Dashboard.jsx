import React, { useState, useMemo } from 'react';
import {
    Box, Grid, Typography, Paper, List, ListItemButton,
    ListItemText, Chip, Divider, Avatar, Stack, MenuItem, Select, Button, IconButton
} from '@mui/material';
import {
    TrendingUp, People, AttachMoney, School, Circle, CalendarMonth, Edit, OpenInNew, MoreVert
} from '@mui/icons-material';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// --- VISUAL CONSTANTS ---
const GLASS_SX = {
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
    borderRadius: 4,
    overflow: 'hidden'
};

const STATUS_THEMES = {
    approved: { label: 'Approved', color: '#00C853', bg: 'rgba(0, 200, 83, 0.1)' },
    draft: { label: 'Draft', color: '#757575', bg: 'rgba(117, 117, 117, 0.1)' },
    waiting: { label: 'Waiting', color: '#FFAB00', bg: 'rgba(255, 171, 0, 0.1)' },
};

// --- MOCK DATA GENERATOR ---
const generateChartData = (minYear, maxYear) => {
    const data = [];
    const yearDiff = maxYear - minYear;
    const isMonthly = yearDiff <= 2;
    const points = isMonthly ? (yearDiff || 1) * 12 : yearDiff + 1;

    for (let i = 0; i <= points; i++) {
        const label = isMonthly ? `Month ${i + 1}` : `${minYear + i}`;
        data.push({
            name: label,
            revenue: Math.floor(Math.random() * 5000) + 1000,
            enrollments: Math.floor(Math.random() * 50) + 5,
        });
    }
    return data;
};

export default function ProfessionalDashboard() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [minYear, setMinYear] = useState(2023);
    const [maxYear, setMaxYear] = useState(2024);

    const chartData = useMemo(() => generateChartData(minYear, maxYear), [minYear, maxYear]);

    const courses = [
        { id: 1, title: 'AI Engineer Roadmap', role: 'Owner', status: 'approved' },
        { id: 2, title: 'Python Mastery', role: 'Instructor', status: 'draft' },
        { id: 3, title: 'Advanced React Patterns', role: 'Owner', status: 'waiting' },
    ];

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, minHeight: '100vh', background: 'transparent' }}>

            {/* HEADER SECTION */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
                spacing={2}
                sx={{ mb: 4 }}
            >
                <Box>
                    <Typography variant="h4" fontWeight="800" color="#1a1a1a">Dashboard</Typography>
                    <Typography variant="body2" color="text.secondary">Real-time performance metrics</Typography>
                </Box>

                <Paper sx={{ ...GLASS_SX, p: 1, px: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarMonth fontSize="small" sx={{ color: '#9178e6' }} />
                    <Select value={minYear} onChange={(e) => setMinYear(e.target.value)} variant="standard" disableUnderline sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                        {[2022, 2023, 2024].map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                    </Select>
                    <Typography color="text.secondary">to</Typography>
                    <Select value={maxYear} onChange={(e) => setMaxYear(e.target.value)} variant="standard" disableUnderline sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                        {[2024, 2025, 2026].map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                    </Select>
                </Paper>
            </Stack>

            <Grid container spacing={3}>

                {/* --- LEFT SIDE: COURSE LIST --- */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper sx={{ ...GLASS_SX, height: { md: 'calc(100vh - 180px)' }, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <Typography variant="h6" fontWeight="700">My Courses</Typography>
                        </Box>
                        <List sx={{ overflowY: 'auto', p: 2 }}>
                            <ListItemButton
                                selected={!selectedCourse}
                                onClick={() => setSelectedCourse(null)}
                                sx={{ borderRadius: 2, mb: 1, '&.Mui-selected': { bgcolor: 'rgba(145, 120, 230, 0.15)', borderLeft: '4px solid #9178e6' } }}
                            >
                                <ListItemText primary="Global Overview" primaryTypographyProps={{ fontWeight: 700 }} />
                            </ListItemButton>
                            <Divider sx={{ my: 1 }} />
                            {courses.map((course) => (
                                <ListItemButton
                                    key={course.id}
                                    selected={selectedCourse?.id === course.id}
                                    onClick={() => setSelectedCourse(course)}
                                    sx={{
                                        borderRadius: 2, mb: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                                        bgcolor: selectedCourse?.id === course.id ? 'white' : 'transparent',
                                        boxShadow: selectedCourse?.id === course.id ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                                        border: selectedCourse?.id === course.id ? '1px solid #9178e6' : '1px solid transparent'
                                    }}
                                >
                                    <Typography variant="body2" fontWeight="700" sx={{ mb: 1 }}>{course.title}</Typography>
                                    <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
                                        <Chip label={course.role} size="small" sx={{ height: 18, fontSize: '0.65rem' }} />
                                        <Box sx={{ px: 1, py: 0.3, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: STATUS_THEMES[course.status].bg }}>
                                            <Circle sx={{ fontSize: 6, color: STATUS_THEMES[course.status].color }} />
                                            <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: STATUS_THEMES[course.status].color }}>
                                                {STATUS_THEMES[course.status].label}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </ListItemButton>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* --- RIGHT SIDE: ANALYTICS & ACTIONS --- */}
                <Grid item xs={12} md={8} lg={9}>
                    <Stack spacing={3}>

                        {/* Contextual Header with Buttons */}
                        {selectedCourse && (
                            <Paper sx={{ ...GLASS_SX, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#9178e6' }}>{selectedCourse.title}</Typography>
                                <Stack direction="row" spacing={1}>
                                    <Button variant="outlined" startIcon={<Edit />} size="small" sx={{ textTransform: 'none', borderRadius: 2 }}>Edit</Button>
                                    <Button variant="contained" startIcon={<OpenInNew />} size="small" sx={{ textTransform: 'none', borderRadius: 2, bgcolor: '#9178e6' }}>Go to Course</Button>
                                </Stack>
                            </Paper>
                        )}

                        {/* Stat Cards Row */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}><StatCard title="Revenue" value="$12,190" color="#00C853" icon={<AttachMoney />} /></Grid>
                            <Grid item xs={12} sm={4}><StatCard title="Total Students" value="2,408" color="#9178e6" icon={<People />} /></Grid>
                            <Grid item xs={12} sm={4}><StatCard title="Rating" value="4.8" color="#FFAB00" icon={<TrendingUp />} /></Grid>
                        </Grid>

                        {/* Area Graphs (Curved Style) */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6}>
                                <Paper sx={{ ...GLASS_SX, p: 3, height: 350 }}>
                                    <Typography variant="h6" fontWeight="700" mb={2}>Revenue Trends</Typography>
                                    <ResponsiveContainer width="100%" height="90%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#00C853" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} minTickGap={30} />
                                            <YAxis hide />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Area type="monotone" dataKey="revenue" stroke="#00C853" strokeWidth={3} fill="url(#colorRev)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Paper sx={{ ...GLASS_SX, p: 3, height: 350 }}>
                                    <Typography variant="h6" fontWeight="700" mb={2}>Enrollment Trends</Typography>
                                    <ResponsiveContainer width="100%" height="90%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorEn" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#9178e6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#9178e6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} minTickGap={30} />
                                            <YAxis hide />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Area type="monotone" dataKey="enrollments" stroke="#9178e6" strokeWidth={3} fill="url(#colorEn)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Bottom Enrollment List */}
                        <Paper sx={{ ...GLASS_SX, p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight="700">Recent Enrollments</Typography>
                                <Button size="small" sx={{ textTransform: 'none', fontWeight: 700 }}>View All</Button>
                            </Box>
                            <Stack spacing={2}>
                                {[1, 2, 3].map((i) => (
                                    <Box key={i} sx={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.4)',
                                        transition: '0.2s', '&:hover': { bgcolor: 'white' }
                                    }}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar src={`https://i.pravatar.cc/150?u=${i}`} sx={{ border: '2px solid #9178e6' }} />
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight="800">Student Name {i}</Typography>
                                                <Typography variant="caption" color="text.secondary">Enrolled in: {selectedCourse ? selectedCourse.title : 'Global Course'}</Typography>
                                            </Box>
                                        </Stack>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="subtitle2" fontWeight="800">$595</Typography>
                                            <Typography variant="caption" color="text.secondary">11 mo ago</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>

                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}

function StatCard({ title, value, color, icon }) {
    return (
        <Paper sx={{ ...GLASS_SX, p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${color}15`, color: color }}>{icon}</Box>
            <Box>
                <Typography variant="caption" fontWeight="700" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>{title}</Typography>
                <Typography variant="h5" fontWeight="900">{value}</Typography>
            </Box>
        </Paper>
    );
}