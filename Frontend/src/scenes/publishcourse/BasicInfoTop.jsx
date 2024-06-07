import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import StyledTextField1 from "../../components/StyledTextField1";
import useMediaQuery from "@mui/material/useMediaQuery";

const BasicInfoTop = ({ categoriesWithLabel, courseState, setCourseState }) => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
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
                            maxWidth: "100%",
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
                        maxRows={isMobileScreens ? 4 : 2}
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
                                fontSize: isMobileScreens ? "1rem" : "1.6rem",
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
                            marginLeft: isMobileScreens ? "0rem" : "2rem",
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
        </>
    );
};

export default BasicInfoTop;
