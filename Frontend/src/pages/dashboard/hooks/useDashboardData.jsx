import { useState, useMemo, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DashboardContext } from '../../../state/DashboardContext';
import { generateChartData, getStatusKey } from '../constants/dashboardConstants';

export default function useDashboardData() {
    const navigate = useNavigate();
    const { getMyCourses, recentEnrollments, setRecentEnrollments, getRecentEnrollments } = useContext(DashboardContext);
    const { user, token } = useSelector((state) => state.auth);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showCumulativeEnrollments, setShowCumulativeEnrollments] = useState(false);
    const [showCumulativeRevenue, setShowCumulativeRevenue] = useState(false);

    // const chartData = useMemo(() => generateChartData(minYear, maxYear), [minYear, maxYear]);



    // Calculate aggregated stats
    // const totalRevenue = useMemo(() => {
    //     // Use the calculated recentEnrollments which is already filtered/aggregated
    //     return recentEnrollments.reduce((acc, curr) => acc + (curr.paymentId?.paidAmount || 0), 0);
    // }, [recentEnrollments]);

    // const totalStudents = useMemo(() => {
    //     return recentEnrollments.length;
    // }, [recentEnrollments]);



    return {
        selectedCourse,
        setSelectedCourse,
        recentEnrollments,
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
        user,
    };
}
