import React from "react";
import Box from "@mui/material/Box";
import { useContext } from "react";
import CourseWidget from "../../widgets/CourseWidget";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";


const ProfileCourses = ({ userCourses }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const handleScroll = (direction) => {
        const container = document.querySelector(".profile-courses-container");
        const scrollDistance = isNonMobileScreens ? 500 : 200;
        if (direction === "right") {
            container.scrollBy({
                top: 0,
                left: scrollDistance,
                behavior: "smooth",
            });
        } else {
            container.scrollBy({
                top: 0,
                left: -scrollDistance,
                behavior: "smooth",
            });
        }

        setTimeout(() => {
            let leftArrow = document.querySelector(".profile-course-left-arrow");
            let rightArrow = document.querySelector(".profile-course-right-arrow");

            if (container.scrollLeft === 0) {
                leftArrow.style.visibility = "hidden";
            } else {
                leftArrow.style.visibility = "visible";
            }

            if (container.scrollLeft + container.clientWidth + 10 >= container.scrollWidth) {
                rightArrow.style.visibility = "hidden";
            } else {
                rightArrow.style.visibility = "visible";
            }
        }, 100);
    };

    return (
        <Box
            sx={{
                position: "relative",

                width: "100%",
            }}
        >
            {userCourses && userCourses.length > 0 && (
                <Box
                    //className="courses-wrapper"
                    sx={{
                        width: "100%",
                        position: "relative",
                    }}
                >
                    <Box
                        className="profile-course-right-arrow"
                        sx={{
                            position: "absolute",
                            right: isNonMobileScreens ? "0" : "-25px",
                            top: isNonMobileScreens ? "0" : "50%",
                            transform: isNonMobileScreens ? "none" : "translateY(-50%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0,0.7)",
                            ":hover": {
                                backgroundColor: "rgba(0, 0, 0,0.9)",
                            },
                            cursor: "pointer",
                            transition: "all 0.5s ease",
                            zIndex: "1",
                            height: isNonMobileScreens ? "100%" : "45px",
                            width: isNonMobileScreens ? "auto" : "45px",
                            borderRadius: isNonMobileScreens ? "0" : "50%",
                        }}
                        onClick={() => {
                            handleScroll("right");
                        }}
                    >
                        <ArrowForwardIosIcon
                            sx={{
                                fontSize: isNonMobileScreens ? "3rem" : "1.5rem",
                                color: "rgba(255, 255, 255, 1)",
                                alignSelf: "center",
                            }}
                        />
                    </Box>

                    <Box
                        className="profile-course-left-arrow"
                        sx={{
                            position: "absolute",
                            left: isNonMobileScreens ? "0" : "-25px",
                            // top: "0",
                            // bottom: "0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0,0.7)",
                            ":hover": {
                                backgroundColor: "rgba(0, 0, 0,0.9)",
                            },
                            cursor: "pointer",
                            transition: "all 0.5s ease",
                            zIndex: "1",
                            height: isNonMobileScreens ? "100%" : "45px",
                            width: isNonMobileScreens ? "auto" : "45px",
                            borderRadius: isNonMobileScreens ? "0" : "50%",
                            top: isNonMobileScreens ? "0" : "50%",
                            transform: isNonMobileScreens ? "none" : "translateY(-50%)",
                        }}
                        onClick={() => {
                            handleScroll("left");
                        }}
                    >
                        <ArrowForwardIosIcon
                            sx={{
                                fontSize: isNonMobileScreens ? "3rem" : "1.5rem",
                                color: "rgba(255, 255, 255, 1)",
                                alignSelf: "center",
                                transform: "rotate(180deg)",
                            }}
                        />
                    </Box>
                    <Box
                        className="profile-courses-container"
                        sx={{
                            display: "flex",
                            flexWrap: "nowrap",
                            gap: isNonMobileScreens ? "1.5rem" : "1rem",
                            overflowX: "hidden",
                            width: "100%",
                            height: "100%",
                            scrollBehavior: "smooth",
                        }}
                    >
                        {userCourses?.map((course) => {
                            if (course?.courseStatus !== "published") return null;
                            return (
                                <Box
                                    key={course._id}
                                    sx={{
                                        display: "grid",
                                        gridTemplateRows: "1",
                                    }}
                                >
                                    <CourseWidget courseInfo={course} />
                                </Box>
                            );
                        })}
                    </Box>
                    {/* <Typography>
                        Brows better in courses page
                    </Typography> */}
                </Box>
            )}
            {!userCourses ||
                (userCourses.length === 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            width: "100%",
                            color: "rgba(0, 0, 0, 0.5)",
                            fontSize: "1rem",
                            // fontWeight: "600",
                        }}
                    >
                        User has not published any courses yet
                    </Box>
                ))}
        </Box>
    );
};

export default ProfileCourses;
