import React, { useEffect } from "react";
import { HomePageContext } from "../../state/HomePageState";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Navbar from "../../components/navbar";
import TopSection from "./TopSection";
import Box from "@mui/material/Box";
import MainSection from "./MainSection";
import { GlobalContext } from "../../state/GlobalContext";

const CoursePage = () => {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = React.useState({});
    const { courses, getCourses } = useContext(HomePageContext);
    const { setOpenedItem } = useContext(GlobalContext);

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/");
    //     }
    // }, []);

    useEffect(() => {
        console.log("coursepage rendered");
    });

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
        setOpenedItem("courses");
    }, []);

    useEffect(() => {
        console.log("index", courseInfo);
    }, [courseInfo]);

    useEffect(() => {
        let element = document.querySelector(".coursepage-main");
        if (!element) return;
        const scrollEventListner = (document.querySelector(".coursepage-main").onscroll = (e) => {
            // console.log("scrolling", e.target.scrollTop);
            if (e.target.scrollTop > 200) {
                document.querySelector(".coursepage-sticky-top").style.position = "relative";
                document.querySelector(".coursepage-sticky-top").style.top = "-100px";
            } else {
                document.querySelector(".coursepage-sticky-top").style.position = "relative";
                document.querySelector(".coursepage-sticky-top").style.top = "0";
            }
        });
        return () => {
            let element = document.querySelector(".coursepage-main");
            if (element) element.removeEventListener("scroll", scrollEventListner);
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
                    scrollBehavior: "smooth",
                }}
            >
                <Box
                    className="coursepage-sticky-top"
                    sx={{
                        // transition: "all 0.5s ease",
                        transition: "all 0.5s ease",
                        zIndex: "100",
                        //border: "2px solid red"
                        margin: "0",
                    }}
                >
                    <Navbar />
                </Box>
                <Box
                // sx={{
                //     paddingTop: "5rem",
                // }}
                sx={{
                    //border: "4px solid green"
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
