import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useState, useEffect } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";

const BasicInfoTop = ({ categoriesWithLabel, courseState, setCourseState }) => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const [courseTitle, setCourseTitle] = useState(courseState.courseTitle);
    const [courseDescription, setCourseDescription] = useState(courseState.courseDescription);
    const { courseStateRef } = useContext(CreateCourseContext);


    useEffect(() => {

        setCourseTitle(courseState.courseTitle);
        setCourseDescription(courseState.courseDescription);
    }, [courseState]);
    return (
        <>
            <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="category">
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
                            width: "100%",
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Choose a category"
                                size="small"
                                fullWidth
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        minHeight: "3rem",
                                    }
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
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 1,
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
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
                    <TextField
                        placeholder="Give a nice title for your course"
                        multiline
                        minRows={1}
                        maxRows={Infinity}
                        id="title"
                        inputProps={{
                            maxLength: 100,
                        }}
                        onChange={(event) => {
                            setCourseTitle(event.target.value);
                            courseStateRef.current.courseTitle = event.target.value;
                        }}
                        value={courseTitle}
                        onBlur={(event) => {
                            setCourseState({
                                ...courseStateRef.current
                            });
                        }}
                        fullWidth
                        variant="outlined"
                        sx={{
                            "& .MuiInputBase-input": {
                                fontSize: isMobileScreens ? "1rem" : "1.2rem",
                                fontWeight: "600",
                            },
                            "& .MuiOutlinedInput-root": {
                                minHeight: "3rem",
                            }
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
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 1,
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
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
                        variant="caption"
                        display="block"
                        sx={{
                            color: "text.secondary",
                            mb: "1rem",
                        }}
                    >
                        Write a short description about your course. You may
                        include:
                    </Typography>
                    <Box
                        sx={{
                            marginLeft: isMobileScreens ? "0rem" : "2rem",
                            mb: "1rem",
                            color: "text.secondary",
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
                    <TextField
                        placeholder="Write description here..."
                        multiline
                        minRows={6}
                        maxRows={Infinity}
                        id="description"
                        inputProps={{
                            maxLength: 2500,
                        }}
                        onChange={(event) => {
                            setCourseDescription(event.target.value);
                            courseStateRef.current.courseDescription = event.target.value;
                        }}
                        value={courseDescription}
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
        </>
    );
};

export default BasicInfoTop;
