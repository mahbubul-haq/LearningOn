import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useContext } from "react";
import { DashboardContext } from "../../state/DashboardContext";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { convertTime } from "../../utils/dateTime";

const DashboardRight = () => {
    const { recentEnrollments, selectedCourse } = useContext(DashboardContext);
    const navigate = useNavigate();

    return (
        <Box>
            <Typography
                variant="h6"
                sx={{ textAlign: "center", fontWeight: "600" }}
            >
                Recent Enrollments
            </Typography>
            <Divider sx={{ my: "0.5rem", zIndex: "-100" }} />
            {recentEnrollments?.length === 0 && (
                <Typography
                    variant="body2"
                    sx={{ mt: "2rem", textAlign: "center", fontWeight: "600" }}
                >
                    No Recent Enrollments
                </Typography>
            )}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "0.5rem",
                    mt: "1rem",
                }}
            >
                {recentEnrollments?.map((enrollment, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: "100%",
                            border: "1px solid #ccc",
                            borderRadius: "0.5rem",
                            padding: "0.5rem 1rem",
                            backgroundColor: (theme) =>
                                theme.palette.background.imagesBg1,
                        }}
                    >
                        {!selectedCourse && (
                            <Typography
                                sx={{
                                    // fontWeight: "600",
                                    fontSize: "0.9rem",
                                    mb: "0.5rem",
                                    // do not wrap the text but show ellipsis if it overflows
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {enrollment.courseTitle}
                            </Typography>
                        )}
                        <FlexBetween
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "0.9rem",
                                    cursor: "pointer",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                                onClick={() => {
                                    navigate(`/profile/${enrollment.userId}`);
                                }}
                            >
                                {enrollment.userName
                                    ? enrollment.userName
                                    : "No Name"}
                            </Typography>
                            <Typography sx={{ fontSize: "0.8rem",
                            color: (theme) => theme.palette.grey.grey500,
                         }}>
                                {convertTime(enrollment.enrolledOn)}
                            </Typography>
                        </FlexBetween>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                textAlign: "right",
                                
                            }}
                        >
                            {enrollment.paidAmount
                                ? "$" + enrollment.paidAmount
                                : "$0"}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default DashboardRight;
