import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useState, useEffect } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import { alpha } from "@mui/material/styles";
import { X } from 'lucide-react'; // Using Lucide X icon like in Playground

const BasicInfoBottom = ({
    courseState,
    setCourseState,
    addSkill,
    setAddSkill,
    setSkillName,
    skillName,
}) => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const { courseStateRef } = useContext(CreateCourseContext);
    const [studentRequirements, setStudentRequirements] = useState(courseState.studentRequirements);


    useEffect(() => {
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
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 1,
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
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
                    <TextField
                        placeholder="Shortly describe what are the requirements for students to take this course..."
                        multiline
                        minRows={2}
                        maxRows={Infinity}
                        id="student-requirements"
                        inputProps={{
                            maxLength: 200,
                        }}
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
                        fullWidth
                        variant="outlined"
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
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 1,
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
                            }}
                        >
                            Skill Tags
                        </Typography>
                    </InputLabel>
                </Box>
                <Typography
                    variant="caption"
                    display="block"
                    sx={{
                        color: "text.secondary",
                        mb: "1rem",
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
                        gap: "0.5rem",
                    }}
                >
                    {courseState.skillTags?.map((skill, index) => (
                        <Chip
                            label={skill}
                            key={index}
                            deleteIcon={<X size={14} />}
                            onDelete={() => {
                                setCourseState({
                                    ...courseState,
                                    skillTags: courseState.skillTags.filter(
                                        (tag) => tag !== skill
                                    ),
                                });
                            }}
                            sx={{
                                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                color: (theme) => theme.palette.primary.main,
                                fontWeight: 600,
                                border: "1px solid",
                                borderColor: (theme) => alpha(theme.palette.primary.main, 0.2)
                            }}
                        />
                    ))}

                    {!addSkill && (
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                setAddSkill(true);
                                setSkillName("");
                            }}
                            sx={{
                                borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                                color: 'text.primary',
                                borderRadius: "50px", // Match typical rounded button style or keep standard
                                textTransform: "none",
                                '&:hover': {
                                    borderColor: (theme) => theme.palette.primary.main,
                                    color: (theme) => theme.palette.primary.main
                                }
                            }}
                        >
                            Add Skill
                        </Button>
                    )}
                    {addSkill && (
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexGrow: 1, maxWidth: "300px" }}>
                            <TextField
                                size="small"
                                placeholder="Add skill name"
                                value={skillName}
                                onChange={(event) => setSkillName(event.target.value)}
                                autoFocus
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (skillName !== "") {
                                            setCourseState({
                                                ...courseState,
                                                skillTags: [...courseState.skillTags, skillName],
                                            });
                                            setAddSkill(false);
                                            setSkillName("");
                                        }
                                    }
                                }}
                                sx={{ flexGrow: 1 }}
                            />
                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (skillName !== "") {
                                        setCourseState({
                                            ...courseState,
                                            skillTags: [...courseState.skillTags, skillName],
                                        });
                                        setAddSkill(false);
                                        setSkillName("");
                                    }
                                }}
                                sx={{ minWidth: "auto", px: 2 }}
                            >
                                Add
                            </Button>
                            <Button
                                variant="text"
                                color="inherit"
                                onClick={() => setAddSkill(false)}
                                sx={{ minWidth: "auto" }}
                            >
                                <X size={18} />
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default BasicInfoBottom;
