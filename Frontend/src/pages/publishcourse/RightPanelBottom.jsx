import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Divider, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext } from 'react';
import { StyledButton } from '../../components/StyledButton';
import { CreateCourseContext } from '../../state/CreateCourse';

const RightPanelBottom = () => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const {inputSection, setInputSection, editMode, setUpdating} = useContext(CreateCourseContext);

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
    <>
    <Divider
                sx={{
                    my: "2rem",
                    zIndex: -1,
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: isMobileScreens ? "column" : "row",
                    gap: "1.5rem",
                    zIndex: -1,
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
    </>
  )
}

export default RightPanelBottom