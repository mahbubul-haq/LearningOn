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
import { LearningCourseState } from "./state/LearningCourseContex";
import PaymentStatus from "./scenes/coursepage/PaymentStatus";
import ProfilePage from "./scenes/profilepage";
import { ProfilePageState } from "./state/ProfilePageContext";
import Dashboard from "./scenes/dashboad";
import { DashboardState } from "./state/DashboardContext";
import { NotificationState } from "./state/NotificationContext";
import UnderwayAlert from "./components/UnderwayAlert";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


    useEffect(() => {
        sessionStorage.setItem("firstTime", "true");
    }, [mode]);

    return (
        <NotificationState>
            <DashboardState>
                <ProfilePageState>
                    <LearningCourseState>
                        <HomePageState>
                            <GlobalState>
                                <CreateCourseState>
                                    <ThemeProvider theme={theme}>
                                        <CssBaseline />
                                        <UnderwayAlert />
                                        <BrowserRouter>
                                            <Routes>
                                                <Route
                                                    path="/"
                                                    element={<HomePage />}
                                                />
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
                                                <Route path="/publishcourse/:edit/:courseId"
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
                                                <Route
                                                    path="/payment/:status/:courseId"
                                                    element={<PaymentStatus />}
                                                />
                                                <Route
                                                    path="/profile/:userId"
                                                    element={<ProfilePage />}
                                                />
                                                <Route
                                                    path="/dashboard/:courseId"
                                                    element={<Dashboard />}
                                                />
                                                <Route path="dashboard/"
                                                    element={<Dashboard />}
                                                />
                                                <Route path="/underway" element={<UnderwayAlert />} />
                                            </Routes>
                                        </BrowserRouter>
                                    </ThemeProvider>
                                </CreateCourseState>
                            </GlobalState>
                        </HomePageState>
                    </LearningCourseState>
                </ProfilePageState>
            </DashboardState>
        </NotificationState>
    );
}

export default App;
