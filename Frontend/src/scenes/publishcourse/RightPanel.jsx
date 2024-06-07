import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import BasicInfo from "./BasicInfo";
import { CreateCourseContext } from "../../state/CreateCourse";
import { useContext } from "react";
import { Alert, Divider, Snackbar, Typography } from "@mui/material";
import { StyledButton } from "../../components/StyledButton";
import CourseMedia from "./CourseMedia";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MoreInfo from "./MoreInfo";
import CourseContent from "./CourseContent";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import useMediaQuery from "@mui/material/useMediaQuery";

const RightPanel = () => {
    const { inputSection, setInputSection, updateCourse, isAnyError, updating, setUpdating, editMode } = useContext(CreateCourseContext);
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    // console.log(inputSection);
    // useEffect(() => {
    //     console.log(inputSection);
    // }, [inputSection]);

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

    useEffect(() => {
        let element = document.querySelector(".publish-course-main");
        if (element) {
            element.scrollTop = 0;
        }
    }, [inputSection]);

    useEffect(() => {
        if (updating == "updated" || updating == "failed") {
            setOpenSnackbar(true);
            setUpdating("");
        }
    }, [updating]);

    // useEffect(() => {
    //     console.log("updating", updating);
    //     console.log(openSnackbar);
    // }, [updating, openSnackbar]);

    useEffect(() => {
        if (updating == "updating") {
            updateCourse("draft");
        }
    }, [updating]);

    return (
        <Box
            sx={{
                backgroundColor: isMobileScreens ? "transparent" : "white",
                padding: isMobileScreens ? "0rem" : "2rem",
                borderRadius: "0.25rem",
                // minHeight: "100%",
                // border: "2px solid green"
            }}
        >
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => {
                    setOpenSnackbar(false);
                    setUpdating("");
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    onClose={() => {
                        setOpenSnackbar(false);
                        setUpdating("");
                    }}
                    severity={!isAnyError() ? "success" : "error"}
                    sx={{
                        width: "100%",

                        backgroundColor: (theme) => (!isAnyError() ? theme.palette.primary.light : theme.palette.error.light),
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        {!isAnyError() ? "Your course information is saved as draft." : "Failed to save course information."}
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
                    my: "2rem",
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: isMobileScreens ? "column" : "row",
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
                                    color: (theme) => theme.palette.primary.darker,
                                    background: (theme) => theme.palette.background.alt,
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
                {!editMode && (
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
                                    background: (theme) => theme.palette.grey.grey900,
                                },
                            },
                        }}
                        onClick={() => {
                            //updateCourse("draft");
                            setUpdating("updating");

                            // if (updating == "updated" || updating == "failed") {
                            //     setOpenSnackbar(true);
                            // }
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
                )}
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
                                    color: (theme) => theme.palette.primary.darker,
                                    background: (theme) => theme.palette.background.alt,
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
                ) : (
                    <Box></Box>
                )}
            </Box>
        </Box>
    );
};

export default RightPanel;
