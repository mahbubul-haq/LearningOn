import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FlexBetween from "../../components/FlexBetween";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import LeftPanel from "./LeftPanel";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { Drawer } from "@mui/material";
import RightButtons from "./RightButtons";


const PublishCourseNav = ({
  mobileDrawerOpen,
  handleClick,
  handleClose,
  editMode,
}) => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const { courseState,
    isCourseValid,
    setUploadStatus,
    setDeleteCourseStatus,
    inputSection
   } = useContext(CreateCourseContext);

  // useEffect(() => {
  //     console.log("courseState publish nav", courseState);
  // }, [courseState]);

  return (
    <Box
      sx={{
        position: "sticky",

        top: 0,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        // boxShadow: (theme) =>
        //     `0px 4px 8px 0px ${theme.palette.nav.boxShadow} inset`,
        borderBottom: "1px solid #e0e0e0",
        // borderBottom: `1px dashed ${theme.palette.customDivider.main}`
      }}
    >
      <Box
        sx={{
          maxWidth: "2000px",
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: isNonMobileScreens ? "64px" : "24px",
          py: "0.7rem",
          height: "4rem",
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
                height: "32px",
              }}
              onClick={() => {
                // navigate(-1);
                if (editMode) {
                  navigate(`/dashboard/${courseState._id}`);
                } else navigate("/");
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
          </FlexBetween>
        )}
        
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "600",
                color: (theme) => theme.palette.grey.grey400,
                textTransform: "capitalize",
              }}
            >
              {!isNonMobileScreens? inputSection : editMode ? "Edit Course Info" : "Create new course"}
            </Typography>
          </Box>
        
        <Box>
          {!isNonMobileScreens && (
            <IconButton sx={{
              
            }}onClick={handleClick}>
              <HiOutlineMenu
              size={25}
                sx={{
                  cursor: "pointer",
                  color: "black",
                  "&:hover": {
                    color: (theme) => theme.palette.grey.grey800,
                  },
                }}
              />
            </IconButton>
          
          )}
        </Box>
        <Drawer
            anchor="right"
            open={mobileDrawerOpen}
            onClose={() => handleClose()}
            sx={{
                "& .MuiDrawer-paper": {
                    width: "fit-content",
                    maxWidth: "400px",
                  padding: isMobileScreens ? "4rem 2rem 2rem 1rem" : "4rem 1rem 3rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3rem",
                },
            }}

        >
          <IconButton
           
                onClick={() => handleClose()}
                sx={{
                    position: "fixed",
                    right: "2rem",
                    top: "1rem",
                    color: theme => theme.palette.grey.grey800,
                }}
            >
                <IoCloseOutline size={25}/>
            </IconButton>

         
           <LeftPanel />
           
           <RightButtons isCourseValid={isCourseValid}
            setUploadStatus={setUploadStatus}
            setDeleteCourseStatus={setDeleteCourseStatus}
            />
         
        </Drawer>
      </Box>
    </Box>
  );
};

export default PublishCourseNav;
