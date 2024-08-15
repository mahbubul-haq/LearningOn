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
  const [selectedItem, setSelectedItem] = React.useState("All");
  const {
    courses,
    getCourses,
    setLoading,
    selectedCourses,
    setSelectedCourses,
    filteredCourses,
    setFilteredCourses,
  } = useContext(HomePageContext);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let coursesContainer = document.querySelector(".courses-container");
    if (coursesContainer) coursesContainer.scrollLeft = 0;
  }, [courseType, selectedItem]);

  useEffect(() => {
    if (!user) {
      setCourseType("Popular Courses");
    }
  }, [user]);

  // useEffect(() => {
  //   if (listOfCategories.length > 0) {
  //     setSelectedItem(listOfCategories[0]);
  //   } else {
  //     setSelectedItem("");
  //   }
  // }, [listOfCategories]);

  useEffect(() => {
    setLoading(true);
    getCourses();
    if (!listOfCategories || listOfCategories.length === 0) {
      ///console.log("calling for categories from home");
      getCategories();
    }
  }, []);

  useEffect(() => {
    ///console.log("chaning course type");
    changeCourseType();
  }, [courses]);

  // useEffect(() => {
  //   ///console.log("cat with couse", categoriesWithCourse);
  //   if (categoriesWithCourse.length > 0) {
  //     setSelectedItem(categoriesWithCourse[0]);
  //   } else {
  //     setSelectedItem("");
  //   }
  // }, [categoriesWithCourse]);

  useEffect(() => {
    //console.log(filteredCourses, listOfCategories);
    //setSelectedItem("All");

    if (courseType == "Popular Courses" && selectedItem != "All") return;

    if (filteredCourses.length > 0 && listOfCategories.length > 0) {
      const categoriesWithCourse = listOfCategories.filter((category) => {
        return filteredCourses.reduce((cur, course) => {
          return cur || course?.category === category;
        }, false);
      });
      setCategoriesWithCourse(["All", ...categoriesWithCourse]);
    } else {
      setCategoriesWithCourse([]);
    }
  }, [filteredCourses, listOfCategories]);

  useEffect(() => {
    //console.log(selectedItem, courses);
    if (selectedItem == "All" || courseType === "Popular Courses")
      setSelectedCourses(filteredCourses);
    else if (selectedItem) {
      const curfilteredCourses = filteredCourses.filter((course) => {
        return course?.category === selectedItem;
      });
      setSelectedCourses(curfilteredCourses);
    }
  }, [selectedItem, filteredCourses]);

  const changeCourseType = () => {
    if (courseType === "My Courses") {
      setFilteredCourses(user?.courses);
    } else if (courseType === "I am Learning") {
      setFilteredCourses(user?.learning?.map((course) => course.course));
    } else if (courseType === "Popular Courses") {
      setFilteredCourses(courses);
    }
  };

  useEffect(() => {
    setSelectedItem("All");
    changeCourseType();
    if (courseType === "Popular Courses") {
      setLoading(true);
      getCourses("all");
    }
  }, [courseType]);

  useEffect(() => {
    if (courseType == "Popular Courses") {
      setLoading(true);
      getCourses(selectedItem == "All" ? "all" : selectedItem);
    }
  }, [selectedItem]);

  const handleScroll = (direction, scrollValue) => {
    const container = document.querySelector(".courses-container");
    const scrollStep = scrollValue
      ? scrollValue
      : isNonMobileScreens
      ? 400
      : 200;

    //console.log(container.scrollLeft);

    if (direction === "left") {
      container.scrollLeft -= scrollStep;
    } else {
      container.scrollLeft += scrollStep;
    }

    // console.log(container.scrollLeft, container.scrollWidth - container.clientWidth);

    if (
      !(selectedCourses?.length > 0) ||
      (container.scrollLeft === 0 && direction != "right")
    ) {
      document.querySelector(".left-arrow").style.display = "none";
    } else {
      document.querySelector(".left-arrow").style.display = "flex";
    }

    if (
      !(selectedCourses?.length > 0) ||
      (container.scrollLeft + 1 >=
        container.scrollWidth - container.clientWidth &&
        direction != "left")
    ) {
      document.querySelector(".right-arrow").style.display = "none";
    } else {
      document.querySelector(".right-arrow").style.display = "flex";
    }
  };

  useEffect(() => {
    const container = document.querySelector(".courses-container");
    if (container) {
      if (!(selectedCourses?.length > 0) || container.scrollLeft === 0) {
        document.querySelector(".left-arrow").style.display = "none";
      } else {
        document.querySelector(".left-arrow").style.display = "flex";
      }

      if (
        !(selectedCourses?.length > 0) ||
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
            height: isNonMobileScreens ? "580px" : "520px",
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
