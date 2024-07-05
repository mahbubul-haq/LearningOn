import CourseExplorer from "./courseExplorer";
import Navbar from "./navbar";
import Box from "@mui/material/Box";

const WithNav = ({ component, showNav }) => {
    return (
        <Box className="app-container"
            sx={{
                height: "100%",
                overflow: "auto",
            }}
        >
            <CourseExplorer />
            {showNav && <Navbar />}
            {component}
        </Box>
    );
};

export default WithNav;
