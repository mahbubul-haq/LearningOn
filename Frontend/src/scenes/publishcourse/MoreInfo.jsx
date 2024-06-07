import React from "react";
import Box from "@mui/material/Box";
import { GlobalContext } from "../../state/GlobalContext";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import { languages } from "../../data";
import MoreInfoTop from "./MoreInfoTop";
import MoreInfoBottom from "./MoreInfoBottom";

const MoreInfo = () => {
    const { users } = useContext(GlobalContext);
    const { courseState, setCourseState, errors, setErrors } =
        useContext(CreateCourseContext);
    const [instructor, setInstructor] = React.useState(null);

    const addInstructor = () => {
        if (instructor) {
            if (courseState.courseInstructors.includes(instructor.value)) {
                return;
            }

            setCourseState({
                ...courseState,
                courseInstructors: [
                    ...courseState.courseInstructors,
                    instructor.value,
                ],
            });

            setInstructor(null);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                mt: "0rem",
                mb: "1rem",
            }}
        >
            <MoreInfoTop
                courseState={courseState}
                setCourseState={setCourseState}
                languages={languages}
                errors={errors}
                setErrors={setErrors}
            />

            <MoreInfoBottom
                courseState={courseState}
                setCourseState={setCourseState}
                users={users}
                instructor={instructor}
                setInstructor={setInstructor}
                addInstructor={addInstructor}
            />
        </Box>
    );
};

export default MoreInfo;
