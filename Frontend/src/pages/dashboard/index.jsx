import React from 'react';
import { Box, Grid, useTheme, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import DashboardHeader from './components/DashboardHeader';
import CourseSelector from './components/CourseSelector';
import AnalyticsSection from './components/AnalyticsSection';
import useDashboardData from './hooks/useDashboardData';
import { useSelector } from 'react-redux';
import { useRecentEnrollments, useMyCourses, useEnrollmentAnalytics } from './hooks/DashboardHooks';
import { useMemo, useEffect } from 'react';


export default function Dashboard() {
    const navigate = useNavigate();
    const theme = useTheme();
    const { token, user } = useSelector((state) => state.auth);

    // Custom hook handles all data logic
    const {
        selectedCourse,
        setSelectedCourse,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        drawerOpen,
        setDrawerOpen,
        showCumulativeEnrollments,
        setShowCumulativeEnrollments,
        showCumulativeRevenue,
        setShowCumulativeRevenue,
        getStatusKey,
    } = useDashboardData();

    const { data: myCourses, isLoading: isLoadingMyCourses, isError: isErrorMyCourses } = useMyCourses(user);

    const {
        data: enrollmentsData,
        fetchNextPage: fetchNextEnrollmentsPage,
        hasNextPage: hasNextEnrollmentsPage,
        isLoading: isLoadingEnrollments,
        isFetching: isFetchingEnrollments,
        isError: isErrorEnrollments,
        error: enrollmentsError,
    } = useRecentEnrollments(selectedCourse?._id, user);

    useEffect(() => {
        console.log("recentEnrollments", enrollmentsData);
    }, [enrollmentsData]);

    const recentEnrollments = useMemo(() => {
        if (!enrollmentsData) return [];
        return enrollmentsData.pages.flatMap((page) => page.enrollments);
    }, [enrollmentsData]);

    const { data: analyticsData, isLoading: isLoadingAnalytics, isError: isErrorAnalytics } = useEnrollmentAnalytics(
        selectedCourse?._id,
        user,
        startDate ? new Date(startDate).toISOString() : null,
        endDate ? new Date(endDate).toISOString() : null,
        startDate && endDate && myCourses?.length
    );


    useEffect(() => {
        if (myCourses?.length > 0) {
            let firstDate = new Date(myCourses[0].createdAt || 8640000000000000);

            myCourses.forEach(course => {
                const cDate = new Date(course.createdAt);
                if (firstDate.getTime() > cDate.getTime()) {
                    firstDate = cDate;
                }

            });

            setStartDate(firstDate);
            setEndDate(new Date().toISOString());
        }

    }, [myCourses]);

    const glassSx = {
        ...theme.palette.glassCard,
        overflow: 'hidden'
    };

    useEffect(() => {
        if (analyticsData) {
            console.log("analyticsData", analyticsData);
        }
    }, [analyticsData]);

    return (
        <Box sx={{ p: { xs: "1rem", md: "2rem" }, height: '100vh', background: 'transparent', overflow: 'auto' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3} sx={{
                    height: {
                        xs: 'fit-content',
                        md: `calc(100vh - 4rem)`,
                    },
                    position: { xs: "relative", md: "sticky" },
                    top: { md: "0rem" },
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Stack spacing={2} sx={{ mb: 0, height: { sm: 'fit-content', md: '6rem' }, display: 'flex', justifyContent: 'center' }}>
                        <Box>
                            <Button
                                startIcon={<ArrowBack />}
                                onClick={() => navigate("/")}
                                sx={{
                                    color: theme.palette.text.primary,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    mb: 1
                                }}
                            >
                                Back
                            </Button>
                        </Box>
                        <Box sx={{ pb: { xs: 4, md: 8 } }}>
                            <Typography variant="h4" fontWeight="800" color="text.primary">Dashboard</Typography>
                            <Typography variant="body2" color="text.secondary">Real-time performance metrics</Typography>
                        </Box>
                    </Stack>

                    <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                        <CourseSelector
                            myCourses={myCourses}
                            selectedCourse={selectedCourse}
                            onSelect={setSelectedCourse}
                            drawerOpen={drawerOpen}
                            setDrawerOpen={setDrawerOpen}
                            getStatusKey={getStatusKey}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                    <Stack spacing={3}>
                        <Box sx={{ height: { sm: 'fit-content', md: '6rem' }, display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                            <DashboardHeader
                                startDate={startDate}
                                endDate={endDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                                onBack={() => navigate("/")}
                                glassSx={glassSx}
                                theme={theme}
                            />
                        </Box>
                        <AnalyticsSection
                            selectedCourse={selectedCourse}
                            totalRevenue={analyticsData?.totalRevenue || 0}
                            totalStudents={analyticsData?.totalEnrollments || 0}
                            chartData={analyticsData?.chartData || []}
                            recentEnrollments={recentEnrollments}
                            hasNextEnrollmentsPage={hasNextEnrollmentsPage}
                            fetchNextEnrollmentsPage={fetchNextEnrollmentsPage}
                            isFetchingEnrollments={isFetchingEnrollments}
                            glassSx={glassSx}
                            theme={theme}
                            user={user}
                            courseRatings={analyticsData?.courseRatings || {
                                totalRating: 0,
                                numberOfRatings: 0,
                                avgRating: 0
                            }}
                            showCumulativeEnrollments={showCumulativeEnrollments}
                            setShowCumulativeEnrollments={setShowCumulativeEnrollments}
                            showCumulativeRevenue={showCumulativeRevenue}
                            setShowCumulativeRevenue={setShowCumulativeRevenue}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
