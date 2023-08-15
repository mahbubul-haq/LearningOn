import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledButton } from "../../components/StyledButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FlexBetween from "../../components/FlexBetween";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import { GlobalContext } from "../../state/GlobalContext";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const {
        courseState,
        setCourseState,
        isCourseValid,
        getDraftCourse,
        updateCourse,
    } = useContext(CreateCourseContext);
    const { categories, getUsers,getCategories } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        getDraftCourse();
        getUsers();
        getCategories();
    }, []);

    return (
        <>
            <Box
                sx={{
                    position: "sticky",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    top: 0,
                    zIndex: 100,
                    px: isNonMobileScreens ? "3rem" : "2rem",
                    py: "0.7rem",
                    backgroundColor: "white",
                    boxShadow: (theme) =>
                        `0px 4px 8px 0px ${theme.palette.nav.boxShadow}`,
                }}
            >
                <Box>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{
                            padding: "0.2rem 0.5rem",
                            textTransform: "capitalize",
                            borderRadius: "0.2rem",
                        }}
                        onClick={() => {
                            // navigate(-1);
                            navigate(-1);
                        }}
                    >
                        Back
                    </Button>
                </Box>
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "600",
                            color: (theme) => theme.palette.grey.grey400,
                        }}
                    >
                        Create new course
                    </Typography>
                </Box>
                <FlexBetween gap="1.5rem">
                    <StyledButton
                        disabled={!isCourseValid()}
                        onClick={() => {
                            console.log("publishing course");
                        }}
                        sx={{
                            // cursor: isCourseValid() ? "pointer" : "not-allowed",
                            // pointerEvents: isCourseValid() ? "auto" : "none",

                            "&&": {
                                padding: "0.2rem 0.5rem",
                                background: isCourseValid()
                                    ? (theme) => theme.palette.primary.main
                                    : (theme) => theme.palette.grey.grey100,
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                            }}
                        >
                            Publish
                        </Typography>
                    </StyledButton>
                </FlexBetween>
            </Box>
            <Box
                sx={{
                    padding: isNonMobileScreens ? "4rem 5rem" : "2rem",
                    paddingBottom: "6rem",

                    height: "100%",
                    overflow: "auto",
                }}
            >
                <Box
                    sx={{
                        overflow: "auto",
                        height: "100%",
                        position: "fixed",
                        maxWidth: "15%",
                    }}
                >
                    <LeftPanel />
                </Box>
                <Box
                    sx={{
                        marginLeft: "20%",
                        width: "80%",
                        backgroundColor: "white",
                        padding: "2rem",
                        borderRadius: "0.2rem",
                    }}
                >
                    <RightPanel />
                </Box>
            </Box>
        </>
    );
};

export default PublishCourse;
