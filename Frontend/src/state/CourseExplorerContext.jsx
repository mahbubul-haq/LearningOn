import { createContext, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const CourseExplorerContext = createContext();

export const CourseExplorerState = (props) => {
  const [showCourseExplorer, setShowCourseExplorer] = useState(false);
  const [showLeftHover, setShowLeftHover] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [closeBtnClicked, setCloseBtnClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [closeLeftHover, setCloseLeftHover] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categoryChanged, setCategoryChanged] = useState(false);
  const [coursePageOpened, setCoursePageOpened] = useState(false);

  const coursePerPage = 12;

  const { token } = useSelector((state) => state.auth);

  const disableScroll1 = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    let navCourse = document.querySelector(".nav-course");
    let courseExplorer = document.querySelector(".course-explorer");
    let appContainer = document.querySelector(".app-container");
    let explorerLeft = document.querySelector(".explorer-left");
    let explorerLeftHover = document.querySelector(".explorer-left-hover");

    let timeoutId, timeoutId1, timeoutId2;
    if (showCourseExplorer && !closeBtnClicked) {
      if (navCourse) navCourse.style.height = "100%";
      if (appContainer) appContainer.style.overflow = "hidden";
      if (explorerLeft) {
        timeoutId1 = setTimeout(() => {
          explorerLeft.style.overflow = "auto";
        }, 300);
      }
      if (explorerLeftHover) {
        timeoutId2 = setTimeout(() => {
          explorerLeftHover.style.overflowY = "auto";
        }, 300);
      }
      if (courseExplorer) {
        courseExplorer.style.height = "calc(100vh - 5rem)";
        courseExplorer.addEventListener("scroll", disableScroll1);
        courseExplorer.addEventListener("wheel", disableScroll1);
        courseExplorer.addEventListener("touchmove", disableScroll1);
      }
    } else {
      if (navCourse) navCourse.style.height = "auto";
      if (explorerLeft) explorerLeft.style.overflow = "hidden";
      if (explorerLeftHover) explorerLeftHover.style.overflowY = "hidden";
      if (courseExplorer) {
        courseExplorer.style.height = 0;
        courseExplorer.removeEventListener("scroll", disableScroll1);
        courseExplorer.removeEventListener("wheel", disableScroll1);
        courseExplorer.removeEventListener("touchmove", disableScroll1);
      }
      if (appContainer) {
        timeoutId = setTimeout(() => {
          appContainer.style.overflow = "auto";
        }, 400);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (timeoutId1) clearTimeout(timeoutId1);
      if (timeoutId2) clearTimeout(timeoutId2);
    };
  }, [showCourseExplorer]);

  useEffect(() => {
    let courseExplorerRightBottom = document.querySelectorAll(
      ".course-explorer-right-bottom"
    );

    if (categoryChanged) {
      if (courseExplorerRightBottom) {
        courseExplorerRightBottom.forEach((element) => {
          element.style.opacity = 0.5;
        });
      }
    } else if (courseExplorerRightBottom) {
      courseExplorerRightBottom.forEach((element) => {
        element.style.opacity = 1;
      });
    }
  }, [categoryChanged]);

  useEffect(() => {
    let explorerRightContainer = document.querySelector(
      ".explorer-right-container"
    );

    if (explorerRightContainer) explorerRightContainer.scrollTo(0, 0);
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    //console.log("Calling for filtered courss");
    setPageNumber(1);
    getFilteredCourses(true);
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    console.log("page number", pageNumber);
    if (pageNumber > 1) {
      getFilteredCourses(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    setLoading(false);
    console.log(filteredCourses);
  }, [filteredCourses]);

  useEffect(() => {
    if (loading) setPageNumber((pageNumber) => pageNumber + 1);
  }, [loading]);

  useEffect(() => {
    const handleScroll = (e) => {
      let explorerRightContainer = e.target;

      // console.log(
      //   explorerRightContainer.scrollTop,
      //   explorerRightContainer.clientHeight,
      //   explorerRightContainer.scrollHeight
      // );

      if (
        explorerRightContainer.scrollTop +
          explorerRightContainer.clientHeight +
          5 >=
        explorerRightContainer.scrollHeight
      ) {
        if (!loading && filteredCourses.length < totalDocuments) {
          setLoading(true);
        }
      }
    };

    let explorerRightContainer = document.querySelector(
      ".explorer-right-container"
    );

    let appContainer = document.querySelector(".app-container");

    if (appContainer && coursePageOpened)
      appContainer.addEventListener("scroll", handleScroll);

    if (explorerRightContainer)
      explorerRightContainer.addEventListener("scroll", handleScroll);

    return () => {
      if (explorerRightContainer)
        explorerRightContainer.removeEventListener("scroll", handleScroll);
      if (appContainer)
        appContainer.removeEventListener("scroll", handleScroll);
    };
  });

  const getFilteredCourses = async (changed) => {
    const encodedCategory = encodeURIComponent(
      selectedSubCategory ? selectedSubCategory : selectedCategory
    );

    if (changed) setCategoryChanged(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/course/getfiltered?page=${
          changed ? 1 : pageNumber
        }&coursePerPage=${coursePerPage}&category=${encodedCategory}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      let data = await res.json();
      if (data.success) {
        if (changed) setFilteredCourses(data.courses);
        else setFilteredCourses([...filteredCourses, ...data.courses]);
        setTotalDocuments(data.totalDocuments);
      }

      setCategoryChanged(false);
      //setLoading(false);
    } catch (err) {
      ///
      //setLoading(false);
      setCategoryChanged(false);
    }
  };

  return (
    <CourseExplorerContext.Provider
      value={{
        showCourseExplorer,
        setShowCourseExplorer,
        showLeftHover,
        setShowLeftHover,
        categoryIndex,
        setCategoryIndex,
        closeBtnClicked,
        setCloseBtnClicked,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        closeLeftHover,
        setCloseLeftHover,
        filteredCourses,
        totalDocuments,
        loading,
        setLoading,
        coursePerPage,
        coursePageOpened,
        setCoursePageOpened,
      }}
    >
      {props.children}
    </CourseExplorerContext.Provider>
  );
};
