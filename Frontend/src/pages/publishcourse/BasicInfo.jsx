import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { GlobalContext } from "../../state/GlobalContext";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import BasicInfoBottom from "./BasicInfoBottom";
import BasicInfoTop from "./BasicInfoTop";

const BasicInfo = () => {
    const { categoriesWithLabel } = useContext(GlobalContext);
    const { courseState, setCourseState } = useContext(CreateCourseContext);
    const [addSkill, setAddSkill] = React.useState(false);
    const [skillName, setSkillName] = React.useState("");

    useEffect(() => {
        let element = document.querySelector(".right-panel-basic-info");
        if (element) {
            element.style.opacity = 1;
            element.style.transform = "translateX(0) translateY(0)";
        }
    }
        , []);

    return (
        <Box className="right-panel-basic-info"
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
            <BasicInfoTop
                categoriesWithLabel={categoriesWithLabel}
                courseState={courseState}
                setCourseState={setCourseState}
            />

            <BasicInfoBottom
                courseState={courseState}
                setCourseState={setCourseState}
                addSkill={addSkill}
                setAddSkill={setAddSkill}
                setSkillName={setSkillName}
                skillName={skillName}
            />
        </Box>
    );
};

export default BasicInfo;
