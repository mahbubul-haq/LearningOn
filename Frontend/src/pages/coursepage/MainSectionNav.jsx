import Box from "@mui/material/Box"
import useTheme from "@mui/material/styles/useTheme"
import useMediaQuery from "@mui/material/useMediaQuery"
import FlexBetween from "../../components/FlexBetween"


const MainSectionNav = () => {

    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const isMobileScreens = useMediaQuery("(max-width:600px)");

    return (
        <FlexBetween
            sx={{
                py: isNonMobileScreens ? "0.7rem" : "0.5rem",
                
            }}
        >
            <nav id="coursepage-mainsection" className="navbar navbar-light">
                <ul
                    className="nav"
                    style={{
                        display: "flex",
                        gap: isNonMobileScreens ? "2.5rem" : isMobileScreens ? "1rem" : "2rem",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                        padding: "0",
                        margin: "0",
                    }}
                >
                    <li
                        className="nav-item"
                        style={{
                            padding: "0",
                            margin: "0",
                            
                        }}
                    >
                        <a
                            className="nav-link"
                            style={{
                                fontSize: isNonMobileScreens ? "1.2rem" : "1rem",
                                color: theme.palette.text.primary,
                                paddingLeft: "0",
                                margin: "0",
                            }}
                            href="#coursepage-mainsection-about"
                        >
                            About
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#coursepage-mainsection-learn"
                            className="nav-link"
                            style={{
                                fontSize: isNonMobileScreens ? "1.2rem" : "1rem",
                                color: theme.palette.text.primary,
                            }}
                        >
                            You&apos;ll Learn
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#coursepage-mainsection-lessons"
                            className="nav-link"
                            style={{
                                fontSize: isNonMobileScreens ? "1.2rem" : "1rem",
                                color: theme.palette.text.primary,
                            }}
                        >
                            Lessons
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#coursepage-mainsection-instructors"
                            className="nav-link"
                            style={{
                                fontSize: isNonMobileScreens ? "1.2rem" : "1rem",
                                color: theme.palette.text.primary,
                            }}
                        >
                            Instructors
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#coursepage-mainsection-reviews"
                            className="nav-link"
                            style={{
                                fontSize: isNonMobileScreens ? "1.2rem" : "1rem",
                                color: theme.palette.text.primary,
                            }}
                        >
                            Reviews
                        </a>
                    </li>
                </ul>
            </nav>
            <Box></Box>
        </FlexBetween>
    )
}

export default MainSectionNav