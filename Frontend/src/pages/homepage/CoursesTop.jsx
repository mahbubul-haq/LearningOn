import FlexBetween from "../../components/FlexBetween";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Autocomplete from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import StyledTextField1 from "../../components/StyledTextField1";

const CoursesTop = ({
    courseType,
    setCourseType,
    handleChange,

}) => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const user = useSelector((state) => state.user);


    return (
        <FlexBetween
            sx={{
                mb: "1rem",
                width: "100%",
                "&&": {
                    flexDirection: isNonMobileScreens ? "row" : "column",
                },
            }}
        >
            <Box
                sx={{
                    mb: "1rem",
                    flexGrow: "1",
                    textAlign: isNonMobileScreens ? "left" : "center",
                }}
            >
                <Typography variant="h3">{courseType}</Typography>
            </Box>
            {/* <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "relative",
                        flexGrow: "1",
                    }}
                ></Box> */}

            {user && !isMobileScreens && (
                <Box sx={{ borderBottom: 1, borderColor: "divider", overflow: "auto" }}>
                    <Tabs
                        orientation="horizontal"
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        value={courseType}
                        sx={{
                            "& .MuiTabs-indicator": {
                                backgroundColor: (theme) => theme.palette.text.primary,
                            },
                        }}
                    >
                        <Tab
                            sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                textTransform: "capitalize",
                                color: (theme) => theme.palette.grey.grey400,
                                "&.Mui-selected": {
                                    color: (theme) => theme.palette.text.primary,
                                },
                            }}
                            label="My Courses"
                            value="My Courses"
                        />
                        <Tab
                            sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                textTransform: "capitalize",
                                color: (theme) => theme.palette.grey.grey400,
                                "&.Mui-selected": {
                                    color: (theme) => theme.palette.text.primary,
                                },
                            }}
                            label="I am Learning"
                            value="I am Learning"
                        />
                        <Tab
                            sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                textTransform: "capitalize",
                                color: (theme) => theme.palette.grey.grey400,
                                "&.Mui-selected": {
                                    color: (theme) => theme.palette.text.primary,
                                },
                            }}
                            label="Popular Courses"
                            value="Popular Courses"
                        />
                    </Tabs>
                </Box>
            )}
            {user && isMobileScreens && (
                <Box
                    sx={{
                        width: "100%",
                        my: "1rem",
                        mb: "0",
                        // border: "1px solid rgba(0, 0, 0, 0.23)",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Autocomplete
                        disablePortal
                        onChange={(event, value) => {
                            if (value) {
                                setCourseType(value.value);
                            }
                        }}
                        value={courseType}
                        id="category"
                        options={[{ label: "My Courses", value: "My Courses" }, { label: "I am Learning", value: "I am Learning" }, { label: "Popular Courses", value: "Popular Courses" }]}
                        sx={{
                            maxWidth: "300px",
                            width: "100%",
                        }}
                        renderInput={(params) => (
                            <StyledTextField1
                                placeholder={courseType}
                                {...params}
                                size="small"
                                // change font size of input
                                sx={{
                                    p: 0,
                                    "& .MuiInputBase-input": {
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                    },

                                    "&&": {
                                        "& .MuiInputBase-root": {
                                            color: (theme) => theme.palette.grey.grey600,
                                        },
                                    },
                                    //enforce color of input
                                }}
                            />
                        )}
                    />
                </Box>
            )}
        </FlexBetween>
    )
}

export default CoursesTop