/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const HomePageContext = createContext();

export const HomePageState = (props) => {
    const [courses, setCourses] = React.useState([]);
    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = React.useState(true);
    const [filteredCourses, setFilteredCourses] = React.useState([]);
    const [selectedCourses, setSelectedCourses] = React.useState([]);
    const [courseFetchError, setCourseFetchError] = React.useState(false);
    const getCoursesAttempt = useRef(0);
    const [initialRender, setInitialRender] = React.useState(true);
    const waitingForSelectedCoursesRef = useRef(false);
    const [waitingForSelectedCourses, setWaitingForSelectedCourses] = React.useState(false);
    const [loadingTracker, setLoadingTracker] = React.useState({
        myCoursesLoading: false,
        learningCoursesLoading: false,
        popularCoursesLoading: false,
        myCourses: [],
        learningCourses: [],
        popularCourses: [],
    });

    

    useEffect(() => {
        waitingForSelectedCoursesRef.current = waitingForSelectedCourses;
    }, [waitingForSelectedCourses]);

    useEffect(() => {
        console.log("HomePageState courses:", courses);
        if (courses.length > 0) {
            setLoading(false);
        }
    }, [courses]);

    const getCourses = async (category="all") => {

        getCoursesAttempt.current += 1;
        console.log("getCourses attempt:", getCoursesAttempt.current, "category:", category);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/course/getpopular?category=${encodeURIComponent(category)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    signal: controller.signal,
                }
            );

            clearTimeout(timeoutId);

            const data = await response.json();
           // console.log("courses, ", data);
           

            if (data.success) {
                //console.log("courses", data.courses);
                setCourses(data.courses);
                if (initialRender) setTimeout(() => setInitialRender(false), 2000);
                getCoursesAttempt.current = 0;
                waitingForSelectedCoursesRef.current = true;
                setWaitingForSelectedCourses(true);
                setLoading(false);
            }
            else {
                if (getCoursesAttempt.current < 3) {
                    getCourses(category);
                }else {
                    setLoading(false);
                    setCourseFetchError(true);
                }
            }
        } catch (err) {
            //console.log(err?.message);
            if (getCoursesAttempt.current < 3) {
                getCourses(category);
            }
            else {
                setLoading(false);
                setCourseFetchError(true);
            }
        }
    };

    return (
        <HomePageContext.Provider value={{
            courses,
            getCourses,
            setCourses,
            loading,
            setLoading,
            filteredCourses,
            setFilteredCourses,
            selectedCourses,
            setSelectedCourses,
            courseFetchError,
            setCourseFetchError,
            initialRender,
            setInitialRender,
            waitingForSelectedCoursesRef,
            waitingForSelectedCourses,
            setWaitingForSelectedCourses,
        }}>
            {props.children}
        </HomePageContext.Provider>
    );
};
