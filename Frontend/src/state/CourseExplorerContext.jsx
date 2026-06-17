import { createContext, useCallback, useEffect, useRef, useState, useContext } from "react";
import { colorTokens } from "../theme";
import { useSelector } from "react-redux";
import { GlobalContext } from "./GlobalContext";
import { apiFetch } from "../api/apiFetch";
export const CourseExplorerContext = createContext();

export const CourseExplorerState = (props) => {
  const [showCourseExplorer, setShowCourseExplorer] = useState(false);
  const [showLeftHover, setShowLeftHover] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [closeBtnClicked, setCloseBtnClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [closeLeftHover, setCloseLeftHover] = useState(false);
  const [coursePageOpened, setCoursePageOpened] = useState(false);
  const courseExplorerRef = useRef(null);
  const [initialRender, setInitialRender] = useState(true);
  const coursePerPage = 12;

  const { categories } = useContext(GlobalContext);


  /**
   * 
   * @param {string} category - it can be a category or a subcategory
   */
  const changeCategory = (category) => {
    if (category == "" && selectedCategory != "") {
      setSelectedCategory("");
      setSelectedSubCategory("");
      return;
    }

    if (categories) {
      let isCategory = categories.find((cat) => cat.name == category);
      if (isCategory) {
        setSelectedCategory(category);
        setSelectedSubCategory("");
      } else {

        for (let cat of categories) {
          let isSubCategory = cat.subcategories.find((subcat) => subcat == category);

          if (isSubCategory) {
            //console.log("found subcategory", category);
            setSelectedCategory(cat.name);
            setSelectedSubCategory(category);
            break;
          }
        }

      }
    }
  }


  const { token } = useSelector((state) => state.auth);

  const disableScroll1 = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const openCourseExplorer = (btnClose) => {
    clearTimeout(courseExplorerRef.current);
    if (btnClose) setCloseBtnClicked(false);
    courseExplorerRef.current = setTimeout(() => {
      setShowCourseExplorer(true);

    }, 200);
  };

  const closeCourseExplorer = (btnClick) => {
    clearTimeout(courseExplorerRef.current);
    if (btnClick) {
      setCloseBtnClicked(true);
    }
    courseExplorerRef.current = setTimeout(() => {
      setShowCourseExplorer(false);
    }, 200);
  };

  useEffect(() => {
    let navCourse = document.querySelector(".nav-course");
    let courseExplorer = document.querySelector(".course-explorer");
    let appContainer = document.querySelector(".app-container");
    let explorerLeft = document.querySelector(".explorer-left");
    let explorerLeftHover = document.querySelector(".explorer-left-hover");
    let withNavComponentContainer = document.querySelector(".with-nav-component-container");

    let timeoutId, timeoutId1, timeoutId2, timeoutIdWNCC;
    if (showCourseExplorer && !closeBtnClicked) {
      console.log("opening course explorer");
      if (navCourse) navCourse.style.height = "100%";
      // if (appContainer) appContainer.style.overflow = "hidden";
      if (appContainer) {
        appContainer.style.scrollbarColor = `transparent ${colorTokens.white.nearWhite}`;

      }
      if (explorerLeft) {
        timeoutId1 = setTimeout(() => {
          explorerLeft.style.overflow = "auto";
        }, 500);
      }
      if (explorerLeftHover) {
        // timeoutId2 = setTimeout(() => {
        //   explorerLeftHover.style.overflowY = "auto";
        // }, 500);
      }
      if (courseExplorer) {
        if (withNavComponentContainer) {
          withNavComponentContainer.style.opacity = 0.5;
        }

        courseExplorer.style.height = "calc(100vh - 7rem)";
        courseExplorer.addEventListener("scroll", disableScroll1);
        courseExplorer.addEventListener("wheel", disableScroll1);
        courseExplorer.addEventListener("touchmove", disableScroll1);
      }
    } else {
      if (navCourse) navCourse.style.height = "auto";
      if (explorerLeft) {
        if (timeoutId1) clearTimeout(timeoutId1);
        explorerLeft.style.overflow = "hidden";
      }
      if (explorerLeftHover) {
        if (timeoutId2) clearTimeout(timeoutId2);
        // explorerLeftHover.style.overflowY = "hidden";
      }
      if (courseExplorer) {
        if (withNavComponentContainer) {

          withNavComponentContainer.style.opacity = 1;
        }
        courseExplorer.style.height = 0;
        courseExplorer.removeEventListener("scroll", disableScroll1);
        courseExplorer.removeEventListener("wheel", disableScroll1);
        courseExplorer.removeEventListener("touchmove", disableScroll1);
      }
      // if (appContainer) {
      //   timeoutId = setTimeout(() => {
      //     appContainer.style.overflow = "auto";
      //   }, 400);
      // }
      if (appContainer) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          appContainer.style.scrollbarColor = `${colorTokens.grey[400]} ${colorTokens.white.nearWhite}`;
        }, 200);
      }
    }

    console.log("show course explorer", showCourseExplorer, closeBtnClicked);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (timeoutId1) clearTimeout(timeoutId1);
      if (timeoutId2) clearTimeout(timeoutId2);
    };


  }, [showCourseExplorer, closeBtnClicked]);



  useEffect(() => {
    let explorerRightContainer = document.querySelector(
      ".explorer-right-container"
    );

    if (explorerRightContainer) explorerRightContainer.scrollTo(0, 0);
  }, [selectedCategory, selectedSubCategory]);

  /**
   * Fetches filtered courses based on the selected category/subcategory/pagenumber
   *
   * @param {boolean} changed - true ->  category changed -> new fetch, false: pagination
   */

  const getFilteredCourses = async ({ page = 1, coursePerPage = 15, category = null }) => {

    // try {
    const data = await apiFetch({
      url: `/api/v1/courses`,
      method: "GET",
      params: {
        page,
        coursePerPage,
        category,
      },
    });

    if (data.success) {
      if (page * coursePerPage < data.totalDocuments) {
        return { ...data, nextPage: page + 1 }
      }
      return { ...data, nextPage: null }
    }

    throw new Error("Failed to fetch filtered courses");
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
        coursePerPage,
        coursePageOpened,
        setCoursePageOpened,
        openCourseExplorer,
        closeCourseExplorer,
        getFilteredCourses,
        changeCategory,
        initialRender,
      }}
    >
      {props.children}
    </CourseExplorerContext.Provider>
  );
};
