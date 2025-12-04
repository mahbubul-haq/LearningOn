import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import InstructorProfile from "../../components/InstructorProfile";
import { StyledButton } from "../../components/StyledButton";
import StyledTextField1 from "../../components/StyledTextField1";

const MoreInfoBottom = ({
    courseState,
    setCourseState,
    users,
    instructor,
    setInstructor,
    addInstructor,
}) => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");

    return (
        <>
            <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="completion-time">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",

                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Approx Time to Complete the Course
                        </Typography>
                    </InputLabel>
                </Box>
                <Box>
                    <Autocomplete
                        disablePortal
                        // PopperComponent={StyledPopper}
                        onChange={(event, value) => {
                            setCourseState({
                                ...courseState,
                                approxTimeToComplete: value
                                    ? value.value.toString()
                                    : "",
                            });
                        }}
                        value={
                            courseState.approxTimeToComplete
                                ? {
                                      label: `${courseState.approxTimeToComplete} weeks`,
                                      value: `${courseState.approxTimeToComplete} weeks`,
                                  }
                                : null
                        }
                        id="completion-time"
                        options={
                            new Array(50).fill(0).map((_, index) => ({
                                label: `${index + 1} weeks`,
                                value: index + 1,
                            })) || [{ label: "No data" }]
                        }
                        
                        sx={{
                            width: isMobileScreens ? "100%" : "250px",
                            maxWidth: "100%",
                            background: "white",
                        }}
                        renderInput={(params) => (
                            <StyledTextField1
                                placeholder="number of weeks"
                                {...params}
                                size="small"
                                // change font size of input
                                sx={{
                                    // zIndex: 5000,
                                    p: 0,
                                    "& .MuiInputBase-input": {
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                    },

                                    "&&": {
                                        "& .MuiInputBase-root": {
                                            color: (theme) =>
                                                theme.palette.grey.grey600,
                                        },
                                    },
                                    //enforce color of input
                                }}
                            />
                        )}
                    />
                </Box>
            </Box>

            <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="course-instructors">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",

                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Course Instructors
                        </Typography>
                    </InputLabel>
                </Box>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: isMobileScreens
                            ? "1fr"
                            : "repeat(auto-fit, minmax(350px, 1fr))",
                        gap: "1rem",
                        gridAutoRows: "1fr",
                    }}
                >
                    {courseState.courseInstructors.map((id, index) => (
                        <Box
                            key={id + index}
                            sx={{
                                position: "relative",
                                // mb: "1rem",
                                width: "100%",
                            }}
                        >
                            <IconButton
                                onClick={() => {
                                    setCourseState({
                                        ...courseState,
                                        courseInstructors:
                                            courseState.courseInstructors.filter(
                                                (insId) => insId != id
                                            ),
                                    });
                                }}
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    fontSize: "1rem",
                                    color: (theme) =>
                                        theme.palette.grey.grey1000,
                                }}
                            >
                                {/* <PersonRemoveIcon /> */}
                                <CloseIcon />
                            </IconButton>
                            <InstructorProfile instructorId={id} />
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "1rem",
                        flexWrap: "wrap",
                        mt:
                            courseState?.courseInstructors?.length > 0
                                ? "1rem"
                                : "0rem",
                    }}
                >
                    <Autocomplete
                        disablePortal
                        onChange={(event, value) => {
                            setInstructor(value);
                        }}
                        value={{
                            label: instructor ? instructor.label : "",
                            value: instructor ? instructor.value : "",
                        }}
                        id="course-instructors"
                        options={
                            users
                                ? users.map((user) => ({
                                      label: user.name,
                                      value: user._id,
                                  }))
                                : [{ label: "No data" }]
                        }
                        sx={{
                            width: isMobileScreens ? "100%" : "350px",
                            maxWidth: "100%",
                            p: 0,
                            m: 0,
                            // border: "1px solid black",
                        }}
                        renderInput={(params) => (
                            <StyledTextField1
                                placeholder="Add Instructor"
                                {...params}
                                size="small"
                                // change font size of input

                                InputProps={{
                                    ...params.InputProps,

                                    startAdornment: (
                                        <StyledButton
                                            position="start"
                                            onClick={addInstructor}
                                            sx={{
                                                textTransform: "capitalize",
                                                fontWeight: "600",

                                                cursor: "pointer",
                                                "&&": {
                                                    borderRadius: "0.25",
                                                    padding: "0.4rem 0.8rem",
                                                    fontWeight: "600",
                                                    height: "100%",
                                                    background: (theme) =>
                                                        theme.palette.primary
                                                            .light2,
                                                    color: (theme) =>
                                                        theme.palette.text
                                                            .primary,
                                                    "&:hover": {
                                                        background: (theme) =>
                                                            theme.palette
                                                                .primary.dark,
                                                    },
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                Add
                                            </Typography>
                                        </StyledButton>
                                    ),
                                }}
                                sx={{
                                    p: 0,
                                    m: 0,

                                    "& .MuiInputBase-input": {
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                    },

                                    "&&": {
                                        "& .MuiInputBase-root": {
                                            color: (theme) =>
                                                theme.palette.grey.grey600,
                                        },
                                    },
                                    //enforce color of input
                                }}
                            />
                        )}
                    />
                </Box>
            </Box>
        </>
    );
};

export default MoreInfoBottom;
