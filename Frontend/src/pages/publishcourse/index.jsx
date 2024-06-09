import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import { GlobalContext } from "../../state/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PublishCourseNav from "./PublishCourseNav";
import PublishStatusDialog from "./PublishStatusDialog";

const PublishCourse = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    //const [dialogOpen, setDialogOpen] = React.useState(0);
    const user = useSelector((state) => state.user);
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
        inputSection,
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

    useEffect(() => {
        document.querySelector(".publish-course-container")?.scrollTo(0, 0);
    }, [inputSection]);

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
                className="publish-course-container"
                sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                    scrollBehavior: "smooth",
                    position: "relative",
                    backgroundColor: "white",
                    // backgroundColor: theme.palette.background.default,
                }}>
                <PublishCourseNav
                    anchorEl={anchorEl}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    setUploadStatus={setUploadStatus}
                    isCourseValid={isCourseValid}
                />
                <Box
                    className="publish-course-main"
                    sx={{
                        //height: "100%",
                        // overflow: "auto",
                        width: "100%",
                        position: "sticky",
                        top: "4rem",
                        // scrollBehavior: "smooth",
                        display: "flex",
                        mx: "auto",
                        maxWidth: "2000px",
                        // border: "2px solid red"
                        px: isNonMobileScreens ? "64px" : "24px",
                    }}
                >


                    <Box
                        sx={{
                            position: "sticky",
                            height: `calc(100vh - 4rem)`,

                            // zIndex: "1000",
                            // border: "2px solid red",
                            overflowY: "auto",
                            top: "4rem",
                            width: "25%",
                            display: isNonMobileScreens ? "grid" : "none",
                            //gridTemplateRows: "100",
                            padding: "0",
                            pr: "1rem",
                            // borderRight: `1px dashed ${theme.palette.customDivider.main}`,
                            borderRight: '1px solid #e0e0e0',
                        }}
                    >

                        <Box
                            sx={{
                                // overflowY: "auto",
                                // height: "100%",

                                // border: "1px solid red"
                                // border: "1px solid red"
                                paddingTop: "1rem",
                                paddingBottom: "2rem",
                            }}
                        >

                            <LeftPanel />

                        </Box>

                    </Box>

                    <Box
                        sx={{
                            // position: "fixed",
                            // height: "100%",
                            // overflowY: "auto",
                            position: "relative",
                            //left: isNonMobileScreens ? "35%" : "0",
                            //right: isNonMobileScreens ? "0" : "0",
                            padding: isNonMobileScreens ? "2rem 0 2rem 3rem" : "2rem 0",
                            zIndex: "1",
                            flex: "1",
                            width: isNonMobileScreens ? "70%" : "100%",
                            // border: "2px solid red"
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
