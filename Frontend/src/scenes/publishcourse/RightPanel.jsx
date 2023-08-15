import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import BasicInfo from "./BasicInfo";
import { CreateCourseContext } from "../../state/CreateCourse";
import { GlobalContext } from "../../state/GlobalContext";
import { useContext } from "react";
import { Alert, Button, Divider, Snackbar, Typography } from "@mui/material";
import { StyledButton } from "../../components/StyledButton";
import CourseMedia from "./CourseMedia";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MoreInfo from "./MoreInfo";
import CourseContent from "./CourseContent";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const RightPanel = () => {
    const { inputSection, setInputSection, updateCourse } =
        useContext(CreateCourseContext);
    const { categories, listOfCategories } = useContext(GlobalContext);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    console.log(inputSection);
    useEffect(() => {
        console.log(inputSection);
    }, [inputSection]);

    const handleNext = () => {
        if (inputSection === "basic info") {
            setInputSection("course media");
        } else if (inputSection === "course media") {
            setInputSection("more info");
        } else if (inputSection === "more info") {
            setInputSection("course content");
        }
    };

    const handlePrev = () => {
        if (inputSection === "course content") {
            setInputSection("more info");
        } else if (inputSection === "more info") {
            setInputSection("course media");
        } else if (inputSection === "course media") {
            setInputSection("basic info");
        }
    };

    return (
        <Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    sx={{
                        width: "100%",

                        backgroundColor: (theme) => theme.palette.primary.light,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        Your course information is saved as draft.
                    </Typography>
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                {/* */}
            </Box>
            {inputSection === "basic info" && <BasicInfo />}
            {inputSection === "course media" && <CourseMedia />}
            {inputSection === "more info" && <MoreInfo />}
            {inputSection === "course content" && <CourseContent />}
            <Divider
                sx={{
                    my: "1rem",
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1.5rem",
                }}
            >
                {inputSection !== "basic info" ? (
                    <StyledButton
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "600",

                            cursor: "pointer",
                            "&&": {
                                padding: "0.4rem 0.8rem",
                                fontWeight: "600",
                                background: "transparent",
                                color: (theme) => theme.palette.primary.dark,
                                "&:hover": {
                                    color: (theme) =>
                                        theme.palette.primary.darker,
                                    background: (theme) =>
                                        theme.palette.background.alt,
                                },
                            },
                        }}
                        onClick={handlePrev}
                    >
                        <KeyboardDoubleArrowLeftIcon />
                        <Typography
                            sx={{
                                fontWeight: "600",
                                pl: "0.5rem",
                            }}
                        >
                            Prev
                        </Typography>
                    </StyledButton>
                ) : (
                    <Box></Box>
                )}
                <StyledButton
                    sx={{
                        textTransform: "capitalize",
                        fontWeight: "600",

                        cursor: "pointer",
                        "&&": {
                            padding: "0.4rem 0.8rem",
                            background: (theme) => theme.palette.grey.grey700,
                            color: "white",
                            "&:hover": {
                                background: (theme) =>
                                    theme.palette.grey.grey900,
                            },
                        },
                    }}
                    onClick={() => {
                        updateCourse("draft");
                        setOpenSnackbar(true);
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        Save Progress
                    </Typography>
                </StyledButton>
                {inputSection != "course content" ? (
                    <StyledButton
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "600",

                            cursor: "pointer",
                            "&&": {
                                padding: "0.4rem 0.8rem",
                                fontWeight: "600",

                                background: "transparent",
                                color: (theme) => theme.palette.primary.dark,
                                "&:hover": {
                                    color: (theme) =>
                                        theme.palette.primary.darker,
                                    background: (theme) =>
                                        theme.palette.background.alt,
                                },
                            },
                        }}
                        onClick={handleNext}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                pr: "0.5rem",
                            }}
                        >
                            Next
                        </Typography>
                        <KeyboardDoubleArrowRightIcon />
                    </StyledButton>
                ) : (<Box></Box>)}

            </Box>
        </Box>
    );
};

export default RightPanel;
