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
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import StyledTextField1 from "../../components/StyledInputField1";

const CoursesView = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const [courseType, setCourseType] = React.useState("Popular Courses");
    const { categories, listOfCategories, getCategories} = useContext(GlobalContext);
    const [categoriesWithCourse, setCategoriesWithCourse] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState("");
    const { courses, getCourses } = useContext(HomePageContext);
    const [filteredCourses, setFilteredCourses] = React.useState([]);
    const [selectedCourses, setSelectedCourses] = React.useState([]);
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!user) {
            setCourseType("Popular Courses");
        }
    }, [user]);

    useEffect(() => {
        if (listOfCategories.length > 0) {
            setSelectedItem(listOfCategories[0]);
        } else {
            setSelectedItem("");
        }
    }, [listOfCategories]);

    useEffect(() => {
        getCourses();
        if (!listOfCategories || listOfCategories.length === 0) {
            getCategories();
        }
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
        //console.log(filteredCourses, listOfCategories);
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
                //console.log(course.owner._id, user._id);
                if (course.courseStatus == "draft") return;
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
            const curFilteredCourses = [];
            courses?.forEach((course) => {
                if (course.courseStatus == "draft") return;
                curFilteredCourses.push(course);
            });

            setFilteredCourses(curFilteredCourses);
        }
    };

    useEffect(() => {
        changeCourseType();
    }, [courseType]);

    // ueEffect(() => {

    // });

    const handleScroll = (direction) => {
        const container = document.querySelector(".courses-container");
        const scrollStep = isNonMobileScreens ? 400 : 200;

        //console.log(container.scrollLeft);

        if (direction === "left") {
            container.scrollLeft -= scrollStep;
        } else {
            container.scrollLeft += scrollStep;
        }

       // console.log(container.scrollLeft, container.scrollWidth - container.clientWidth);

        setTimeout(() => {
            if (container.scrollLeft === 0) {
                document.querySelector(".left-arrow").style.display = "none";
            } else {
                document.querySelector(".left-arrow").style.display = "flex";
            }

            if (container.scrollLeft + 1 >= container.scrollWidth - container.clientWidth) {
                document.querySelector(".right-arrow").style.display = "none";
            } else {
                document.querySelector(".right-arrow").style.display = "flex";
            }
        }, 100);
    };

    useEffect(() => {
        const container = document.querySelector(".courses-container");
        if (container) {
            if (container.scrollLeft === 0) {
                document.querySelector(".left-arrow").style.display = "none";
            } else {
                document.querySelector(".left-arrow").style.display = "flex";
            }

            if (container.scrollLeft + 1 >= container.scrollWidth - container.clientWidth) {
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
                    width: "100%",
                    "&&": {
                        flexDirection: isNonMobileScreens ? "row" : "column",
                    },
                }}
            >
                <Box
                    sx={{
                        mb: "1rem",
                        flexGrow: "1",
                        textAlign: isNonMobileScreens ? "left" : "center",
                    }}
                >
                    <Typography variant="h3">{courseType}</Typography>
                </Box>
                {/* <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "relative",
                        flexGrow: "1",
                    }}
                ></Box> */}

                {user && !isMobileScreens && (
                    <Box sx={{ borderBottom: 1, borderColor: "divider", overflow: "auto" }}>
                        <Tabs
                            orientation="horizontal"
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                            value={courseType}
                            sx={{
                                "& .MuiTabs-indicator": {
                                    backgroundColor: (theme) => theme.palette.text.primary,
                                },
                            }}
                        >
                            <Tab
                                sx={{
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    textTransform: "capitalize",
                                    color: (theme) => theme.palette.grey.grey400,
                                    "&.Mui-selected": {
                                        color: (theme) => theme.palette.text.primary,
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
                                    color: (theme) => theme.palette.grey.grey400,
                                    "&.Mui-selected": {
                                        color: (theme) => theme.palette.text.primary,
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
                                    color: (theme) => theme.palette.grey.grey400,
                                    "&.Mui-selected": {
                                        color: (theme) => theme.palette.text.primary,
                                    },
                                }}
                                label="Popular Courses"
                                value="Popular Courses"
                            />
                        </Tabs>
                    </Box>
                )}
                {user && isMobileScreens && (
                    <Box
                        sx={{
                            width: "100%",
                            my: "1rem",
                            mb: "0",
                            // border: "1px solid rgba(0, 0, 0, 0.23)",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Autocomplete
                            disablePortal
                            onChange={(event, value) => {
                                if (value) {
                                    setCourseType(value.value);
                                }
                            }}
                            value={courseType}
                            id="category"
                            options={[{ label: "My Courses", value: "My Courses" }, { label: "I am Learning", value: "I am Learning" }, { label: "Popular Courses", value: "Popular Courses" }]}
                            sx={{
                                maxWidth: "300px",
                                width: "100%",
                            }}
                            renderInput={(params) => (
                                <StyledTextField1
                                    placeholder={courseType}
                                    {...params}
                                    size="small"
                                    // change font size of input
                                    sx={{
                                        p: 0,
                                        "& .MuiInputBase-input": {
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                        },

                                        "&&": {
                                            "& .MuiInputBase-root": {
                                                color: (theme) => theme.palette.grey.grey600,
                                            },
                                        },
                                        //enforce color of input
                                    }}
                                />
                            )}
                        />
                    </Box>
                )}
            </FlexBetween>
            <Box
                sx={{
                    p: isNonMobileScreens ? "2rem" : "0",
                    backgroundColor: isNonMobileScreens ? "white" : "transparent",
                    borderRadius: "0.25rem",
                    width: "100%",
                    height: "600px",
                }}
            >
                {isNonMobileScreens && (
                    <Box
                        sx={{
                            mb: "2rem",
                        }}
                    >
                        <CustomSlider items={categoriesWithCourse} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                    </Box>
                )}
                <Box
                    sx={{
                        position: "relative",

                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        <Box
                            className="right-arrow"
                            sx={{
                                position: "absolute",
                                right: isNonMobileScreens ? "0" : "-25px",
                                top: isNonMobileScreens ? "0" : "50%",
                                transform: isNonMobileScreens ? "none" : "translateY(-50%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(0, 0, 0,0.7)",
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
                            className="left-arrow"
                            sx={{
                                position: "absolute",
                                left: isNonMobileScreens ? "0" : "-25px",
                                // top: "0",
                                // bottom: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(0, 0, 0,0.7)",
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
                            className="courses-container"
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
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "3rem",
                                                mt: isNonMobileScreens ? "4rem" : "2rem",
                                                alignItems: "center",
                                                height: "100%",
                                                // width: "100%",
                                                // border: "1px solid rgba(0, 0, 0, 0.23)",
                                            }}
                                        >
                                            <Typography 
                                            variant= {isNonMobileScreens ? "h3" : "h4"}
                                            >No courses found</Typography>
                                            <img
                                                src="/images/not_found_1.svg"
                                                style={{
                                                    // height: "30%",
                                                    maxHeight: isNonMobileScreens ? "250px" : "150px",
                                                    width: "auto",
                                                }}
                                            />
                                        </Box>
                                    ) : (
                                        <Typography variant="h4">
                                            No courses found on <b>{selectedItem}</b>
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {!isNonMobileScreens && categoriesWithCourse.length > 0 && (
                        <Box
                            sx={{
                                width: "100%",
                                my: "1rem",
                                // border: "1px solid rgba(0, 0, 0, 0.23)",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Autocomplete
                                disablePortal
                                onChange={(event, value) => {
                                    if (value) setSelectedItem(value);
                                }}
                                value={selectedItem ? selectedItem : { label: "Choose a category", value: "Choose a category" }}
                                id="category"
                                options={categoriesWithCourse.length > 0 ? categoriesWithCourse : []}
                                sx={{
                                    maxWidth: "300px",
                                    width: "100%",
                                }}
                                renderInput={(params) => (
                                    <StyledTextField1
                                        placeholder={selectedItem ? selectedItem : "Choose a category"}
                                        {...params}
                                        size="small"
                                        // change font size of input
                                        sx={{
                                            p: 0,
                                            "& .MuiInputBase-input": {
                                                fontSize: "1rem",
                                                fontWeight: "600",
                                            },

                                            "&&": {
                                                "& .MuiInputBase-root": {
                                                    color: (theme) => theme.palette.grey.grey600,
                                                },
                                            },
                                            //enforce color of input
                                        }}
                                    />
                                )}
                            />
                        </Box>
                    )}

                    {selectedCourses.length > 5 && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                mt: isNonMobileScreens ? "2rem" : "1rem",
                                textAlign: "center"
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
                                        backgroundColor: (theme) => theme.palette.grey.grey100,
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
