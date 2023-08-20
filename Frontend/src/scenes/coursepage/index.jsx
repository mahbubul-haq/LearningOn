import React, { useEffect, useState } from "react";
import { HomePageContext } from "../../state/HomePageState";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { useMediaQuery } from "@mui/material";
import TopSection from "./TopSection";
import Box from "@mui/material/Box";
import MainSection from "./MainSection";

const CoursePage = () => {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = React.useState({});
    const { courses, getCourses } = useContext(HomePageContext);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    useEffect(() => {
        //console.log(courseId, courses);
        if (courseId && courses && courses.length > 0) {
            const course = courses.find((c) => c._id == courseId);
            setCourseInfo(course);
        }
    }, [courseId, courses]);

    useEffect(() => {
        if (!courses || courses.length == 0) {
            getCourses();
        }
    }, []);

    // useEffect(() => {
    //     console.log("index", courseInfo);
    // }, [courseInfo]);

    useEffect(() => {
        let element = document.querySelector(".coursepage-main");
        if (!element) return;
        const scrollEventListner = (document.querySelector(
            ".coursepage-main"
        ).onscroll = (e) => {
            if (e.target.scrollTop > 100) {
                document.querySelector(".sticky-top").style.opacity = "0";
                document.querySelector(".sticky-top").style.zIndex = "-1";
            } else {
                document.querySelector(".sticky-top").style.opacity = "1";
                document.querySelector(".sticky-top").style.zIndex = "1000";
            }
        });
        return () => {
            let element = document.querySelector(".coursepage-main");
            if (element) element.onscroll = null;
        };
    }, []);

    return (
        <>
            <Box
                className="coursepage-main"
                sx={{
                    marginTop: "0",
                    width: "100%",
                    overflowX: "auto",
                    height: "100%",
                    paddingBottom: "4rem",
                }}
            >
                <Box
                    className="sticky-top"
                    sx={{
                        // transition: "all 0.5s ease",
                        position: "sticky",
                        top: "0",
                    }}
                >
                    <Navbar />
                </Box>
                <Box
                    sx={{
                        paddingTop: "5rem",
                    }}
                >
                    <TopSection courseInfo={courseInfo} />
                </Box>

                <MainSection courseInfo={courseInfo} />
            </Box>
        </>
    );
};

export default CoursePage;
