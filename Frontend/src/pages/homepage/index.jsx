import LandingView from "./LandingView";
import HomeCourses from "./HomeCourses.jsx";
import Box from "@mui/material/Box";
import { useEffect, useRef } from "react";
import socketIoClient from "socket.io-client";
import { useContext } from "react";
import { NotificationContext } from "../../state/NotificationContext";
import { useSelector } from "react-redux";
import { GlobalContext } from "../../state/GlobalContext";
import Navbar from "../../components/navbar/index.jsx";

const HomePage = () => {
    const prevScrollY = useRef(0);

    const user = useSelector((state) => state.user);
    const {setOpenedItem} = useContext(GlobalContext);
    const { getNotifications } =
        useContext(NotificationContext);

    useEffect(() => {

        const socket = socketIoClient(import.meta.env.VITE_SERVER_URL);

        socket.on("my-course-purchased", (data) => {
            getNotifications(user._id);
            console.log("someone purchased", data);
        });
        setOpenedItem("home");
    }, []);

    useEffect(() => {
        let element = document.querySelector(".homepage-main");
        if (!element) return;
        let element2 = document.querySelector(".sticky-top-homepage");

        const scrollEventListner = element.addEventListener(
            "scroll",
            (e) => {
                const currentScrollY = e.target.scrollTop;
                if (
                    currentScrollY > prevScrollY.current &&
                    currentScrollY > 500
                ) {
                    element2.style.position = "relative";
                    element2.style.top = "-100px";
                } else {
                    element2.style.position = "sticky";
                    element2.style.top = "0";
                }
                prevScrollY.current = currentScrollY;
            },
            { passive: true }
        );

        return () => {
            let element = document.querySelector(".homepage-main");
            if (!element) return;
            element.removeEventListener("scroll", scrollEventListner);
        };
    }, []);

    return (
        <>
          
            <Box
                className="homepage-main"
                sx={{
                    overflow: "auto",
                    height: "100%",
                    // marginTop: "5rem",
                }}
            >
                <Box
                    className="sticky-top-homepage"
                    sx={{
                        position: "sticky",
                        top: "0",
                        zIndex: "1000",
                        transition: "all 0.5s ease",
                    }}
                >
                    <Navbar />
                </Box>
                <LandingView />
                {/* <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "0rem 0 3rem 5rem",
                        backgroundColor: "white"
                    }}
                >
                    
                </Box> */}
                <HomeCourses />
            </Box>
        </>
    );
};

export default HomePage;
