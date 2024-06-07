import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CourseNextPrevButton } from "../../components/StyledBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import CourseWidget from "../../widgets/CourseWidget";

const CoursesContent = ({ handleScroll, selectedItem, selectedCourses }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
            }}
        >
            <CourseNextPrevButton
                className="right-arrow"
                sx={{
                    right: isNonMobileScreens ? "0" : "-25px",
                }}
                onClick={() => {
                    handleScroll("right");
                }}
            >
                <ArrowForwardIosIcon
                    sx={{
                        fontSize: isNonMobileScreens ? "3rem" : "1.5rem",
                        color: "rgba(255, 255, 255, 1)",
                        alignSelf: "center",
                    }}
                />
            </CourseNextPrevButton>

            <CourseNextPrevButton
                className="left-arrow"
                sx={{
                    left: isNonMobileScreens ? "0" : "-25px",
                }}
                onClick={() => {
                    handleScroll("left");
                }}
            >
                <ArrowForwardIosIcon
                    sx={{
                        fontSize: isNonMobileScreens ? "3rem" : "1.5rem",
                        color: "rgba(255, 255, 255, 1)",
                        alignSelf: "center",
                        transform: "rotate(180deg)",
                    }}
                />
            </CourseNextPrevButton>
            <Box
                className="courses-container"
                sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    gap: isNonMobileScreens ? "1.5rem" : "1rem",
                    overflowX: "hidden",
                    width: "100%",
                    height: "100%",
                    scrollBehavior: "smooth",
                }}
            >
                {selectedCourses.map((course) => {
                    return (
                        <Box
                            key={course._id}
                            sx={{
                                display: "grid",
                                gridTemplateRows: "1",
                            }}
                        >
                            <CourseWidget courseInfo={course} />
                        </Box>
                    );
                })}
                {selectedCourses.length === 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            width: "100%",
                            //border: "1px solid rgba(0, 0, 0, 0.23)",
                        }}
                    >
                        {selectedItem === "" ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "3rem",
                                    mt: isNonMobileScreens ? "4rem" : "2rem",
                                    alignItems: "center",
                                    height: "100%",
                                    // width: "100%",
                                    // border: "1px solid rgba(0, 0, 0, 0.23)",
                                }}
                            >
                                <Typography
                                    variant={isNonMobileScreens ? "h3" : "h4"}
                                >
                                    No courses found
                                </Typography>
                                <img
                                    src="/images/not_found_1.svg"
                                    style={{
                                        // height: "30%",
                                        maxHeight: isNonMobileScreens
                                            ? "250px"
                                            : "150px",
                                        width: "auto",
                                    }}
                                />
                            </Box>
                        ) : (
                            <Typography variant="h4">
                                No courses found on <b>{selectedItem}</b>
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default CoursesContent;
