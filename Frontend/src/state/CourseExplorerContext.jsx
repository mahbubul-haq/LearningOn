import { createContext, useState, useEffect, useCallback } from "react";

export const CourseExplorerContext = createContext();

export const CourseExplorerState = (props) => {
  const [showCourseExplorer, setShowCourseExplorer] = useState(false);
  const [showLeftHover, setShowLeftHover] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const disableScroll1 = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    let navCourse = document.querySelector(".nav-course");
    let courseExplorer = document.querySelector(".course-explorer");
    let appContainer = document.querySelector(".app-container");
    let timeoutId;
    if (showCourseExplorer) {
      if (navCourse) navCourse.style.height = "100%";
      if (appContainer) appContainer.style.overflow = "hidden";
      if (courseExplorer) {
        courseExplorer.style.height = "calc(100vh - 5rem)";
        courseExplorer.addEventListener("scroll", disableScroll1);
        courseExplorer.addEventListener("wheel", disableScroll1);
        courseExplorer.addEventListener("touchmove", disableScroll1);
      }
    } else {
      if (navCourse) navCourse.style.height = "auto";
      if (courseExplorer) {
        courseExplorer.style.height = 0;
        courseExplorer.removeEventListener("scroll", disableScroll1);
        courseExplorer.removeEventListener("wheel", disableScroll1);
        courseExplorer.removeEventListener("touchmove", disableScroll1);
      }
      if (appContainer) {
        timeoutId = setTimeout(() => {
          appContainer.style.overflow = "auto";
        }, 300);
      }
    }

    return () => {
        if (timeoutId) clearTimeout(timeoutId);
    }

  }, [showCourseExplorer]);

  return (
    <CourseExplorerContext.Provider
      value={{
        showCourseExplorer,
        setShowCourseExplorer,
        showLeftHover,
        setShowLeftHover,
        categoryIndex,
        setCategoryIndex
      }}
    >
      {props.children}
    </CourseExplorerContext.Provider>
  );
};
