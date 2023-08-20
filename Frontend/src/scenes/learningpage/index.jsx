import React, {useEffect}from "react";
import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { HomePageContext } from "../../state/HomePageState";
import Box from "@mui/material/Box";
import LearningPageTop from "./LearningPageTop";



const LearningPage = () => {
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
    return (
        <>
            <Navbar />
            <Box sx={{
                marginTop: isNonMobileScreens ? "5rem" : "4rem",
                height: "calc(100% - 5rem)",
                overflowY: "auto",
            }}>
                <LearningPageTop courseInfo={courseInfo} />

            </Box>
        </>
    );
};

export default LearningPage;
