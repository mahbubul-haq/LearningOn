import Box from "@mui/material/Box";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import CourseExplorer from "./courseExplorer";
import Navbar from "./navbar";
import ToTopButton from "./ToTopButton";
import { GlobalContext } from "../state/GlobalContext";

const WithNav = ({ component, showNav }) => {
  const [basePath, setBasePath] = useState("/");
  const {openedItem} = useContext(GlobalContext);

  const location = useLocation();

  useEffect(() => {
    setBasePath(location?.pathname?.split("/")[1]);
  }, [location.pathname]);

  useEffect(() => {
    let appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.scrollTo(0, 0);
  }, [basePath]);

  return (
    <Box
      className="app-container"
      sx={{
        height: "100%",
        overflow: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <CourseExplorer />
      {showNav && <Navbar />}
      <Box
        className="with-nav-component-container"
        sx={{
          width: "100%",
          transition: "opacity 0.3s ease-in-out",
        }}>

        {component}
      </Box>
      {openedItem == "courses" && <ToTopButton />}
    </Box>
  );
};

export default WithNav;
