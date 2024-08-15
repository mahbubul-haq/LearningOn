import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { themeSettings } from "./theme";

import UnderwayAlert from "./components/UnderwayAlert";
import WithNav from "./components/withNav";
import Admin from "./pages/admin";
import CoursePage from "./pages/coursepage";
import PaymentStatus from "./pages/coursepage/PaymentStatus";
import Courses from "./pages/courses";
import Dashboard from "./pages/dashboard";
import HomePage from "./pages/homepage";
import LearningPage from "./pages/learningpage";
import LoginSignUp from "./pages/loginpage";
import ProfilePage from "./pages/profilepage";
import PublishCourse from "./pages/publishcourse";
import { AdminState } from "./state/AdminContext";
import { CourseExplorerState } from "./state/CourseExplorerContext";
import { CreateCourseState } from "./state/CreateCourse";
import { DashboardState } from "./state/DashboardContext";
import { GlobalState } from "./state/GlobalContext";
import { HomePageState } from "./state/HomePageState";
import { LearningCourseState } from "./state/LearningCourseContex";
import { NotificationState } from "./state/NotificationContext";
import { ProfilePageState } from "./state/ProfilePageContext";

function App() {
  const mode = useSelector((state) => state.auth.mode);
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
                  <CourseExplorerState>
                    <AdminState>
                      <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <UnderwayAlert />
                        <BrowserRouter>
                          <Routes>
                            <Route path="/" element={<WithNav showNav={true} component={<HomePage />} />} />
                            <Route path="/login" element={<LoginSignUp />} />
                            <Route path="/signup" element={<LoginSignUp />} />
                            <Route path="/publishcourse" element={<PublishCourse />} />
                            <Route path="/publishcourse/:edit/:courseId" element={<PublishCourse />} />
                            <Route path="/course/:courseId" element={<WithNav showNav={true} component={<CoursePage />} />} />
                            <Route path="/learning/course/:courseId" element={<LearningPage />} />
                            <Route path="/payment/:status/:courseId" element={<PaymentStatus />} />
                            <Route path="/profile/:userId" element={<WithNav showNav={true} component={<ProfilePage />} />} />
                            <Route path="/dashboard/:courseId" element={<WithNav showNav={true} component={<Dashboard />} />} />
                            <Route path="/dashboard/" element={<WithNav showNav={true} component={<Dashboard />} />} />
                            <Route path="/underway" element={<UnderwayAlert />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/courses" element={<WithNav showNav={true} component={<Courses/>} />} />
                          </Routes>
                        </BrowserRouter>
                      </ThemeProvider>
                    </AdminState>
                  </CourseExplorerState>
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
