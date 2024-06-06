import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const CoursePageReviews = ({ courseInfo }) => {
    return (
        <>
            {courseInfo.courseReviews?.length > 0 ? (
                <Box>reviews</Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                        }}
                    >
                        No reviews yet
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default CoursePageReviews;
