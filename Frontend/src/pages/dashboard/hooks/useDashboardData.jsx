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
    const [minYear, setMinYear] = useState(2023);
    const [maxYear, setMaxYear] = useState(2024);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [firstYear, setFirstYear] = useState(2023);
    const [lastYear, setLastYear] = useState(new Date().getFullYear());

    const chartData = useMemo(() => generateChartData(minYear, maxYear), [minYear, maxYear]);



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
        minYear,
        maxYear,
        setMinYear,
        setMaxYear,
        drawerOpen,
        setDrawerOpen,
        chartData,
        getStatusKey,
        user,
        firstYear,
        lastYear,
        setFirstYear,
        setLastYear,
    };
}
