import React from 'react';
import { Stack, Grid, Box } from '@mui/material';
import { TrendingUp, People, AttachMoney } from '@mui/icons-material';
import CourseActionBar from './CourseActionBar';
import StatCard from './StatCard';
import TrendsCharts from './TrendsCharts';
import RecentEnrollments from './RecentEnrollments';

export default function AnalyticsSection({ 
    selectedCourse, totalRevenue, totalStudents, chartData, recentEnrollments, 
    hasNextEnrollmentsPage, fetchNextEnrollmentsPage, isFetchingEnrollments,
    glassSx, theme, user, courseRatings,
    showCumulativeEnrollments, setShowCumulativeEnrollments, showCumulativeRevenue, setShowCumulativeRevenue 
}) {
    return (
        <Stack spacing={3}>
            {/* Contextual Header with Buttons */}
            <CourseActionBar selectedCourse={selectedCourse} glassSx={glassSx} theme={theme} user={user} />

            {/* Stat Cards Row */}
            <Box sx={{ overflow: "hidden" }}>
                <Grid container spacing={2} alignItems="stretch" >
                    <Grid item xs={12} sm={4} >
                        <StatCard
                            title="Revenue"
                            value={`$${totalRevenue.toLocaleString()}`}
                            color="#00C853"
                            icon={<AttachMoney />}
                            glassSx={glassSx}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard
                            title="Total Students"
                            value={totalStudents.toLocaleString()}
                            color={theme.palette.primary.lighter}
                            icon={<People />}
                            glassSx={glassSx}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard
                            title="Rating"
                            value={`${courseRatings?.avgRating.toFixed(1)}`}
                            color="#FFAB00"
                            icon={<TrendingUp />}
                            glassSx={glassSx}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Area Graphs (Curved Style) */}
            <TrendsCharts 
                chartData={chartData} 
                glassSx={glassSx} 
                theme={theme} 
                showCumulativeEnrollments={showCumulativeEnrollments}
                setShowCumulativeEnrollments={setShowCumulativeEnrollments}
                showCumulativeRevenue={showCumulativeRevenue}
                setShowCumulativeRevenue={setShowCumulativeRevenue}
            />

            {/* Bottom Enrollment List */}
            <RecentEnrollments 
                recentEnrollments={recentEnrollments} 
                hasNextEnrollmentsPage={hasNextEnrollmentsPage}
                fetchNextEnrollmentsPage={fetchNextEnrollmentsPage}
                isFetchingEnrollments={isFetchingEnrollments}
                glassSx={glassSx} 
                theme={theme} 
            />
        </Stack>
    );
}
