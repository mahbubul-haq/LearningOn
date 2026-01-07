import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useEffect, useMemo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { themeSettings } from "./theme";

// Contexts
import { AdminState } from "./state/AdminContext";
import { CourseExplorerState } from "./state/CourseExplorerContext";
import { CreateCourseState } from "./state/CreateCourse";
import { DashboardState } from "./state/DashboardContext";
import { GlobalState } from "./state/GlobalContext";
import { HomePageState } from "./state/HomePageState";
import { LearningCourseState } from "./state/LearningCourseContex";
import { NotificationState } from "./state/NotificationContext";
import { ProfilePageState } from "./state/ProfilePageContext";

// Components & Fast-Load Pages (Eager Loaded)
import WithNav from "./components/withNav";
import UnderwayAlert from "./components/UnderwayAlert";
import AppFallback from "./AppFallback";
import LoginSignUp from "./pages/loginpage";
import Courses from "./pages/courses";
import CoursePage from "./pages/coursepage";

// Lazy-loaded pages 
const HomePage = lazy(() => import("./pages/homepage"));
const PublishCourse = lazy(() => import("./pages/publishcourse"));
const LearningPage = lazy(() => import("./pages/learningpage"));
const PaymentStatus = lazy(() => import("./pages/coursepage/PaymentStatus"));
const ProfilePage = lazy(() => import("./pages/profilepage"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Admin = lazy(() => import("./pages/admin"));
const Quiz = lazy(() => import("./pages/learningpage/Quiz"));
const QuizContainer = lazy(() => import("./pages/learningpage/QuizContainer"));

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
                            {/* eager loaded routes */}

                            <Route path="/login" element={<LoginSignUp />} />
                            <Route path="/signup" element={<LoginSignUp />} />
                            <Route
                              path="/courses"
                              element={<WithNav showNav={true} component={<Courses />} />}
                            />
                            <Route
                              path="/course/:courseId"
                              element={<WithNav showNav={true} component={<CoursePage />} />}
                            />

                            {/* Lazy loaded routes */}

                            <Route
                              path="/"
                              element={
                                <Suspense fallback={<AppFallback />}>

                                  <WithNav showNav={true} component={<HomePage />} />
                                </Suspense>
                              }
                            />
                            <Route
                              path="/learning/course/:courseId"
                              element={
                                <Suspense fallback={<AppFallback />}>
                                  <LearningPage />
                                </Suspense>
                              }
                            />
                            <Route
                              path="/publishcourse"
                              element={
                                <Suspense fallback={<AppFallback />}>
                                  <PublishCourse />
                                </Suspense>
                              }
                            />
                            <Route
                              path="/publishcourse/:edit/:courseId"
                              element={
                                <Suspense fallback={<AppFallback />}>
                                  <PublishCourse />
                                </Suspense>
                              }
                            />
                            <Route
                              path="/payment/:status/:courseId"
                              element={
                                <Suspense fallback={<AppFallback />}>
                                  <PaymentStatus />
                                </Suspense>
                              }
                            />
                            <Route
                              path="/profile/:userId"
                              element={
                                <Suspense fallback={<AppFallback />}>
                                  <WithNav showNav={true} component={<ProfilePage />} />
                                </Suspense>
                              }
                            />
                            <Route
                              path="/dashboard/:courseId"
                              element={
                                <Suspense fallback={<AppFallback />}>
                                  <WithNav showNav={true} component={<Dashboard />} />
                                </Suspense>
                              }
                            />
                            <Route
                              path="/dashboard/"
                              element={
                                <Suspense fallback={<AppFallback />}>
                                  <WithNav showNav={true} component={<Dashboard />} />
                                </Suspense>
                              }
                            />
                            <Route
                              path="/admin"
                              element={
                                <Suspense fallback={<AppFallback />}>
                                  <Admin />
                                </Suspense>
                              }
                            />
                            <Route
                              path="/quiz/:courseId/:lessonId"
                              element={
                                <Suspense fallback={<AppFallback />}>
                                  <Quiz />
                                </Suspense>
                              }
                            />
                            <Route
                              path="/quiz1"
                              element={
                                <Suspense fallback={<AppFallback />}>
                                  <QuizContainer />
                                </Suspense>
                              }
                            />
                            <Route path="/underway" element={<UnderwayAlert />} />
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