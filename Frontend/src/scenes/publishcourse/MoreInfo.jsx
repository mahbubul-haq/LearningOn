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
import { languages } from "../../data";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InstructorProfile from "../../components/InstructorProfile";
import { StyledButton } from "../../Components/StyledButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const MoreInfo = () => {
    const { categoriesWithLabel, users } = useContext(GlobalContext);
    const { courseState, setCourseState, errors, setErrors } = useContext(CreateCourseContext);
    const [instructor, setInstructor] = React.useState(null);
    const isMobileScreens = useMediaQuery("(max-width: 600px)");

    const addInstructor = () => {
        if (instructor) {
            if (courseState.courseInstructors.includes(instructor.value)) {
                return;
            }

            setCourseState({
                ...courseState,
                courseInstructors: [...courseState.courseInstructors, instructor.value],
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
            <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="course-language">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",

                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Course Language
                        </Typography>
                    </InputLabel>
                </Box>
                <Box>
                    <Autocomplete
                        disablePortal
                        onChange={(event, value) => {
                            setCourseState({
                                ...courseState,
                                courseLanguage: value ? value.value : "",
                            });
                        }}
                        value={
                            courseState.courseLanguage === ""
                                ? null
                                : {
                                      label: courseState.courseLanguage,
                                      value: courseState.courseLanguage,
                                  }
                        }
                        id="course-language"
                        options={languages ? languages : [{ label: "No data" }]}
                        sx={{
                            width: isMobileScreens ? "100%" : "250px",
                            maxWidth: "100%",
                        }}
                        renderInput={(params) => (
                            <StyledTextField1
                                placeholder="Select language"
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
                                            color: (theme) => theme.palette.grey.grey600,
                                        },
                                    },
                                    //enforce color of input
                                }}
                            />
                        )}
                    />
                </Box>
            </Box>

            <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="course-price">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",

                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Course Price in USD
                        </Typography>
                    </InputLabel>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <StyledTextField1
                        placeholder="$50"
                        multiline
                        maxRows={3}
                        id="course-price"
                        inputProps={{
                            maxLength: 6,
                        }}
                        InputProps={{
                            endAdornment: (
                                <AttachMoneyIcon
                                    sx={{
                                        color: (theme) => theme.palette.grey.grey600,
                                        fontSize: "2rem",
                                    }}
                                    position="end"
                                />
                            ),
                        }}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        //   }}
                        // change font size of input
                        onChange={(event) => {
                            setCourseState({
                                ...courseState,
                                coursePrice:
                                    event.target.value && event.target.value > 0 && !(event.target.value == "0") ? event.target.value.toString() : "",
                            });

                            if (event.target.value && event.target.value > 0) {
                                setErrors({
                                    ...errors,
                                    coursePrice: "",
                                });
                            }
                        }}
                        value={courseState.coursePrice ? courseState.coursePrice.toString() : ""}
                        sx={{
                            p: 0,
                            "& .MuiInputBase-input": {
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: (theme) => theme.palette.grey.grey600,
                            },
                            width: isMobileScreens ? "100%" : "300px",
                            maxWidth: "100%",
                            "&&": {
                                p: 0,
                            },
                        }}
                    />

                    {errors.coursePrice && (
                        <Typography
                            sx={{
                                color: (theme) => theme.palette.error.main,
                            }}
                        >
                            {errors.coursePrice}
                        </Typography>
                    )}
                </Box>
            </Box>

            <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="completion-time">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",

                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Approx Time to Complete the Course
                        </Typography>
                    </InputLabel>
                </Box>
                <Box>
                    <Autocomplete
                        disablePortal
                        onChange={(event, value) => {
                            setCourseState({
                                ...courseState,
                                approxTimeToComplete: value ? value.value.toString() : "",
                            });
                        }}
                        value={
                            courseState.approxTimeToComplete
                                ? {
                                      label: `${courseState.approxTimeToComplete} weeks`,
                                      value: `${courseState.approxTimeToComplete} weeks`,
                                  }
                                : null
                        }
                        id="completion-time"
                        options={
                            new Array(50).fill(0).map((_, index) => ({
                                label: `${index + 1} weeks`,
                                value: index + 1,
                            })) || [{ label: "No data" }]
                        }
                        sx={{
                            width: isMobileScreens ? "100%" : "250px",
                            maxWidth: "100%",
                        }}
                        renderInput={(params) => (
                            <StyledTextField1
                                placeholder="number of weeks"
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
                                            color: (theme) => theme.palette.grey.grey600,
                                        },
                                    },
                                    //enforce color of input
                                }}
                            />
                        )}
                    />
                </Box>
            </Box>

            <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="course-instructors">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",

                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Course Instructors
                        </Typography>
                    </InputLabel>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "1rem",
                        flexWrap: "wrap",
                    }}
                >
                    {courseState.courseInstructors.map((id, index) => (
                        <Box
                            key={id}
                            sx={{
                                position: "relative",
                                // mb: "1rem",
                            }}
                        >
                            <IconButton
                                onClick={() => {
                                    setCourseState({
                                        ...courseState,
                                        courseInstructors: courseState.courseInstructors.filter((insId) => insId != id),
                                    });
                                }}
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    fontSize: "1rem",
                                    color: (theme) => theme.palette.grey.grey1000,
                                }}
                            >
                                {/* <PersonRemoveIcon /> */}
                                <CloseIcon />
                            </IconButton>
                            <InstructorProfile instructorId={id} />
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "1rem",
                        flexWrap: "wrap",
                        mt: courseState?.courseInstructors?.length > 0 ? "1rem" : "0rem",
                    }}
                >
                    <Autocomplete
                        disablePortal
                        onChange={(event, value) => {
                            setInstructor(value);
                        }}
                        value={{
                            label: instructor ? instructor.label : "",
                            value: instructor ? instructor.value : "",
                        }}
                        id="course-instructors"
                        options={
                            users
                                ? users.map((user) => ({
                                      label: user.name,
                                      value: user._id,
                                  }))
                                : [{ label: "No data" }]
                        }
                        sx={{
                            width: isMobileScreens ? "100%" : "350px",
                            maxWidth: "100%",
                            p: 0,
                            m: 0,
                            // border: "1px solid black",
                        }}
                        renderInput={(params) => (
                            <StyledTextField1
                                placeholder="Add Instructor"
                                {...params}
                                size="small"
                                // change font size of input

                                InputProps={{
                                    ...params.InputProps,

                                    startAdornment: (
                                        <StyledButton
                                            position="start"
                                            onClick={addInstructor}
                                            sx={{
                                                textTransform: "capitalize",
                                                fontWeight: "600",

                                                cursor: "pointer",
                                                "&&": {
                                                    borderRadius: "0.25",
                                                    padding: "0.4rem 0.8rem",
                                                    fontWeight: "600",
                                                    height: "100%",
                                                    background: (theme) => theme.palette.primary.light2,
                                                    color: (theme) => theme.palette.text.primary,
                                                    "&:hover": {
                                                        background: (theme) => theme.palette.primary.dark,
                                                    },
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                Add
                                            </Typography>
                                        </StyledButton>
                                    ),
                                }}
                                sx={{
                                    p: 0,
                                    m: 0,

                                    "& .MuiInputBase-input": {
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                    },

                                    "&&": {
                                        "& .MuiInputBase-root": {
                                            color: (theme) => theme.palette.grey.grey600,
                                        },
                                    },
                                    //enforce color of input
                                }}
                            />
                        )}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default MoreInfo;
