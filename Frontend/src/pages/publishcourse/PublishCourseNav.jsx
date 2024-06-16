import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FlexBetween from "../../components/FlexBetween";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import ListIcon from "@mui/icons-material/List";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledButton } from "../../components/StyledButton";
import LeftPanel from "./LeftPanel";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";

const PublishCourseNav = ({
    anchorEl,
    handleClick,
    handleClose,
    setUploadStatus,
    isCourseValid,
    editMode
}) => {
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const { courseState} = useContext(CreateCourseContext);

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
                                }
                                else navigate("/");
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
                                    color: (theme) =>
                                        theme.palette.grey.grey800,
                                },
                            }}
                            onClick={() => {
                                navigate("/");
                            }}
                        />

                        <IconButton onClick={handleClick}>
                            <ListIcon
                                sx={{
                                    cursor: "pointer",
                                    color: (theme) =>
                                        theme.palette.grey.grey400,
                                    fontSize: "2rem",
                                    "&:hover": {
                                        color: (theme) =>
                                            theme.palette.grey.grey800,
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
                            <Box
                                sx={{
                                    padding: "1rem",
                                }}
                                onClick={() => {
                                    if (isMobileScreens) handleClose();
                                }}
                            >
                                <LeftPanel />
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
                            {editMode ? "Edit Course Info" : "Create new course"}
                            
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
                                padding: "0.2rem 1rem",
                                background: isCourseValid()
                                    ? (theme) => theme.palette.primary.main
                                    : (theme) => theme.palette.grey.grey100,
                                height: "36px",
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
        </Box>
    );
};

export default PublishCourseNav;
