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
import socketIoClient from "socket.io-client";

const ProfilePage = () => {
    const { userId } = useParams();
    const { userById, getUserById, setUserById } = useContext(GlobalContext);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();

    useEffect(() => {
        getUserById(userId);
    }, [userId]);

    useEffect(() => {
        console.log(userById);
    }, [userById]);

    useEffect(() => {
        if (userById) {
            const socket = socketIoClient(import.meta.env.VITE_REACT_APP_URL);
            /// send roomId and userId to server, socket.emit("join-room")

            socket.emit("join-room", {
                roomId: userById._id,
                userId: userById._id,
            });

            socket.on("user-joined", (data) => {
                if (data.userId === userById._id) {
                    console.log("ureka");
                }
                else {
                    console.log("someone joined");
                }
            });
        }
    }, [userById]);

    return (
        <Box>
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
