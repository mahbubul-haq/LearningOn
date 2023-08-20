import LandingView from "./LandingView";
import Navbar from "../../components/Navbar.jsx";
import CoursesView from "./CoursesView";
import CourseWidget from "../../widgets/CourseWidget";
import Box from "@mui/material/Box";


const HomePage = () => {

    return (
        <>
        <Box sx={{
            overflow: "auto",
            height: "calc(100% - 5rem)",
            marginTop: "5rem",
        }}>

            <Navbar />
            <LandingView />
            <CoursesView />
        </Box>
            
        </>
    );
};

export default HomePage;
