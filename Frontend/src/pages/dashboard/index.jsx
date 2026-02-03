import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import CourseSelector from './components/CourseSelector';
import AnalyticsSection from './components/AnalyticsSection';
import useDashboardData from './hooks/useDashboardData';
import { useSelector } from 'react-redux';
export default function Dashboard() {
    const navigate = useNavigate();
    const theme = useTheme();
    const user = useSelector((state) => state.auth.user);

    // Custom hook handles all data logic
    const {
        myCourses,
        selectedCourse,
        setSelectedCourse,
        recentEnrollments,
        minYear,
        maxYear,
        setMinYear,
        setMaxYear,
        drawerOpen,
        setDrawerOpen,
        totalRevenue,
        totalStudents,
        chartData,
        getStatusKey,
        firstYear,
        lastYear,
    } = useDashboardData();

    const glassSx = {
        ...theme.palette.glassCard,
        overflow: 'hidden'
    };

    return (
        <Box sx={{ p: { xs: "1rem", md: "2rem" }, height: '100vh', background: 'transparent', overflow: 'auto' }}>
            <DashboardHeader
                minYear={minYear}
                maxYear={maxYear}
                setMinYear={setMinYear}
                setMaxYear={setMaxYear}
                onBack={() => navigate("/")}
                glassSx={glassSx}
                theme={theme}
                firstYear={firstYear}
                lastYear={lastYear}
            />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                    <CourseSelector
                        myCourses={myCourses}
                        selectedCourse={selectedCourse}
                        onSelect={setSelectedCourse}
                        drawerOpen={drawerOpen}
                        setDrawerOpen={setDrawerOpen}
                        getStatusKey={getStatusKey}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                    <AnalyticsSection
                        selectedCourse={selectedCourse}
                        totalRevenue={totalRevenue}
                        totalStudents={totalStudents}
                        chartData={chartData}
                        recentEnrollments={recentEnrollments}
                        glassSx={glassSx}
                        theme={theme}
                        user={user}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
