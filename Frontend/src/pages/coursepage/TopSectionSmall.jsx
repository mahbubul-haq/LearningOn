import { Box, Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton";
import { getEnrollmentStatus } from "../../utils/course";
import TopSectionSmallInfo from "./TopSectionSmallInfo";

const TopSectionSmall = ({ courseInfo, purchased, enrollCourse }) => {
    const isMobileScreen = useMediaQuery("(max-width: 600px)");
    const minWidth800 = useMediaQuery("(min-width: 800px)");
    const minWidth900 = useMediaQuery("(min-width: 900px)");

    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.bottom,
                backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
                color: theme.palette.text.primary,
                pb: "2rem",
                ///border: "0.1px solid" + theme.palette.background.bottom,
                border: "0.1px solid" + theme.palette.background.top,
                px: isMobileScreen ? "1rem" : "3rem"
            }}
        >
            <Box sx={{
                display: "flex",
                alignItems: isMobileScreen ? "left" : "center",
                flexDirection: "column",
                width: "100%",
                // border: "1px solid green"
                py: "1.5rem",
                gap: "0.5rem",
                px: isMobileScreen ? "0rem" : "4rem",
            }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        // my: "2rem",
                        textAlign: isMobileScreen ? "left" : "center",
                        textTransform: "capitalize",
                        // px: isMobileScreen ? "2rem" : "7rem",
                        fontSize: isMobileScreen ? "1.3rem" : "1.6rem",

                    }}
                >
                    {courseInfo?.courseTitle}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "1rem",
                    }}
                >
                    Instructors{" "}
                    {courseInfo?.courseInstructors?.map((instructor, index) => {
                        return (
                            <Button component="a"
                                href={`${import.meta.env.VITE_CLIENT_URL}/profile/${instructor?._id}`}
                                key={index}
                                title="View Profile"
                                sx={{
                                    // fontWeight: "bold",
                                    color: theme.palette.text.primary,
                                    textTransform: "capitalize",
                                    fontSize: "1rem",

                                    mb: "0.1rem",
                                    textDecoration: "underline",
                                    "&:hover": {
                                        color: theme.palette.text.primary,
                                        textDecoration: "underline",
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/profile/${instructor._id}`);
                                }}
                            >
                                {instructor.name}
                            </Button>
                        );
                    })}
                </Typography>

                {isMobileScreen && <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        mt: '0.2rem',
                    }}>
                    {`$ ${courseInfo?.coursePrice}`}
                </Typography>}

                <StyledButton
                    component="a"
                    href={`${import.meta.env.VITE_CLIENT_URL}/learning/course/${courseInfo?._id}`}
                    onClick={(e) => {
                        e.preventDefault();
                        if (purchased) {
                            navigate(`/learning/course/${courseInfo?._id}`);
                        } else {
                            if (user) {
                                enrollCourse();
                            } else {
                                navigate("/login", {
                                    state: {
                                        isLogin: true,
                                        redirect: `/course/${courseInfo?._id}`,
                                    },
                                });
                            }
                        }
                    }}
                    sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "inherit",
                        mt: "0.5rem",
                        "&&": {
                            // backgroundColor: "#f37f4aff",
                            width: "fit-content",
                            px: "2rem",
                            backgroundColor: theme.palette.primary.dark,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.darker,
                                color: "inherit"
                            },
                        },
                    }}
                >
                    {getEnrollmentStatus(purchased, user, courseInfo)}
                </StyledButton>

            </Box>

            {!isMobileScreen && <Divider sx={{
                width: minWidth900 ? "70%" : minWidth800 ? "80%" : "100%",
                mx: "auto",
            }} />}

            <TopSectionSmallInfo courseInfo={courseInfo} purchased={purchased} user={user} />
        </Box>
    );
};

export default TopSectionSmall;
