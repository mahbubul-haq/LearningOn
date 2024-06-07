import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import { GlobalContext } from "../../state/GlobalContext";
import { useNavigate } from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PublishCourseNav from "./PublishCourseNav";
import PublishStatusDialog from "./PublishStatusDialog";

const PublishCourse = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    //const [dialogOpen, setDialogOpen] = React.useState(0);
    const user = useSelector((state) => state.user);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);

    // const [editMode, setEditMode] = React.useState(useParams().editMode);
    // const [courseId, setCourseId] = React.useState(useParams().courseId);
    const edit = useParams().edit;
    const id = useParams().courseId;

    const {
        courseState,
        isCourseValid,
        getDraftCourse,
        updateCourse,
        uploadStatus,
        setUploadStatus,
        setEditMode,
        setCourseId,
        getCoursePlainById,
    } = useContext(CreateCourseContext);
    const { getUsers, getCategories, getUser } = useContext(GlobalContext);
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

    // useEffect(() => {
    //     if (courseState.courseStatus === "published") setDialogOpen(2);
    // }, [courseState.courseStatus]);

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
            <PublishStatusDialog
                uploadStatus={uploadStatus}
                setUploadStatus={setUploadStatus}
                setEditMode={setEditMode}
                setCourseId={setCourseId}
                getUser={getUser}
            />
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
                <PublishCourseNav
                    anchorEl={anchorEl}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    setUploadStatus={setUploadStatus}
                    isCourseValid={isCourseValid}
                />
                
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
