import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledButton } from "../../components/StyledButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { getEnrollmentStatus } from "../../utils/course";
import TopSectionSmallInfo from "./TopSectionSmallInfo";

const TopSectionSmall = ({ courseInfo, purchased, enrollCourse }) => {
    const isMobibleScreen = useMediaQuery("(max-width: 600px)");

    const { user } = useSelector((state) => state);

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
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontWeight: "bold",
                    my: "2rem",
                    textAlign: "center",
                    textTransform: "capitalize",
                    px: "1rem",
                    fontSize: isMobibleScreen ? "1rem" : "1.3rem",
                }}
            >
                {courseInfo?.courseTitle}
            </Typography>

            <TopSectionSmallInfo courseInfo={courseInfo} />

            <Box
                sx={{
                    gap: "1rem",
                    px: "1rem",
                    // mx: "auto",
                    width: "100%",
                    mt: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "1rem",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    Requirements: {courseInfo?.studentRequirements}
                </Typography>
                <StyledButton
                    onClick={() => {
                        if (purchased) {
                            navigate(`/learning/course/${courseInfo._id}`);
                        } else {
                            if (user) {
                                enrollCourse();
                            } else {
                                navigate("/login", {
                                    state: {
                                        isLogin: true,
                                        redirect: `/course/${courseInfo._id}`,
                                    },
                                });
                            }
                        }
                    }}
                    sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        "&&": {
                            backgroundColor: theme.palette.primary.main1,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.dark,
                            },
                            maxWidth: "200px",
                            // ml: "auto",
                        },
                    }}
                >
                    {getEnrollmentStatus(purchased, user, courseInfo)}
                </StyledButton>
            </Box>
        </Box>
    );
};

export default TopSectionSmall;
