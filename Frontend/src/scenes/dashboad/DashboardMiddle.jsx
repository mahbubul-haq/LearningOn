import React from "react";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { DashboardContext } from "../../state/DashboardContext";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import DashboardCard from "../../widgets/DashboardCard";

const DashboardMiddle = () => {
    const { selectedCourse } = useContext(DashboardContext);
    const user = useSelector((state) => state.user);

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
                return acc + student?.paidAmount ? student.paidAmount : 0;
            }, 0);
        } else {
            return user?.courses?.reduce((acc, course) => {
                return (
                    acc +
                    course.enrolledStudents?.reduce((accCourse, student) => {
                        return accCourse + student?.paidAmount
                            ? student.paidAmount
                            : 0;
                    }, 0)
                );
            }, 0);
        }
    };

    return (
        <Box>
            {selectedCourse && (
                <h4
                    style={{
                        textAlign: "center",
                        marginTop: "2rem",
                    }}
                >
                    {selectedCourse?.courseTitle}
                </h4>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "2rem",
                    justifyContent: "center",
                    mt: "4rem",
                }}
            >
                {!selectedCourse && (
                    <DashboardCard
                        title="Total Courses"
                        value={user?.courses?.length}
                    />
                )}

                <DashboardCard
                    title="Total Students"
                    value={getTotalStudents()}
                />

                <DashboardCard
                    title="Total Earnings (USD)"
                    value={getTotalIncome()}
                />
            </Box>
        </Box>
    );
};

export default DashboardMiddle;
