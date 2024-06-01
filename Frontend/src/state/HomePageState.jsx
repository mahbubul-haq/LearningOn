/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useSelector } from "react-redux";
import React from "react";

export const HomePageContext = createContext();

export const HomePageState = (props) => {
    const [courses, setCourses] = React.useState([]);
    const token = useSelector((state) => state.token);

    const getCourses = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/course/all`,
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
                setCourses(data.courseInfo);
            }
        } catch (err) {
            //console.log(err?.message);
        }
    };

    return (
        <HomePageContext.Provider value={{
            courses,
            getCourses,
            setCourses
        }}>
            {props.children}
        </HomePageContext.Provider>
    );
};
