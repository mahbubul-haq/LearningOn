import React from "react";
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
