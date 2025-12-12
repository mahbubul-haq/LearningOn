import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import StyledTextField1 from "../../components/StyledTextField1";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useState } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";

const BasicInfoBottom = ({
    courseState,
    setCourseState,
    addSkill,
    setAddSkill,
    setSkillName,
    skillName,
}) => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const {courseStateRef} = useContext(CreateCourseContext);
    const [studentRequirements, setStudentRequirements] = useState(courseState.studentRequirements);


    useState(() => {
        if (!studentRequirements) {
            setStudentRequirements(courseState.studentRequirements);
        }
    }, [courseState]);

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="student-requirements">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",
                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Student Requirements
                        </Typography>
                    </InputLabel>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <StyledTextField1
                        placeholder="Shortly describe what are the requirements for students to take this course, e.g. programming language, software, etc."
                        multiline
                        minRows={2}
                        maxRows={Infinity}
                        id="student-requirements"
                        inputProps={{
                            maxLength: 200,
                        }}
                        // change font size of input
                        onChange={(event) => {
                            setStudentRequirements(event.target.value);
                            courseStateRef.current.studentRequirements = event.target.value;
                        }}
                        value={studentRequirements}
                        onBlur={(event) => {
                            setCourseState({
                                ...courseStateRef.current
                            });
                        }}
                        sx={{
                            p: 0,
                            "& .MuiInputBase-input": {
                                fontSize: "0.9rem",
                                letterSpacing: "0.01rem",
                                lineHeight: "1.5rem",
                                fontWeight: "400",

                                color: (theme) => theme.palette.grey.grey600,
                            },
                            width: "100%",
                        }}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="skill-tags">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",
                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Skill Tags
                        </Typography>
                    </InputLabel>
                </Box>
                <Typography
                    variant="body2"
                    sx={{
                        color: (theme) => theme.palette.grey.grey400,
                        mt: "1rem",
                        mb: "0.2rem",
                        fontSize: "0.8rem",
                    }}
                >
                    Add the skills that students will learn from the course.
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        mt: "1rem",
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        gap: "1rem",
                    }}
                >
                    {courseState.skillTags?.map((skill, index) => (
                        <Chip
                            label={skill}
                            key={index}
                            deleteIcon={
                                <DeleteIcon
                                    sx={{
                                        color: "black",
                                    }}
                                />
                            }
                            onDelete={() => {
                                setCourseState({
                                    ...courseState,
                                    skillTags: courseState.skillTags.filter(
                                        (tag) => tag !== skill
                                    ),
                                });
                            }}
                            sx={{
                                borderRadius: "2rem",
                                fontSize: "1rem",
                                padding: "1.2rem 0.5rem",
                                backgroundColor: (theme) =>
                                    theme.palette.background.buttonBgPink,
                            }}
                        />
                    ))}

                    {!addSkill && (
                        <Fab
                            variant="extended"
                            size="medium"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.background.buttonBgPink,
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: (theme) =>
                                        theme.palette.background
                                            .buttonBgPinkDark,
                                },
                            }}
                            onClick={() => {
                                setAddSkill(true);
                                setSkillName("");
                            }}
                        >
                            <AddIcon sx={{ mr: "0.5rem" }} />
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                    textTransform: "capitalize",
                                }}
                            >
                                Add Skill
                            </Typography>
                        </Fab>
                    )}
                    {addSkill && (
                        <Box
                            sx={{
                                display: "inline-block",
                            }}
                        >
                            <Paper
                                component="form"
                                sx={{
                                    p: "0",
                                    m: "0",
                                    boxShadow: "none",

                                    border: "1px solid",
                                    borderColor: (theme) =>
                                        theme.palette.grey.grey200,
                                    display: "flex",
                                    alignItems: "center",
                                    maxWidth: "250px",
                                    borderRadius: "2rem",
                                }}
                            >
                                <InputBase
                                    sx={{ px: "1rem", flex: 1 }}
                                    placeholder="add skill name"
                                    inputProps={{
                                        "aria-label": "add skill",
                                    }}
                                    onChange={(event) => {
                                        setSkillName(event.target.value);
                                    }}
                                />
                                <Button
                                    sx={{
                                        p: "0.5rem 1rem",

                                        m: 0,
                                        color: (theme) =>
                                            theme.palette.text.primary,
                                        background: (theme) =>
                                            theme.palette.background
                                                .buttonBgPink,
                                        "&:hover": {
                                            background: (theme) =>
                                                theme.palette.background
                                                    .buttonBgPinkDark,
                                        },
                                        borderRadius: "0 2rem 2rem 0",
                                        fontWeight: "600",
                                    }}
                                    aria-label="directions"
                                    onClick={() => {
                                        if (skillName !== "") {
                                            setCourseState({
                                                ...courseState,
                                                skillTags: [
                                                    ...courseState.skillTags,
                                                    skillName,
                                                ],
                                            });
                                            setAddSkill(false);
                                            setSkillName("");
                                        }
                                    }}
                                >
                                    Add
                                </Button>
                            </Paper>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default BasicInfoBottom;
