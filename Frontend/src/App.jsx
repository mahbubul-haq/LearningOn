import { useEffect, useMemo } from "react";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import "./App.css";

import HomePage from "./scenes/homepage";
import LoginSignUp from "./scenes/loginpage";
import PublishCourse from "./scenes/publishcourse";
import { CreateCourseState } from "./state/CreateCourse";
import { GlobalState } from "./state/GlobalContext";
import { HomePageState } from "./state/HomePageState";
import CoursePage from "./scenes/coursepage";
import LearningPage from "./scenes/learningpage";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    useEffect(() => {}, [mode]);

    return (
        <HomePageState>
            <GlobalState>
                <CreateCourseState>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/login"
                                    element={<LoginSignUp />}
                                />
                                <Route
                                    path="/signup"
                                    element={<LoginSignUp />}
                                />
                                <Route
                                    path="/publishcourse"
                                    element={<PublishCourse />}
                                />
                                <Route
                                    path="/course/:courseId"
                                    element={<CoursePage />}
                                />
                                <Route
                                    path="/learning/course/:courseId"
                                    element={<LearningPage />}
                                />

                            </Routes>
                        </BrowserRouter>
                    </ThemeProvider>
                </CreateCourseState>
            </GlobalState>
        </HomePageState>
    );
}

export default App;
