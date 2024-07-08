import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import ProfileTop from "./ProfileTop";
import { useContext } from "react";
import { GlobalContext } from "../../state/GlobalContext";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import { ProfilePageContext } from "../../state/ProfilePageContext";
import FlexBetween from "../../components/FlexBetween";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const ProfilePage = () => {
    const { userId } = useParams();
    const { userById, getUserById,  setOpenedItem } = useContext(GlobalContext);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const { setOpenedTab,
        editProfileStatus,
        setEditProfileStatus,
        setProfileInfoChanged,
     } = useContext(ProfilePageContext);
    const theme = useTheme();

    const getQualifications = () => {
        let qualifications = [];

        if (userById?.learning?.length > 0) {
            qualifications.push("Student");
        }
        if (userById?.courses?.length > 0) {
            qualifications.push("Instructor");
        }
        if (userById?.tutoring?.length > 0) {
            qualifications.push("Tutor");
        }
        if (userById?.blogs?.length > 0) {
            qualifications.push("Blogger");
        }

        if (qualifications.length === 0) {
            qualifications.push("Student");
        }
        return qualifications.join(", ");
    };

    useEffect(() => {
        getUserById(userId);
        setOpenedTab("profile");
    }, [userId]);

    useEffect(() => {
        if (editProfileStatus === "editing") {
            setProfileInfoChanged(true);
        }
        console.log(userById);
    }, [userById]);

    useEffect(() => {
        setOpenedItem("profile");
        setProfileInfoChanged(false);
        setEditProfileStatus("");

    }, []);

    return (
        <Box
            sx={{
               
                width: "100%",
                minHeight: "600px",
                paddingBottom: "2rem",
                overflow: "hidden",
                minWidth: "300px",
            }}
        >
            <ProfileTop userInfo={userById} />
            {isMobileScreens && (
                <>
                    <FlexBetween
                        sx={{
                            "&&": {
                                flexDirection: "column",
                                gap: "0.5rem",
                                alignItems: "flex-start",
                                mt: "2.5rem",
                                mx: "1rem",
                            },
                        }}
                    >
                        <Typography sx={{ fontSize: isNonMobileScreens ? "1.5rem" : "1.2rem", fontWeight: "bold" }}>{userById?.name}</Typography>
                        <Typography sx={{ fontSize: "0.9rem" }}>{getQualifications()}</Typography>
                    </FlexBetween>
                    <Divider
                        light
                        sx={{
                            color: (theme) => theme.palette.grey.grey400,
                            mt: "2rem",
                            mb: "1rem",
                        }}
                    />
                </>
            )}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "2000px",
                    mx: "auto",
                    padding: isNonMobileScreens ? "7rem 64px" : isMobileScreens ? "0rem 24px" : "5rem 24px",
                    //padding: isNonMobileScreens ? "7rem 5rem 5rem 5rem" : isMobileScreens ? "0rem 1rem 0 1rem" : "5rem 2rem 5rem 2rem",
                    display: "flex",
                    gap: "4rem",
                }}
            >
                {isNonMobileScreens && (
                    <Box
                        sx={{
                            width: isNonMobileScreens ? "20%" : "25%",
                            // border: "1px solid #ccc",
                        }}
                    >
                        <ProfileLeft userInfo={userById} />
                    </Box>
                )}
                <Box
                    sx={{
                        width: isNonMobileScreens ? "80%" : "100%",
                        // border: "1px solid #ccc",
                        backgroundColor: isMobileScreens ? "transparent" : theme.palette.background.imagesBg1,
                    }}
                >
                    <ProfileRight userInfo={userById} />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
