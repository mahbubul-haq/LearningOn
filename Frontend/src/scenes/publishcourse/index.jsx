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
import { Divider, IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import useTheme from "@mui/material/styles/useTheme";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ListIcon from "@mui/icons-material/List";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const PublishCourse = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(0);
    const user = useSelector((state) => state.user);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    // const [editMode, setEditMode] = React.useState(useParams().editMode);
    // const [courseId, setCourseId] = React.useState(useParams().courseId);
    const edit = useParams().edit;
    const id = useParams().courseId;

    const {
        courseState,
        setCourseState,
        isCourseValid,
        getDraftCourse,
        updateCourse,
        uploadStatus,
        setUploadStatus,
        editMode,
        setEditMode,
        courseId,
        setCourseId,
        getCoursePlainById,
    } = useContext(CreateCourseContext);
    const { categories, getUsers, getCategories, setOpenedItem, getUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleClick = (event) => {
        if (anchorEl) setAnchorEl(null);
        else setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (edit == "edit" && id) {
            setCourseId(id);
            setEditMode(edit);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        //console.log(edit, id);
        if (edit == "edit" && id) {
            getCoursePlainById(id);
            getUsers();
            getCategories();
        } else {
            getDraftCourse();
            getUsers();
            getCategories();
            // setOpenedItem("courses");
        }
    }, []);

    useEffect(() => {
        if (courseState.courseStatus === "published") setDialogOpen(2);
    }, [courseState.courseStatus]);

    useEffect(() => {
        if (uploadStatus == "publishing") {
            updateCourse("published");
        }
    }, [uploadStatus]);

    useEffect(() => {
        console.log(courseState);
    }, [courseState]);

    return (
        <>
            <Dialog
                open={uploadStatus === "publishing" || uploadStatus === "unpublished" || uploadStatus === "published"}
                onClose={(event, reason) => {
                    if (reason !== "backdropClick") {
                        setUploadStatus("");
                    }
                }}
                aria-labelledby="responsive-dialog-title"
                disableEscapeKeyDown
            >
                <DialogTitle id="responsive-dialog-title">Course Publish Status</DialogTitle>
                <DialogContent>
                    {uploadStatus === "publishing" && (
                        <Box>
                            <LinearProgress />
                            <Typography>Uploading course content...</Typography>
                        </Box>
                    )}
                    {uploadStatus === "unpublished" && <>There was an error publishing your course.</>}
                    {uploadStatus === "published" && <>Your course has been published successfully.</>}
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
                                    color: (theme) => theme.palette.primary.darker,
                                    background: (theme) => theme.palette.background.alt,
                                },
                            },
                        }}
                        onClick={() => {
                            if (uploadStatus === "published") {
                                navigate("/dashboard");
                                setUploadStatus("");
                                setEditMode("");
                                setCourseId("");
                                getUser();
                            } else {
                                setUploadStatus("");
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                pl: "0.5rem",
                                textTransform: "uppercase",
                            }}
                        >
                            {uploadStatus === "published" ? "Go to dashboard" : "Close"}
                        </Typography>
                    </StyledButton>
                </DialogActions>
            </Dialog>
            <Box
                className="publish-course-main"
                sx={{
                    height: "100%",
                    overflow: "auto",
                    width: "100%",
                    position: "relative",
                    scrollBehavior: "smooth",
                }}
            >
                <Box
                    sx={{
                        position: "sticky",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        top: 0,
                        zIndex: 10,
                        px: isNonMobileScreens ? "3rem" : "1rem",
                        py: "0.7rem",
                        height: "50px",
                        backgroundColor: "white",

                        boxShadow: (theme) => `0px 4px 8px 0px ${theme.palette.nav.boxShadow}`,
                    }}
                >
                    {isNonMobileScreens && (
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
                                    navigate("/");
                                }}
                            >
                                Back
                            </Button>
                        </Box>
                    )}
                    {!isNonMobileScreens && (
                        <FlexBetween
                            sx={{
                                gap: "0.5rem",
                            }}
                        >
                            <ArrowBackIcon
                                sx={{
                                    cursor: "pointer",
                                    color: (theme) => theme.palette.grey.grey400,
                                    fontSize: "1.5rem",
                                    "&:hover": {
                                        color: (theme) => theme.palette.grey.grey800,
                                    },
                                }}
                                onClick={() => {
                                    navigate("/");
                                }}
                            />

                            <IconButton
                                onClick={handleClick}
                            >
                                <ListIcon
                                    sx={{
                                        cursor: "pointer",
                                        color: (theme) => theme.palette.grey.grey400,
                                        fontSize: "2rem",
                                        "&:hover": {
                                            color: (theme) => theme.palette.grey.grey800,
                                        },
                                    }}
                                />
                            </IconButton>
                            <Menu
                                id="publish-course-menu"
                                aria-labelledby="publish-course-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                            >
                                <Box sx={{
                                    padding: "1rem"
                                }} onClick={() => {
                                    if (isMobileScreens) handleClose();
                                }}>
                                    <LeftPanel/>
                                </Box>
                                
                            </Menu>
                        </FlexBetween>
                    )}
                    {isNonMobileScreens && (
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
                    )}
                    <FlexBetween gap="1.5rem">
                        <StyledButton
                            disabled={!isCourseValid()}
                            onClick={() => {
                                setUploadStatus("publishing");
                                //updateCourse("published");
                            }}
                            sx={{
                                // cursor: isCourseValid() ? "pointer" : "not-allowed",
                                // pointerEvents: isCourseValid() ? "auto" : "none",

                                "&&": {
                                    padding: "0.2rem 0.5rem",
                                    background: isCourseValid() ? (theme) => theme.palette.primary.main : (theme) => theme.palette.grey.grey100,
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
                        height: "calc(100% - 50px)",
                        // zIndex: "1000",
                        // border: "2px solid red",
                        overflowY: "auto",
                        top: "0",
                        width: "30%",
                        display: isNonMobileScreens ? "grid" : "none",
                        //gridTemplateRows: "100",
                        padding: "0",
                        marginTop: "50px",
                        borderRight: `1px dashed ${theme.palette.customDivider.main}`,
                    }}
                >
                    {/* <Box
                        sx={
                            {
                                // borderBottom: "1px solid black",
                            }
                        }
                    ></Box> */}
                    <Box
                        sx={{
                            // overflowY: "auto",
                            // height: "100%",

                            // border: "1px solid red"
                            // border: "1px solid red"
                            paddingTop: "50px",
                            paddingBottom: "2rem",
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
                    {/* <Box></Box> */}
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
                        // position: "fixed",
                        // height: "100%",
                        // overflowY: "auto",
                        position: "relative",
                        left: isNonMobileScreens ? "35%" : "0",
                        right: isNonMobileScreens ? "0" : "0",
                        zIndex: "1",
                        width: isNonMobileScreens ? "65%" : "100%",
                        // border: "2px solid red"
                    }}
                >
                    <Box
                        sx={{
                            height: isNonMobileScreens ? "50px" : isMobileScreens ? "2rem" : "1rem",
                            // borderBottom: "1px solid black",
                        }}
                    ></Box>
                    <Box
                        sx={{
                            padding: isNonMobileScreens ? "0 4rem 2rem 0" : "0 1rem 2rem 1rem",
                            // border: "2px solid black",
                            // minHeight: "calc(100% - 50px)"
                            // border: "2px solid green",
                        }}
                    >
                        <RightPanel />
                    </Box>
                </Box>
            </Box>
            {/* </Box> */}
        </>
    );
};

export default PublishCourse;
