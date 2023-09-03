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
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "@mui/material/Tabs";
import { useSelector } from "react-redux";

const CoursesView = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [courseType, setCourseType] = React.useState("Popular Courses");
    const { categories, listOfCategories } = useContext(GlobalContext);
    const [categoriesWithCourse, setCategoriesWithCourse] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState("");
    const { courses, getCourses } = useContext(HomePageContext);
    const [filteredCourses, setFilteredCourses] = React.useState([]);
    const [selectedCourses, setSelectedCourses] = React.useState([]);
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (listOfCategories.length > 0) {
            setSelectedItem(listOfCategories[0]);
        } else {
            setSelectedItem("");
        }
    }, [listOfCategories]);

    useEffect(() => {
        getCourses();
    }, []);

    useEffect(() => {
        changeCourseType();
    }, [courses]);

    useEffect(() => {
        if (categoriesWithCourse.length > 0) {
            setSelectedItem(categoriesWithCourse[0]);
        } else {
            setSelectedItem("");
        }
    }, [categoriesWithCourse]);

    useEffect(() => {
        console.log(filteredCourses, listOfCategories);
        if (filteredCourses.length > 0 && listOfCategories.length > 0) {
            const categoriesWithCourse = listOfCategories.filter((category) => {
                return filteredCourses.reduce((cur, course) => {
                    return cur || course.category === category;
                }, false);
            });
            setCategoriesWithCourse(categoriesWithCourse);
        } else {
            setCategoriesWithCourse([]);
        }
    }, [filteredCourses, listOfCategories]);

    useEffect(() => {
        //console.log(selectedItem, courses);
        if (selectedItem) {
            const curfilteredCourses = filteredCourses.filter((course) => {
                return course.category === selectedItem;
            });
            setSelectedCourses(curfilteredCourses);
        }
    }, [selectedItem, filteredCourses]);

    const changeCourseType = () => {
        if (courseType === "My Courses") {
            const curFilteredCourses = [];

            courses?.forEach((course) => {
                console.log(course.owner._id, user._id);
                if (course.owner._id == user._id) {
                    curFilteredCourses.push(course);
                } else {
                    course.courseInstructors.forEach((instructor) => {
                        if (instructor._id == user._id) {
                            curFilteredCourses.push(course);
                        }
                    });
                }
            });

            setFilteredCourses(curFilteredCourses);
        } else if (courseType === "I am Learning") {
            const curFilteredCourses = [];
            user?.learning?.forEach(({ courseId }) => {
                const course = courses.find((course) => course._id == courseId);
                if (course) {
                    curFilteredCourses.push(course);
                }
            });

            setFilteredCourses(curFilteredCourses);
        } else if (courseType === "Popular Courses") {
            setFilteredCourses(courses);
        }
    };

    useEffect(() => {
        changeCourseType();
    }, [courseType]);

    // ueEffect(() => {

    // });

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

    const handleChange = (event, newValue) => {
        setCourseType(newValue);
    };

    return (
        <Box
            sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                padding: isNonMobileScreens ? "3rem 5rem" : "2rem",
            }}
        >
            <FlexBetween
                sx={{
                    mb: "1rem",
                }}
            >
                <Box
                    sx={{
                        mb: "1rem",
                        flexGrow: "1",
                    }}
                >
                    <Typography variant="h3">{courseType}</Typography>
                </Box>
                {user && (
                    <Box sx={{}}>
                        {/* <TabContext value={courseType}> */}
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                value={courseType}
                                sx={{
                                    "& .MuiTabs-indicator": {
                                        backgroundColor: (theme) =>
                                            theme.palette.text.primary,
                                    },
                                }}
                            >
                                <Tab
                                    sx={{
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        textTransform: "capitalize",
                                        color: (theme) =>
                                            theme.palette.grey.grey400,
                                        "&.Mui-selected": {
                                            color: (theme) =>
                                                theme.palette.text.primary,
                                        },
                                    }}
                                    label="My Courses"
                                    value="My Courses"
                                />
                                <Tab
                                    sx={{
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        textTransform: "capitalize",
                                        color: (theme) =>
                                            theme.palette.grey.grey400,
                                        "&.Mui-selected": {
                                            color: (theme) =>
                                                theme.palette.text.primary,
                                        },
                                    }}
                                    label="I am Learning"
                                    value="I am Learning"
                                />
                                <Tab
                                    sx={{
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        textTransform: "capitalize",
                                        color: (theme) =>
                                            theme.palette.grey.grey400,
                                        "&.Mui-selected": {
                                            color: (theme) =>
                                                theme.palette.text.primary,
                                        },
                                    }}
                                    label="Popular Courses"
                                    value="Popular Courses"
                                />
                            </Tabs>
                        </Box>
                        {/* <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel> */}
                        {/* </TabContext> */}
                    </Box>
                )}
            </FlexBetween>
            <Box
                sx={{
                    p: "2rem",
                    backgroundColor: "white",
                    borderRadius: "0.25rem",
                    width: "100%",
                    height: "600px",
                }}
            >
                <Box
                    sx={{
                        mb: "2rem",
                    }}
                >
                    <CustomSlider
                        items={categoriesWithCourse}
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
                            height: "100%",
                            scrollBehavior: "smooth",
                        }}
                    >
                        {selectedCourses.map((course) => {
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
                        {selectedCourses.length === 0 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    width: "100%",
                                    //border: "1px solid rgba(0, 0, 0, 0.23)",
                                }}
                            >
                                {selectedItem === "" ? (
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "3rem",
                                        mt: "4rem",
                                        alignItems: "center",
                                        height: "100%",
                                        // width: "100%",
                                        // border: "1px solid rgba(0, 0, 0, 0.23)",
                                    }}>
                                        <Typography variant="h3">
                                            No courses found
                                        </Typography>
                                        <img
                                            src="/images/not_found_1.svg"
                                            style={{
                                                // height: "30%",
                                                maxHeight: "250px",
                                                width: "auto",
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <Typography variant="h4">
                                        No courses found on{" "}
                                        <b>{selectedItem}</b>
                                    </Typography>
                                )}
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
                            }}
                        >
                            <Typography
                                sx={{
                                    borderRadius: "0.25rem",
                                    border: "1px solid rgba(0, 0, 0, 0.23)",
                                    fontSize: "1rem",
                                    px: "0.5rem",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: (theme) =>
                                            theme.palette.grey.grey100,
                                    },
                                }}
                            >
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
