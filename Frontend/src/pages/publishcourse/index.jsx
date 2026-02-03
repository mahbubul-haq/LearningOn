import Box from "@mui/material/Box";
import { colorTokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CreateCourseContext } from "../../state/CreateCourse";
import { GlobalContext } from "../../state/GlobalContext";
import DeleteCourseDialog from "./DeleteCourseDialog";
import PublishStatusDialog from "./PublishStatusDialog";
import RightPanel from "./RightPanel";
import PublishStepper from "./PublishStepper";
import { alpha, Button, IconButton, Container, useTheme } from '@mui/material';
import { Moon, Sun, ChevronLeft } from 'lucide-react';
import { setMode } from "../../state/reduxStore/authSlice";
import { StyledButton } from "../../components/StyledButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const PublishCourse = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const user = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode); // Get global mode
  const dispatch = useDispatch();
  const edit = useParams().edit;
  const id = useParams().courseId;
  const theme = useTheme(); // Access the global theme

  const {
    courseState,
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
    setMobileDrawerOpen,
    isCourseValid,
  } = useContext(CreateCourseContext);
  const { getUsers, getCategories, getUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  // --- Dynamic Mesh Background ---
  // Using direct colorTokens to match the exact original look, as theme palette shifts in dark mode
  const meshBackground = mode === 'dark'
    ? `
      radial-gradient(circle at 15% 15%, ${alpha(colorTokens.primary.dark, 0.8)} 0%, transparent 50%),
      radial-gradient(circle at 85% 85%, ${alpha(colorTokens.secondary.dark, 0.6)} 0%, transparent 50%),
      radial-gradient(at 50% 50%, ${colorTokens.primary.darker} 0%, #000 100%)
    `
    : `
      radial-gradient(circle at 0% 0%, ${alpha(colorTokens.primary.lighter, 0.4)} 0%, transparent 60%),
      radial-gradient(circle at 100% 100%, ${alpha(colorTokens.secondary.lighter, 0.4)} 0%, transparent 60%),
      linear-gradient(135deg, #fdfdfd 0%, #f3f4f6 100%)
    `;

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
    if (!user) {
      navigate("/login", {
        state: {
          isLogin: true,
          redirect: "/publishcourse"
        }
      });
    }
    if (edit == "edit" && id) {
      getCoursePlainById(id);
      getUsers();
      getCategories();
    } else {
      console.log("not edit mode")
      getDraftCourse();
      getUsers();
      getCategories();
    }
  }, []);

  useEffect(() => {
    if (uploadStatus == "publishing") {
      updateCourse("unpublished");
    }
  }, [uploadStatus]);

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
      {/* ThemeProvider removed as we use global theme now */}
      <Box
        className="publish-course-container"
        sx={{
          minHeight: '100vh',
          width: '100%',
          background: meshBackground,
          transition: 'background 0.5s ease',
          pb: 8,
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        {/* --- Header / Nav --- */}
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            startIcon={<ChevronLeft />}
            onClick={() => {
              if (editMode == "edit") {
                navigate(`/dashboard/${id}`);
              } else {
                navigate("/");
              }
            }}
            sx={{ color: 'text.secondary', fontWeight: 600 }}
          >
            Back
          </Button>

          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Delete Button */}
            {isNonMobileScreens ? (
              <Button
                onClick={() => setDeleteCourseStatus("initiated")}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "600",
                  color: (theme) => theme.palette.error.main,
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
                  },
                }}
              >
                Delete
              </Button>
            ) : (
              <IconButton
                onClick={() => setDeleteCourseStatus("initiated")}
                sx={{
                  color: (theme) => theme.palette.error.main,
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}

            {/* Publish Button */}
            {isNonMobileScreens ? (
              <StyledButton
                variant="contained"
                disabled={!isCourseValid()}
                onClick={() => setUploadStatus("publishing")}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "600",
                  background: (theme) => !isCourseValid() ? theme.palette.action.disabledBackground : theme.palette.success.main,
                  color: colorTokens.white.pure,
                  boxShadow: (theme) => !isCourseValid() ? "none" : "0 4px 14px 0 rgba(16, 185, 129, 0.4)",
                  "&:hover": {
                    background: (theme) => theme.palette.success.dark,
                    boxShadow: "0 6px 20px rgba(16, 185, 129, 0.6)",
                  },
                }}
              >
                Publish
              </StyledButton>
            ) : (
              <IconButton
                disabled={!isCourseValid()}
                onClick={() => setUploadStatus("publishing")}
                sx={{
                  color: colorTokens.white.pure,
                  background: (theme) => !isCourseValid() ? theme.palette.action.disabledBackground : theme.palette.success.main,
                  "&:hover": {
                    background: (theme) => theme.palette.success.dark,
                  },
                  padding: "8px",
                  borderRadius: "50%",
                  boxShadow: (theme) => !isCourseValid() ? "none" : "0 4px 14px 0 rgba(16, 185, 129, 0.4)",
                }}
              >
                <CloudUploadIcon />
              </IconButton>
            )}

            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{
                bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
                boxShadow: 2,
                ml: 1
              }}
            >
              {mode === 'dark' ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#4522ba" />}
            </IconButton>
          </Box>
        </Box>

        <Container maxWidth="md">
          {/* --- Stepper --- */}
          {/* Passing brand/mode props for compatibility, or update Stepper to use theme internally */}
          <Box sx={{ mb: 6, px: 2 }}>
            <PublishStepper mode={mode} brand={colorTokens} />
          </Box>

          {/* --- MAIN CONTENT AREA --- */}
          <Box
            className="publish-course-main"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem"
            }}
          >
            {/* Delete Button Removed (Moved to Header) */}


            {/* RightPanel now acts as the Glass Card Wrapper */}
            <RightPanel mode={mode} brand={colorTokens} />
          </Box>

        </Container>
      </Box>
    </>
  );
};

export default PublishCourse;
