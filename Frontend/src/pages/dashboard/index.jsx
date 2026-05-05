import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import CourseSelector from './components/CourseSelector';
import AnalyticsSection from './components/AnalyticsSection';
import useDashboardData from './hooks/useDashboardData';
import { useSelector } from 'react-redux';
import { useRecentEnrollments, useMyCourses } from './hooks/DashboardHooks';
import { useMemo, useEffect } from 'react';


export default function Dashboard() {
    const navigate = useNavigate();
    const theme = useTheme();
    const { token, user } = useSelector((state) => state.auth);

    // Custom hook handles all data logic
    const {
        selectedCourse,
        setSelectedCourse,
        minYear,
        maxYear,
        setMinYear,
        setMaxYear,
        drawerOpen,
        setDrawerOpen,

        chartData,
        getStatusKey,
        firstYear,
        lastYear,
        setFirstYear,
        setLastYear,
    } = useDashboardData();

    const { data: myCourses, isLoading: isLoadingMyCourses, isError: isErrorMyCourses } = useMyCourses(token);

    const {
        data: enrollmentsData,
        fetchNextPage: fetchNextEnrollmentsPage,
        hasNextPage: hasNextEnrollmentsPage,
        isLoading: isLoadingEnrollments,
        isFetching: isFetchingEnrollments,
        isError: isErrorEnrollments,
        error: enrollmentsError,
    } = useRecentEnrollments(selectedCourse?._id, token);

    const recentEnrollments = useMemo(() => {
        if (!enrollmentsData) return [];
        return enrollmentsData.pages.flatMap((page) => page.enrollments);
    }, [enrollmentsData]);


    useEffect(() => {
        if (myCourses?.length > 0) {
            let first = 4000, last = 0;
            myCourses.forEach(course => {
                const year = new Date(course.createdAt).getFullYear();

                if (year < first) {
                    first = year;
                }
                if (year > last) {
                    last = year;
                }
            });
            setFirstYear(first);
            setLastYear(last);
            setMinYear(first);
            setMaxYear(last);
        }

    }, [myCourses]);

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
                firstYear={firstYear || 2023}
                lastYear={lastYear || new Date().getFullYear()}
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
                        totalRevenue={0}
                        totalStudents={0}
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
