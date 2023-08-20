import React, { useEffect } from "react";
import { Box, useMediaQuery, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import CourseWidget from "../../widgets/CourseWidget";
import CarouselWidget from "../../components/Carousel";
import CustomSlider from "../../components/CustomSlider";
import { useContext } from "react";
import { GlobalContext } from "../../state/GlobalContext";
import { HomePageContext } from "../../state/HomePageState";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CoursesView = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [courseType, setCourseType] = React.useState("Popular Courses");
    const { categories, listOfCategories } = useContext(GlobalContext);
    const [selectedItem, setSelectedItem] = React.useState("");
    const { courses, getCourses } = useContext(HomePageContext);
    const [selectedCourses, setSelectedCourses] = React.useState([]);

    useEffect(() => {
        if (listOfCategories.length > 0) {
            setSelectedItem(listOfCategories[0]);
        }
    }, [listOfCategories]);

    useEffect(() => {
        getCourses();
    }, []);

    useEffect(() => {
        if (selectedItem) {
            const filteredCourses = courses.filter((course) => {
                return course.category === selectedItem;
            });
            setSelectedCourses(filteredCourses);
        }
    }, [selectedItem]);

    const handleScroll = (direction) => {
        const container = document.querySelector(".courses-container");
        const scrollStep = 400;

        console.log(container.scrollLeft);

        if (direction === "left") {
            container.scrollLeft -= scrollStep;
        } else {
            container.scrollLeft += scrollStep;
        }

        if (container.scrollLeft === 0) {
            document.querySelector(".left-arrow").style.display = "none";
        } else {
            document.querySelector(".left-arrow").style.display = "flex";
        }

        if (
            container.scrollLeft + container.clientWidth + 5 >=
            container.scrollWidth
        ) {
            document.querySelector(".right-arrow").style.display = "none";
        } else {
            document.querySelector(".right-arrow").style.display = "flex";
        }
    };

    useEffect(() => {
        const container = document.querySelector(".courses-container");
        if (container) {
            if (container.scrollLeft === 0) {
                document.querySelector(".left-arrow").style.display = "none";
            } else {
                document.querySelector(".left-arrow").style.display = "flex";
            }

            if (
                container.scrollLeft + container.clientWidth + 5 >=
                container.scrollWidth
            ) {
                document.querySelector(".right-arrow").style.display = "none";
            } else {
                document.querySelector(".right-arrow").style.display = "flex";
            }
        }
    }, [selectedCourses]);

    return (
        <Box
            sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                padding: isNonMobileScreens ? "3rem 5rem" : "2rem",
            }}
        >
            <FlexBetween>
                <Box
                    sx={{
                        mb: "1rem",
                    }}
                >
                    <Typography variant="h3">{courseType}</Typography>
                </Box>
            </FlexBetween>
            <Box
                sx={{
                    p: "2rem",
                    backgroundColor: "white",
                    borderRadius: "0.25rem",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        mb: "2rem",
                    }}
                >
                    <CustomSlider
                        items={listOfCategories}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                </Box>
                <Box
                    sx={{
                        position: "relative",

                        width: "100%",
                    }}
                >
                    <Box
                        className="right-arrow"
                        sx={{
                            position: "absolute",
                            right: 0,
                            top: "0",
                            bottom: "0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0,0.7)",
                            cursor: "pointer",
                            transition: "all 0.5s ease",
                            zIndex: "1",
                        }}
                        onClick={() => {
                            handleScroll("right");
                        }}
                    >
                        <ArrowForwardIosIcon
                            sx={{
                                fontSize: "3rem",
                                color: "rgba(255, 255, 255, 1)",
                                alignSelf: "center",
                            }}
                        />
                    </Box>

                    <Box
                        className="left-arrow"
                        sx={{
                            position: "absolute",
                            left: "0",
                            top: "0",
                            bottom: "0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0,0.7)",
                            cursor: "pointer",
                            transition: "all 0.5s ease",
                            zIndex: "1",
                        }}
                        onClick={() => {
                            handleScroll("left");
                        }}
                    >
                        <ArrowForwardIosIcon
                            sx={{
                                fontSize: "3rem",
                                color: "rgba(255, 255, 255, 1)",
                                alignSelf: "center",
                                transform: "rotate(180deg)",
                            }}
                        />
                    </Box>
                    <Box
                        className="courses-container"
                        sx={{
                            display: "flex",
                            flexWrap: "nowrap",
                            gap: "2rem",
                            overflowX: "hidden",
                            width: "100%",
                            scrollBehavior: "smooth",
                        }}
                    >
                        {selectedCourses.map((course) => {
                            return (
                                <Box key={course._id}>
                                    <CourseWidget courseInfo={course} />
                                </Box>
                            );
                        })}
                        {selectedCourses.length === 0 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "150px",
                                }}
                            >
                                <Typography variant="h4">
                                    No courses found on <b>{selectedItem}</b>
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {selectedCourses.length > 4 && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                mt: "2rem",
                                cursor: "pointer",
                                
                            }}
                        
                        >
                            <Typography sx={{
                                borderRadius: "0.25rem",
                                border: "1px solid rgba(0, 0, 0, 0.23)",
                                fontSize: "1rem",
                                px: "0.5rem",
                                "&:hover": {
                                    backgroundColor: theme => theme.palette.grey.grey100
                                }
                            }}>
                                Browse more courses on <b>{selectedItem}</b>
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CoursesView;
