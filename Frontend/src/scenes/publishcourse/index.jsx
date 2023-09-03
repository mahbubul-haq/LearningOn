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
import { Divider } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector } from "react-redux";

const PublishCourse = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(0);
    const user = useSelector((state) => state.user);

    const {
        courseState,
        setCourseState,
        isCourseValid,
        getDraftCourse,
        updateCourse,
        uploadStatus,
        setUploadStatus,
    } = useContext(CreateCourseContext);
    const { categories, getUsers, getCategories } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        getDraftCourse();
        getUsers();
        getCategories();
    }, []);

    useEffect(() => {
        if (courseState.courseStatus === "published") setDialogOpen(2);
    }, [courseState.courseStatus]);

    return (
        <>
            <Dialog
                open={
                    uploadStatus === "publishing" ||
                    uploadStatus === "unpublished" ||
                    uploadStatus === "published"
                }
                onClose={() => setUploadStatus("")}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Course Publish Status
                </DialogTitle>
                <DialogContent>
                    {uploadStatus === "publishing" && (
                        <Box>
                            <LinearProgress />
                            <Typography>Uploading course content...</Typography>
                        </Box>
                    )}
                    {uploadStatus === "unpublished" && (
                        <>There was an error publishing your course.</>
                    )}
                    {uploadStatus === "published" && (
                        <>Your course has been published successfully.</>
                    )}
                </DialogContent>
                <DialogActions>
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
                        onClick={() => {
                            setUploadStatus("");
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                pl: "0.5rem",
                                textTransform: "uppercase",
                            }}
                        >
                            Close
                        </Typography>
                    </StyledButton>
                </DialogActions>
            </Dialog>
            <Box
                sx={{
                    position: "sticky",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    top: 0,
                    zIndex: 10,
                    px: isNonMobileScreens ? "3rem" : "2rem",
                    py: "0.7rem",
                    height: "50px",
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
                            setUploadStatus("publishing");
                            updateCourse("published");
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
            {/* <Box
                // sx={{
                //     padding: isNonMobileScreens ? "4rem 5rem" : "2rem",
                //     paddingBottom: "6rem",

                //     height: "100%",
                //     overflow: "auto",
                // }}
            > */}
            <Box
                sx={{
                    position: "fixed",
                    height: "100%",
                    // zIndex: "1000",
                    // border: "2px solid red",
                    overflowY: "auto",
                    top: "0",
                    width: "30%",
                    display: "grid",
                    gridTemplateRows: "100px calc(100% - 100px - 2rem) 2rem",
                    padding: "0",
                }}
            >
                <Box
                    sx={
                        {
                            // borderBottom: "1px solid black",
                        }
                    }
                ></Box>
                <Box
                    sx={{
                        overflowY: "auto",
                        height: "100%",

                        // border: "1px solid red"
                        // border: "1px solid red"
                    }}
                >
                    <Box
                        sx={{
                            padding: "0rem 0 0rem 4rem",
                            //border: "1px solid black"
                        }}
                    >
                        <LeftPanel />
                    </Box>
                </Box>
                <Box></Box>
            </Box>
            {/* <Divider orientation="vertical" flexItem sx={{
                    height: "100%",
                    position: "fixed",
                    left: "25%",
                    zIndex: "1000",
                    borderRightWidth: "2px",
                    
                }}
                    /> */}
            <Box
                sx={{
                    position: "fixed",
                    height: "calc(100% - 50px)",
                    overflowY: "auto",
                    top: "50px",
                    left: "30%",
                    zIndex: "1",
                    width: "70%",
                }}
            >
                <Box
                    sx={{
                        height: "50px",
                        // borderBottom: "1px solid black",
                    }}
                ></Box>
                <Box
                    sx={{
                        padding: "0 4rem 2rem 0",
                        // border: "2px solid black",
                        // minHeight: "calc(100% - 50px)"
                    }}
                >
                    <RightPanel />
                </Box>
            </Box>
            {/* </Box> */}
        </>
    );
};

export default PublishCourse;
