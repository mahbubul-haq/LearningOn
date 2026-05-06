import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
        getStatusKey,
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

    const { data: analyticsData, isLoading: isLoadingAnalytics, isError: isErrorAnalytics } = useEnrollmentAnalytics(
        selectedCourse?._id,
        token,
        startDate ? new Date(startDate).toISOString() : null,
        endDate ? new Date(endDate).toISOString() : null,
        startDate && endDate && myCourses?.length
    );


    useEffect(() => {
        if (myCourses?.length > 0) {
            let firstYearVal = 4000, lastYearVal = 0;
            let firstDate = new Date(8640000000000000); // Max Date
            let lastDate = new Date(-8640000000000000); // Min Date

            myCourses.forEach(course => {
                const cDate = new Date(course.createdAt);
                const year = cDate.getFullYear();

                if (year < firstYearVal) {
                    firstYearVal = year;
                }
                if (year > lastYearVal) {
                    lastYearVal = year;
                }

                if (cDate < firstDate) {
                    firstDate = cDate;
                }
                if (cDate > lastDate) {
                    lastDate = cDate;
                }
            });

            // Set start of day for lowest date
            const startOfDay = new Date(firstDate);
            startOfDay.setHours(0, 0, 0, 0);

            // Set end of day for highest date
            const endOfDay = new Date(lastDate);
            endOfDay.setHours(23, 59, 59, 999);

            // Using Swedish locale (sv-SE) gives YYYY-MM-DD which is standard for date inputs
            const formatForInput = (d) => {
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');
                return `${yyyy}-${mm}-${dd}`;
            };

            setStartDate(startOfDay)
            setEndDate(endOfDay);
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
            <DashboardHeader
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                onBack={() => navigate("/")}
                glassSx={glassSx}
                theme={theme}
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
                        totalRevenue={analyticsData?.totalRevenue || 0}
                        totalStudents={analyticsData?.totalEnrollments || 0}
                        chartData={analyticsData?.chartData || []}
                        recentEnrollments={recentEnrollments}
                        glassSx={glassSx}
                        theme={theme}
                        user={user}
                        courseRatings={analyticsData?.courseRatings || {
                            totalRating: 0,
                            numberOfRatings: 0,
                            avgRating: 0
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
