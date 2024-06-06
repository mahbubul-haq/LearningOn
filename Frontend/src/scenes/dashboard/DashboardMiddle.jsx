import Box from "@mui/material/Box";
import { useContext } from "react";
import { DashboardContext } from "../../state/DashboardContext";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import DashboardCard from "../../widgets/DashboardCard";
import { Divider } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { StyledButton } from "../../components/StyledButton";
import useMediaQuery from "@mui/material/useMediaQuery";

const DashboardMiddle = () => {
    const { selectedCourse } = useContext(DashboardContext);
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const getTotalStudents = () => {
        if (selectedCourse) {
            return selectedCourse?.enrolledStudents?.length;
        } else {
            return user?.courses?.reduce((acc, course) => {
                return acc + course.enrolledStudents?.length;
            }, 0);
        }
    };

    const getTotalIncome = () => {
        if (selectedCourse) {
            return selectedCourse?.enrolledStudents?.reduce((acc, student) => {
                return acc + (student?.paidAmount ? student.paidAmount : 0);
            }, 0);
        } else {
            return user?.courses?.reduce((acc, course) => {
                return (
                    acc +
                    course.enrolledStudents?.reduce((accCourse, student) => {
                        return accCourse + (student?.paidAmount ? student.paidAmount : 0);
                    }, 0)
                );
            }, 0);
        }
    };

    return (
        <Box>
            {selectedCourse && (
                <>
                    <h4
                        style={{
                            textAlign: "center",
                            marginTop: isNonMobileScreens ? "2rem" : "1rem",
                        }}
                    >
                        {selectedCourse?.courseTitle}
                    </h4>
                    <FlexBetween
                        sx={{
                            width: "fit-content",
                            margin: "0 auto",
                            gap: "1rem",
                            mt: "1rem",
                        }}
                    >
                        <StyledButton onClick={() => window.open(`/course/${selectedCourse?._id}`, "_self")}>Go to Course</StyledButton>
                        {selectedCourse.owner == user?._id && (
                            <StyledButton onClick={() => window.open(`/publishcourse/edit/${selectedCourse?._id}`, "_self")}>
                                Edit Course
                            </StyledButton>
                        )}
                    </FlexBetween>
                </>
            )}
            {!selectedCourse && (
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        marginTop: isNonMobileScreens ? "2rem" : "1rem",
                    }}
                >
                    No Course Selected
                </Typography>
            )}

            <Divider
                sx={{
                    my: "2rem",
                }}
            />

            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    mt: isNonMobileScreens ? "3rem" : "1rem",
                }}
            >
                {selectedCourse ? "Course" : "All Courses"} Statistics
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "2rem",
                    justifyContent: "center",
                    mt: "2rem",
                }}
            >
                {!selectedCourse && (
                    <DashboardCard
                        title="Total Courses"
                        value={user?.courses?.reduce((acc, course) => acc + (course.courseStatus == "draft" ? 0 : 1), 0)}
                    />
                )}

                <DashboardCard title="Total Students" value={getTotalStudents()} />

                <DashboardCard title="Total Earnings (USD)" value={getTotalIncome()} />
            </Box>
        </Box>
    );
};

export default DashboardMiddle;
