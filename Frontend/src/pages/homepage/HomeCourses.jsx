import { Box, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomSlider from "../../components/CustomSlider";
import { GlobalContext } from "../../state/GlobalContext";
import { HomePageContext } from "../../state/HomePageState";
import CoursesBottom from "./CoursesBottom";
import CoursesContent from "./CoursesContent";
import CoursesTop from "./CoursesTop";

const HomeCourses = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [courseType, setCourseType] = React.useState("Popular Courses");
  const { listOfCategories, getCategories } = useContext(GlobalContext);
  const [categoriesWithCourse, setCategoriesWithCourse] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState("");
  const { courses, getCourses } = useContext(HomePageContext);
  const [filteredCourses, setFilteredCourses] = React.useState([]);
  const [selectedCourses, setSelectedCourses] = React.useState([]);

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
      console.log("calling for categories from home");
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

      if (
        container.scrollLeft + 1 >=
        container.scrollWidth - container.clientWidth
      ) {
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

      if (
        container.scrollLeft + 1 >=
        container.scrollWidth - container.clientWidth
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

        width: "100%",
      }}
    >
      <Box
        sx={{
          maxWidth: "2000px",
          padding: isNonMobileScreens ? "3rem 64px" : "2rem 24px",
          mx: "auto",
        }}
      >
        <CoursesTop
          courseType={courseType}
          setCourseType={setCourseType}
          handleChange={handleChange}
        />
        <Box
          sx={{
            p: isNonMobileScreens ? "2rem" : "0",
            backgroundColor: isNonMobileScreens ? "white" : "transparent",
            borderRadius: "0.25rem",
            width: "100%",
            height: isNonMobileScreens ? "580px" : "auto",
          }}
        >
          <Box
            sx={{
              mb: "2rem",
            }}
          >
            <CustomSlider
              // items={categoriesWithCourse}
              items={React.useMemo(() => ["one", "random", "Data Structures", "Web Development", "Python", "Digital Marketing", "Health & Fitness",  "Web Development", "Python", "Digital Marketing", "Health & Fitness"], [])}
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
            <CoursesContent
              handleScroll={handleScroll}
              selectedItem={selectedItem}
              selectedCourses={selectedCourses}
            />

            <CoursesBottom
              categoriesWithCourse={categoriesWithCourse}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              selectedCourses={selectedCourses}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeCourses;
