import { createContext, useState, useEffect, useCallback } from "react";

export const CourseExplorerContext = createContext();

export const CourseExplorerState = (props) => {
  const [showCourseExplorer, setShowCourseExplorer] = useState(false);
  const [showLeftHover, setShowLeftHover] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [closeBtnClicked, setCloseBtnClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [closeLeftHover, setCloseLeftHover] = useState(false);

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
          explorerLeftHover.style.overflow = "auto";
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
      if (explorerLeftHover) explorerLeftHover.style.overflow = "hidden";
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
    let explorerRightContainer = document.querySelector(
      ".explorer-right-container"
    );
    if (explorerRightContainer) explorerRightContainer.scrollTo(0, 0);
  }, [selectedCategory, selectedSubCategory]);

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
      }}
    >
      {props.children}
    </CourseExplorerContext.Provider>
  );
};
