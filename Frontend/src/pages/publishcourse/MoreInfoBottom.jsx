import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import InstructorProfile from "../../components/InstructorProfile";
import { StyledButton } from "../../components/StyledButton";
import { colorTokens } from "../../theme";

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
                    <InputLabel htmlFor="course-instructors">
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 1,
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
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
                                    color: (theme) => theme.palette.text.secondary,
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
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Add Instructor"
                                size="small"
                                fullWidth
                                variant="outlined"
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
                                                    background: (theme) => theme.palette.primary.light,
                                                    color: (theme) => theme.palette.common.white,
                                                    "&:hover": {
                                                        background: (theme) => theme.palette.primary.dark,
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
                                    width: "100%",
                                    "& .MuiInputBase-input": {
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                    },
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
