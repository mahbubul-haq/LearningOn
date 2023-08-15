import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { GlobalContext } from "../../state/GlobalContext";
import { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import StyledTextField from "../../components/StyledInputField";
import StyledTextField1 from "../../components/StyledInputField1";
import { CreateCourseContext } from "../../state/CreateCourse";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

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
            {/* <Box sx={{
                mb: "1rem",
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "600",
                        m: 0,
                        p: 0,
                        mb: "0.5rem",
                        color: (theme) => theme.palette.grey.grey600,
                        textAlign: "center",
                    }}
                >
                    Basic Information
                </Typography>
                <Divider
                    sx={{
                        m: 0,
                        p: 0,
                    }}
                />
            </Box> */}
            <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="category">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",

                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Category of the Course
                        </Typography>
                    </InputLabel>
                </Box>
                <Box>
                    <Autocomplete
                        disablePortal
                        onChange={(event, value) => {
                            setCourseState({
                                ...courseState,
                                category: value ? value.label : "",
                            });
                        }}
                        value={
                            courseState.category
                                ? {
                                      label: courseState.category,
                                      value: courseState.category,
                                  }
                                : null
                        }
                        id="category"
                        options={
                            categoriesWithLabel.length > 0
                                ? categoriesWithLabel
                                : []
                        }
                        sx={{
                            width: "350px",
                        }}
                        renderInput={(params) => (
                            <StyledTextField1
                                placeholder="Choose a category"
                                {...params}
                                size="small"
                                // change font size of input
                                sx={{
                                    p: 0,
                                    "& .MuiInputBase-input": {
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                    },

                                    "&&": {
                                        "& .MuiInputBase-root": {
                                            color: (theme) =>
                                                theme.palette.grey.grey600,
                                        },
                                    },
                                    //enforce color of input
                                }}
                            />
                        )}
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
                    <InputLabel htmlFor="title">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",
                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Course Title
                        </Typography>
                    </InputLabel>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <StyledTextField1
                        placeholder="Give a nice title for your course"
                        multiline
                        maxRows={2}
                        id="title"
                        inputProps={{
                            maxLength: 100,
                        }}
                        // change font size of input
                        onChange={(event) => {
                            setCourseState({
                                ...courseState,
                                courseTitle: event.target.value,
                            });
                        }}
                        value={courseState.courseTitle}

                        sx={{
                            p: 0,
                            "& .MuiInputBase-input": {
                                fontSize: "1.6rem",
                                fontWeight: "600",
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
                    <InputLabel htmlFor="description">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",
                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Course Description
                        </Typography>
                    </InputLabel>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: (theme) => theme.palette.grey.grey400,
                            mt: "1rem",
                            mb: "0.2rem",
                            fontSize: "0.8rem",
                        }}
                    >
                        Write a short description about your course. You may
                        include:
                    </Typography>
                    {/* make a bulleted list */}
                    <Box
                        sx={{
                            marginLeft: "2rem",
                            mb: "1rem",

                            color: (theme) => theme.palette.grey.grey400,
                        }}
                    >
                        <ul
                            style={{
                                color: "inherit",
                            }}
                        >
                            <li>What will students learn from your course?</li>
                            <li>What are the requirements for your course?</li>
                            <li>What is the course content?</li>
                            <li>How students will benefit from it?</li>
                        </ul>
                    </Box>
                    <StyledTextField1
                        placeholder="Write description here..."
                        multiline
                        rows={20}
                        id="description"
                        inputProps={{
                            maxLength: 2500,
                        }}
                        // change font size of input
                        onChange={(event) => {
                            setCourseState({
                                ...courseState,
                                courseDescription: event.target.value,
                            });
                        }}
                        value={courseState.courseDescription}
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
                        rows={2}
                        id="student-requirements"
                        inputProps={{
                            maxLength: 200,
                        }}
                        // change font size of input
                        onChange={(event) => {
                            setCourseState({
                                ...courseState,
                                studentRequirements: event.target.value,
                            });
                        }}
                        value={courseState.studentRequirements}
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
                                mr: "1rem",
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

                                {/* <Divider
                                sx={{ height: 28, m: 0.5 }}
                                orientation="vertical"
                            /> */}
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
        </Box>
    );
};

export default BasicInfo;
