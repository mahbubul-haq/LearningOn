import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "../../components/Rating";
import { StyledGrid2Cols } from "../../components/StyledBox";

const TopSectionSmallInfo = ({
    courseInfo
}) => {

    const isMobibleScreen = useMediaQuery("(max-width: 600px)");
    return (
        <Box
            sx={{
                width: "100%",
                // maxWidth: "400px",
                display: "grid",
                gridTemplateColumns: isMobibleScreen ? "1fr" : "1fr 1fr",
                gap: "1rem",
                px: "1rem",
                mx: "auto",

                // alignItems: "center",
            }}
        >

            <StyledGrid2Cols>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "1rem",
                        justifySelf: "right",
                    }}
                >
                    Course Cost
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        justifySelf: "left",
                    }}
                >
                    $ {courseInfo?.coursePrice}
                </Typography>
            </StyledGrid2Cols>

            <StyledGrid2Cols>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "1rem",
                        justifySelf: "right",
                    }}
                >
                    Rating
                </Typography>
                <Box
                    sx={{
                        justifySelf: "left",
                    }}
                >
                    <Rating
                        rating={{
                            rating: courseInfo?.ratings?.totalRating,
                            count: courseInfo?.ratings?.numberOfRatings,
                            showText: true,
                        }}
                    />
                </Box>
            </StyledGrid2Cols>
            <StyledGrid2Cols>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "1rem",
                        justifySelf: "right",
                    }}
                >
                    Enrolled by
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "1rem",
                        justifySelf: "left",
                    }}
                >
                    <b>{courseInfo?.enrolledStudents?.length}</b> students
                </Typography>
            </StyledGrid2Cols>
            <StyledGrid2Cols>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "1rem",
                        justifySelf: "right",
                    }}
                >
                    Time to complete
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "1rem",
                        justifySelf: "left",
                    }}
                >
                    <b>{courseInfo?.approxTimeToComplete} weeks</b>
                </Typography>
            </StyledGrid2Cols>

            <StyledGrid2Cols>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "1rem",
                        justifySelf: "right",
                    }}
                >
                    Language
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "1rem",
                        justifySelf: "left",
                    }}
                >
                    <b>{courseInfo?.courseLanguage}</b>
                </Typography>
            </StyledGrid2Cols>
        </Box>
    )
}

export default TopSectionSmallInfo