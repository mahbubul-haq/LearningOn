import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProfileTop from "./ProfileTop";
import { useContext } from "react";
import { GlobalContext } from "../../state/GlobalContext";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import { ProfilePageContext } from "../../state/ProfilePageContext";

const ProfilePage = () => {
    const { userId } = useParams();
    const { userById, getUserById, setUserById } = useContext(GlobalContext);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { openedTab, setOpenedTab } = useContext(ProfilePageContext);
    const theme = useTheme();

    useEffect(() => {
        getUserById(userId);
        setOpenedTab("profile");
    }, [userId]);

    useEffect(() => {
        console.log(userById);
        
    }, [userById]);

   

    return (
        <Box sx={{
            height: "100%",
            width: "100%",
            minHeight: "600px",
            overflow: "auto",
        }}>
            <Navbar />
            <ProfileTop userInfo={userById} />
            <Box
                sx={{
                    width: "100%",
                    padding: "7rem 5rem 5rem 5rem",
                    display: "flex",
                    gap: "4rem",
                }}
            >
                <Box
                    sx={{
                        width: isNonMobileScreens ? "20%" : "25%",
                        // border: "1px solid #ccc",
                    }}
                >
                    <ProfileLeft userInfo={userById} />
                </Box>
                <Box
                    sx={{
                        width: isNonMobileScreens ? "80%" : "75%",
                        // border: "1px solid #ccc",
                        backgroundColor: theme.palette.background.imagesBg1,
                    }}
                >
                    <ProfileRight userInfo={userById} />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
