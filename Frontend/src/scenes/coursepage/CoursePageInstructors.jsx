import React from "react";
import Box from "@mui/material/Box";
import InstructorProfile from "../../components/InstructorProfile";

const CoursePageInstructors = ({ courseInfo }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
            }}
        >
            {courseInfo.courseInstructors?.map((instructor, index) => (
                <InstructorProfile key={index} instructorId={instructor._id} />
            ))}
        </Box>
    );
};

export default CoursePageInstructors;
