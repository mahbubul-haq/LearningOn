import { useEffect } from "react";
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
import DeleteCourseDialog from "./DeleteCourseDialog";
import RightButtons from "./RightButtons";

const PublishCourse = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  //const [dialogOpen, setDialogOpen] = React.useState(0);
  const user = useSelector((state) => state.user);
  const edit = useParams().edit;
  const id = useParams().courseId;
  //console.log("edit and id", edit, id);

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
    editMode,
    setDeleteCourseStatus,
    mobileDrawerOpen,
    setMobileDrawerOpen,
  } = useContext(CreateCourseContext);
  const { getUsers, getCategories, getUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleClick = () => {
    mobileDrawerOpen ? setMobileDrawerOpen(false) : setMobileDrawerOpen(true);
  };

  const handleClose = () => {
    setMobileDrawerOpen(false);
  };

  useEffect(() => {
    if (edit == "edit" && id) {
      setCourseId(id);
      setEditMode(edit);
    } else {
      setEditMode("");
      setCourseId("");
    }
  }, []);

  useEffect(() => {
    console.log("publish course mounted");
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
    console.log("updatedd index", courseState);
  }, [courseState]);

  useEffect(() => {
    document.querySelector(".publish-course-container")?.scrollTo(0, 0);
  }, [inputSection]);

  return (
    <>
      <DeleteCourseDialog
        setEditMode={setEditMode}
        setCourseId={setCourseId}
        getUser={getUser}
      />
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
        }}
      >
        <PublishCourseNav
          mobileDrawerOpen={mobileDrawerOpen}
          handleClick={handleClick}
          handleClose={handleClose}
          setUploadStatus={setUploadStatus}
          isCourseValid={isCourseValid}
          editMode={editMode}
        />
        <Box
          className="publish-course-main"
          sx={{
            //height: "100%",
            // overflow: "auto",
            width: "100%",
            //position: "sticky",
            // top: `calc(4rem + 1px)`,
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
              height: `calc(100vh - 4rem - 1px)`,

              // zIndex: "1000",
              // border: "2px solid red",
              overflowY: "auto",
              top: `calc(4rem + 1px)`,
              width: "25%",
              display: isNonMobileScreens ? "grid" : "none",
              //gridTemplateRows: "100",
              padding: "0",
              pr: "1rem",
              // borderRight: `1px dashed ${theme.palette.customDivider.main}`,
              borderRight: "1px solid #e0e0e0",
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
              padding: isNonMobileScreens ? "2rem 0 2rem 2rem" : "2rem 0",
              zIndex: "1",
              flex: "1",
              width: isNonMobileScreens ? "50%" : "100%",
              // border: "2px solid red"
              // display: "grid",
              // gridTemplateColumns: "80% 20%",
            }}
          >
            <RightPanel />
          </Box>
          <Box
            sx={{
              width: "20%",
              //   display: isNonMobileScreens ? "block" : "none",
              position: "sticky",
              top: `calc(4rem + 1px)`,
              pl: "2rem",
              pt: "2rem",
              height: "100%",
              display: isNonMobileScreens ? "block" : "none",
            }}
          >
            <RightButtons 
              isCourseValid={isCourseValid}
              setUploadStatus={setUploadStatus}
              setDeleteCourseStatus={setDeleteCourseStatus}
            />
            
          </Box>
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
};

export default PublishCourse;
