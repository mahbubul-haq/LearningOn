/* eslint-disable react/prop-types */
import React, { createContext } from "react";
import { useSelector } from "react-redux";

export const HomePageContext = createContext();

export const HomePageState = (props) => {
    const [courses, setCourses] = React.useState([]);
    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = React.useState(false);
    const [filteredCourses, setFilteredCourses] = React.useState([]);
    const [selectedCourses, setSelectedCourses] = React.useState([]);

    const getCourses = async (category="all") => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/course/getpopular?category=${encodeURIComponent(category)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );

            const data = await response.json();
           // console.log("courses, ", data);
           

            if (data.success) {
                //console.log("courses", data.courses);
                setCourses(data.courses);
                
            }
            setLoading(false);
        } catch (err) {
            //console.log(err?.message);
            setLoading(false);
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
            setSelectedCourses
        }}>
            {props.children}
        </HomePageContext.Provider>
    );
};
