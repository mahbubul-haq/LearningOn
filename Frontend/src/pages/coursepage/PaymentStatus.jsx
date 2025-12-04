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
                    borderRadius: "0.25rem",
                    backgroundColor: "white",
                    padding: "3rem 5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        borderRadius: "50%",
                        backgroundColor:
                            status === "success"
                                ? theme.palette.primary.light3
                                : theme.palette.error.light1,
                        padding: "1rem",
                    }}
                >
                    {status === "success" && (
                        <DoneIcon
                            sx={{
                                fontSize: "2rem",
                                color: theme.palette.primary.dark,
                            }}
                        />
                    )}

                    {status === "cancel" && (
                        <CloseIcon
                            sx={{
                                fontSize: "2rem",
                                color: theme.palette.error.main,
                            }}
                        />
                    )}
                </Box>
                <Typography
                    sx={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        textAlign: "center",
                        color: theme.palette.grey.grey700,
                    }}
                >
                    {status === "success"
                        ? "Payment Successful"
                        : "Payment Failed"}
                </Typography>

                <Button
                    sx={{
                        mt: "1rem",
                    }}
                >
                    <Link
                        style={{
                            textDecoration: "none",
                            color: theme.palette.primary.dark,
                            fontWeight: "600",
                            fontSize: "1rem",
                        }}
                        to={`/course/${courseId}`}
                    >
                        Go to Course
                    </Link>
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentStatus;
