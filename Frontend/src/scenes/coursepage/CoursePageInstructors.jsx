import React from "react";
import Box from "@mui/material/Box";
import InstructorProfile from "../../components/InstructorProfile";
import useMediaQuery from "@mui/material/useMediaQuery";

const CoursePageInstructors = ({ courseInfo }) => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: isMobileScreens ? "1fr" : "repeat(auto-fit, minmax(300px, 400px))",
                gap: "1rem",
                gridAutoRows: "1fr"
            }}
        >
            {courseInfo.courseInstructors?.map((instructor, index) => (
                <InstructorProfile key={index} instructorId={instructor._id} />
            ))}
        </Box>
    );
};

export default CoursePageInstructors;
