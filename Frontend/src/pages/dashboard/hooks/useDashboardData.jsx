import { useState, useMemo, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DashboardContext } from '../../../state/DashboardContext';
import { generateChartData, getStatusKey } from '../constants/dashboardConstants';

export default function useDashboardData() {
    const navigate = useNavigate();
    const { myCourses, getMyCourses, recentEnrollments, setRecentEnrollments } = useContext(DashboardContext);
    const user = useSelector((state) => state.auth.user);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [minYear, setMinYear] = useState(2023);
    const [maxYear, setMaxYear] = useState(2024);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [firstYear, setFirstYear] = useState(2023);
    const [lastYear, setLastYear] = useState(new Date().getFullYear());

    const chartData = useMemo(() => generateChartData(minYear, maxYear), [minYear, maxYear]);

    // Fetch courses on mount
    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        getMyCourses();
    }, []);

    // Calculate/Filter enrollments when selection changes or courses load
    useEffect(() => {
        let allEnrollments = [];
        console.log("selectedCourse", selectedCourse);
        console.log("myCourses", myCourses);
        if (selectedCourse) {
            // For a specific course
            if (selectedCourse.enrolledStudents) {
                // Ensure we clone and add course title if missing
                allEnrollments = selectedCourse.enrolledStudents.map(e => ({
                    ...e,
                    courseTitle: selectedCourse.courseTitle
                }));
            }
        } else if (myCourses && myCourses.length > 0) {
            // Aggregate from all courses
            myCourses.forEach(course => {
                if (course.enrolledStudents) {
                    course.enrolledStudents.forEach(student => {
                        allEnrollments.push({
                            ...student,
                            courseTitle: course.courseTitle // Attach title for display
                        });
                    });
                }
            });
        }

        // Sort by date descending (newest first)
        allEnrollments.sort((a, b) => new Date(b.enrolledOn) - new Date(a.enrolledOn));

        setRecentEnrollments(allEnrollments);
    }, [selectedCourse, myCourses]);

    // Calculate aggregated stats
    const totalRevenue = useMemo(() => {
        // Use the calculated recentEnrollments which is already filtered/aggregated
        return recentEnrollments.reduce((acc, curr) => acc + (curr.paymentId?.paidAmount || 0), 0);
    }, [recentEnrollments]);

    const totalStudents = useMemo(() => {
        return recentEnrollments.length;
    }, [recentEnrollments]);

    useEffect(() => {
        if (myCourses.length > 0) {
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

    return {
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
        user,
        firstYear,
        lastYear,
    };
}
