import { useEffect, useMemo } from "react";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import "./App.css";

import HomePage from "./pages/homepage";
import LoginSignUp from "./pages/loginpage";
import PublishCourse from "./pages/publishcourse";
import { CreateCourseState } from "./state/CreateCourse";
import { GlobalState } from "./state/GlobalContext";
import { HomePageState } from "./state/HomePageState";
import CoursePage from "./pages/coursepage";
import LearningPage from "./pages/learningpage";
import { LearningCourseState } from "./state/LearningCourseContex";
import PaymentStatus from "./pages/coursepage/PaymentStatus";
import ProfilePage from "./pages/profilepage";
import { ProfilePageState } from "./state/ProfilePageContext";
import Dashboard from "./pages/dashboard";
import { DashboardState } from "./state/DashboardContext";
import { NotificationState } from "./state/NotificationContext";
import UnderwayAlert from "./components/UnderwayAlert";
import { CourseExplorerState } from "./state/CourseExplorerContext";
import WithNav from "./components/withNav";

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
                  <CourseExplorerState>
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
                          <Route path="/learning/course/:courseId" element={<WithNav showNav={true} component={<LearningPage />} />} />
                          <Route path="/payment/:status/:courseId" element={<PaymentStatus />} />
                          <Route path="/profile/:userId" element={<WithNav showNav={true} component={<ProfilePage />} />} />
                          <Route path="/dashboard/:courseId" element={<WithNav showNav={true} component={<Dashboard />} />} />
                          <Route path="/dashboard/" element={<WithNav showNav={true} component={<Dashboard />} />} />
                          <Route path="/underway" element={<UnderwayAlert />} />
                        </Routes>
                      </BrowserRouter>
                    </ThemeProvider>
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
