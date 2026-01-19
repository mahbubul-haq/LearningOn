import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Divider, Typography, Button } from '@mui/material';
import { colorTokens } from "../../theme.js";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext } from 'react';
import { StyledButton } from '../../components/StyledButton';
import { CreateCourseContext } from '../../state/CreateCourse';
import useTheme from '@mui/material/styles/useTheme';

const RightPanelBottom = () => {
    const theme = useTheme();
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const { inputSection, setInputSection, editMode, setUpdating, setUploadStatus, isCourseValid } = useContext(CreateCourseContext);

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
                {/* PREV BUTTON (Subtle) */}
                {inputSection !== "basic info" ? (
                    <Button
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            cursor: "pointer",
                            padding: "0.5rem 1rem",
                            borderRadius: "2rem",
                            backgroundColor: (theme) => theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: (theme) => theme.palette.action.hover,
                                border: `1px solid ${theme.palette.primary.main}`,
                                transform: "translateY(-1px)",
                                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                                "& .prev-icon": {
                                    color: (theme) => theme.palette.primary.main,
                                }
                            }
                        }}
                        onClick={handlePrev}
                    >
                        <KeyboardDoubleArrowLeftIcon className="prev-icon" sx={{ fontSize: "1.2rem", color: theme.palette.text.secondary }} />
                        <Typography sx={{ fontWeight: "600", pl: "0.25rem", color: theme.palette.text.primary }}>Prev</Typography>
                    </Button>
                ) : (
                    <Box></Box>
                )}

                {/* SAVE PROGRESS BUTTON (Distinct) */}
                {!editMode && (
                    <StyledButton
                        variant="contained"
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "600",
                            color: "#fff",
                            boxShadow: "none",
                            px: "2rem",

                        }}
                        onClick={() => {
                            setUpdating("updating");
                        }}
                    >
                        Save Progress
                    </StyledButton>
                )}

                {/* NEXT BUTTON (Outlined/Subtle) */}
                {inputSection != "course content" ? (
                    <StyledButton
                        variant="outlined"
                        sx={{
                            "&&": {
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                cursor: "pointer",
                                padding: "0.5rem 1rem",
                                borderRadius: "2rem",
                                backgroundColor: (theme) => theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    backgroundColor: (theme) => theme.palette.action.hover,
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    transform: "translateY(-1px)",
                                    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                                    "& .next-icon": {
                                        color: (theme) => theme.palette.primary.main,
                                    }
                                }
                            }
                        }}
                        onClick={handleNext}
                    >
                        <Typography sx={{ fontWeight: "600", pr: "0.5rem", color: theme.palette.text.primary }}>Next</Typography>
                        <KeyboardDoubleArrowRightIcon className="next-icon" sx={{ fontSize: "1.2rem", color: theme.palette.text.secondary }} />
                    </StyledButton>
                ) : (
                    // PUBLISH BUTTON (Final Step)
                    <StyledButton
                        variant="contained"
                        disabled={!isCourseValid()}
                        onClick={() => {
                            setUploadStatus("publishing");
                        }}
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "600",
                            background: (theme) => !isCourseValid() ? theme.palette.action.disabledBackground : theme.palette.success.main,
                            color: colorTokens.white.pure,
                            "&:hover": {
                                background: (theme) => theme.palette.success.dark,
                            },
                        }}
                    >
                        <Typography sx={{ fontWeight: "600" }}>Publish Course</Typography>
                    </StyledButton>
                )}
            </Box >
        </>
    )
}

export default RightPanelBottom