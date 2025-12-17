import { Divider, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "../../components/Rating";
import { StyledGrid2Cols } from "../../components/StyledBox";
import useTheme from "@mui/material/styles/useTheme";
import { getEnrollmentText, isPurchased } from "../../utils/course";

const TopSectionSmallInfo = ({
    courseInfo,
    purchased,
    user
}) => {

    const isMobileScreen = useMediaQuery("(max-width: 600px)");
    const minWidth800 = useMediaQuery("(min-width: 800px)");
    const minWidth900 = useMediaQuery("(min-width: 900px)");
    const theme = useTheme();
    return (
        <Box sx={{
            display: "flex",
            flexDirection: isMobileScreen ? "column" : "row",
            gap: "0rem",
            width: minWidth900 ? "70%" : minWidth800 ? "80%" : "100%",
            mx: isMobileScreen ? "0rem" : "auto",
            justifyContent: isMobileScreen ? "left" : "space-around",
            pt: isMobileScreen ? "0rem" : "1rem",
            position: "relative",
        }}>
            <Box sx={{
                width: isMobileScreen ? "100%" : "50%",
            }}>
                {!isMobileScreen && (
                    <Typography

                        sx={{

                            justifySelf: "left",
                        }}
                    >
                        Course Cost: <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>$ {courseInfo?.coursePrice}</span>
                    </Typography>
                )}
                <Rating
                    rating={{
                        rating: courseInfo?.ratings?.totalRating,
                        count: courseInfo?.ratings?.numberOfRatings,
                        showText: true,
                    }}
                />

                <Typography

                    sx={{

                        justifySelf: "left",
                    }}
                >
                    Time to complete: <span style={{ fontWeight: "bold" }}>{courseInfo?.approxTimeToComplete} weeks</span>
                </Typography>

            </Box>
            {!isMobileScreen && <Box sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: "1px", height: "5rem", backgroundColor: theme.palette.customDivider.main
            }}>
            </Box>}
            {/* <Box sx={{
                display: "flex",
                flexDirection: isMobileScreen ? "column" : "row",
                gap: "0rem",

            }}> */}

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0rem",
                width: isMobileScreen ? "100%" : "50%",
                pl: isMobileScreen ? "0rem" : "2rem",

            }}>

                {courseInfo?.enrolledStudents?.length > 0 && (
                    <Typography

                        sx={{

                            justifySelf: "left",
                        }}
                    >
                        {getEnrollmentText(purchased, user, courseInfo)}
                    </Typography>
                )}
                <Typography

                    sx={{

                        justifySelf: "left",
                    }}
                >
                    Language: <span style={{ fontWeight: "bold" }}>{courseInfo?.courseLanguage}</span>
                </Typography>
                <Typography

                    sx={{

                        justifySelf: "left",
                    }}
                >
                    {courseInfo?.studentRequirements ? `Requirements: ${courseInfo?.studentRequirements}` : "No prerequisites to learn"}
                </Typography>
            </Box>

            {/* </Box> */}

        </Box>
    )
}

export default TopSectionSmallInfo