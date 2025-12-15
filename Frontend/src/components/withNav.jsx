import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CourseExplorer from "./courseExplorer";
import Navbar from "./navbar";

const WithNav = ({ component, showNav }) => {
  const [basePath, setBasePath] = useState("/");

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
    </Box>
  );
};

export default WithNav;
