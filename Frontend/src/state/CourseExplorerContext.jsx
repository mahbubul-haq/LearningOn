import { createContext, useCallback, useEffect, useRef, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { GlobalContext } from "./GlobalContext";
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
  const courseExplorerRef = useRef(null);
  const categoryChangedRef = useRef(false);
  const [courseLoadingError, setCourseLoadingError] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const coursePerPage = 12;

  const { categories } = useContext(GlobalContext);


  /**
   * 
   * @param {string} category - it can be a category or a subcategory
   */
  const changeCategory = (category) => {
    if (category == "" && selectedCategory != "") {
      categoryChangedRef.current = true;
      setCategoryChanged(true);
      setSelectedCategory("");
      setSelectedSubCategory("");
      return;
    }

    if (categories) {
      let isCategory = categories.find((cat) => cat.name == category);
      if (isCategory) {
        categoryChangedRef.current = true;
        setCategoryChanged(true);
        setSelectedCategory(category);
        setSelectedSubCategory("");
      } else {

        for (let cat of categories) {
          let isSubCategory = cat.subcategories.find((subcat) => subcat == category);

          if (isSubCategory) {
            //console.log("found subcategory", category);
            categoryChangedRef.current = true;
            setCategoryChanged(true);
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
        appContainer.style.scrollbarColor = "transparent #fcfcfc";

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
          if (timeoutIdWNCC) clearTimeout(timeoutIdWNCC);
          timeoutIdWNCC = setTimeout(() => {
            withNavComponentContainer.style.opacity = 0.5;
          }, 300);
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
          if (timeoutIdWNCC) clearTimeout(timeoutIdWNCC);
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
          appContainer.style.scrollbarColor = "#8b8b8b #fcfcfc";
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
    categoryChangedRef.current = categoryChanged;
    let courseExplorerRightBottom = document.querySelectorAll(
      ".course-explorer-right-bottom"
    );

    if (categoryChangedRef.current) {
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
    

    console.log(filteredCourses);
    console.log("setting loading false");

    setLoading(false)
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

  /**
   * Fetches filtered courses based on the selected category/subcategory/pagenumber
   *
   * @param {boolean} changed - true ->  category changed -> new fetch, false: pagination
   */

  const getFilteredCourses = async (changed) => {
    const encodedCategory = encodeURIComponent(// to handle spaces in query parameters
      selectedSubCategory ? selectedSubCategory : selectedCategory
    );

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 10000); // 10 seconds timeout

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/course/getfiltered?page=${changed ? 1 : pageNumber
        }&coursePerPage=${coursePerPage}&category=${encodedCategory}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      let data = await res.json();
      if (data.success) {
        console.log("explorer courses success");
        if (changed) {
          setFilteredCourses(data.courses);
        } else {
          // use functional update to avoid stale closure
          setFilteredCourses((prev) => [...prev, ...data.courses]);
        }
        if (data.totalDocuments != totalDocuments) setTotalDocuments(data.totalDocuments);
        // we've finished fetching and updated courses — clear loading immediately
        setLoading(false);
      }
      else {
        console.log("explorer courses error");
        setCourseLoadingError(true);
        setTotalDocuments(0);
        setFilteredCourses([]);
        setLoading(false);
      }

      categoryChangedRef.current = false;
      setCategoryChanged(false);
      setInitialRender(false);
      //setLoading(false);
    } catch (err) {
      setCourseLoadingError(true);
      setTotalDocuments(0);
      setFilteredCourses([]);
      setLoading(false);
      if (err.name === "AbortError") {
        // timeout
      }
      console.log("explorer courses fetch error");
      categoryChangedRef.current = false;
      setCategoryChanged(false);
      setInitialRender(false);
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
        openCourseExplorer,
        closeCourseExplorer,
        getFilteredCourses,
        categoryChanged,
        categoryChangedRef,
        setCategoryChanged,
        courseLoadingError,
        setCourseLoadingError,
        changeCategory,
        initialRender,
      }}
    >
      {props.children}
    </CourseExplorerContext.Provider>
  );
};
