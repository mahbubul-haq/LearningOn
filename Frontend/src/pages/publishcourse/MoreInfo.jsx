import React, { useEffect } from "react";
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

    useEffect(() => {
        let element = document.querySelector(".right-panel-more-info");
        if (element) {
            element.style.opacity = 1;
            element.style.transform = "translateX(0) translateY(0)";
        }
    }, []);

    return (
        <Box className="right-panel-more-info"
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                mt: "0rem",
                mb: "1rem",
                opacity: 0,
                transform: "translateY(4rem)",
                transition: "opacity 0.5s, transform 0.5s",
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
