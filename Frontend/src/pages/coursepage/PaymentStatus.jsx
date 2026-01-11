import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import socketIoClient from "socket.io-client";
import { colorTokens } from "../../theme";

const PaymentStatus = () => {
    const { status, courseId } = useParams();
    const theme = useTheme();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (status === "success") {
            const socket = socketIoClient(import.meta.env.VITE_SERVER_URL);
            /// send roomId and userId to server, socket.emit("join-room")

            socket.emit("course-purchased", {
                courseId: courseId,
                userId: user._id,
            });

            // socket.on("my-course-purchased", (data) => {
            //     console.log("data from server", data);
            // });
        }
    }, []);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                minHeight: "600px",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    borderRadius: "1rem",
                    backgroundColor: (theme) => theme.palette.homepage.cardBg,
                    padding: "3rem 5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "center",
                    boxShadow: (theme) => theme.palette.homepage.navShadow,
                    border: (theme) => `1px solid ${theme.palette.homepage.divider}`,
                }}
            >
                <Box
                    sx={{
                        borderRadius: "50%",
                        backgroundColor:
                            status === "success"
                                ? `rgba(76, 175, 80, ${colorTokens.opacity[15]})`
                                : `rgba(244, 67, 54, ${colorTokens.opacity[15]})`,
                        padding: "1.2rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {status === "success" && (
                        <DoneIcon
                            sx={{
                                fontSize: "2.5rem",
                                color: (theme) => theme.palette.success.main,
                            }}
                        />
                    )}

                    {status === "cancel" && (
                        <CloseIcon
                            sx={{
                                fontSize: "2.5rem",
                                color: (theme) => theme.palette.error.main,
                            }}
                        />
                    )}
                </Box>
                <Typography
                    sx={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        textAlign: "center",
                        color: (theme) => theme.palette.homepage.textPrimary,
                        mt: "1rem",
                    }}
                >
                    {status === "success"
                        ? "Payment Successful"
                        : "Payment Failed"}
                </Typography>

                <Typography
                    sx={{
                        fontSize: "1rem",
                        textAlign: "center",
                        color: (theme) => theme.palette.homepage.textSecondary,
                        mb: "1.5rem",
                    }}
                >
                    {status === "success"
                        ? "Thank you for your purchase! You can now access all course materials."
                        : "Something went wrong with your payment. Please try again or contact support."}
                </Typography>

                <Button
                    component={Link}
                    to={`/course/${courseId}`}
                    sx={{
                        backgroundColor: (theme) => theme.palette.homepage.buttonPrimary,
                        color: (theme) => theme.palette.homepage.buttonPrimaryText,
                        fontWeight: "700",
                        padding: "0.8rem 2.5rem",
                        borderRadius: "0.5rem",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        "&:hover": {
                            backgroundColor: (theme) => theme.palette.homepage.buttonPrimaryHover,
                        },
                    }}
                >
                    Go to Course
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentStatus;
