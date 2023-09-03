import LandingView from "./LandingView";
import Navbar from "../../components/Navbar.jsx";
import CoursesView from "./CoursesView";
import CourseWidget from "../../widgets/CourseWidget";
import Box from "@mui/material/Box";
import { useEffect, useRef } from "react";
import socketIoClient from "socket.io-client";

const HomePage = () => {
    const prevScrollY = useRef(0);

    useEffect(() => {
        const socket = socketIoClient(import.meta.env.VITE_REACT_APP_URL);

        socket.on("my-course-purchased", (data) => {
            console.log("data from server", data);
        });
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
                <CoursesView />
            </Box>
        </>
    );
};

export default HomePage;
