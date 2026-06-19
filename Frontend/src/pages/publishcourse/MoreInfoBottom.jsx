import { alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import InstructorProfile from "../../components/InstructorProfile";
import { StyledButton } from "../../components/StyledButton";
import { apiFetch } from "../../api/apiFetch";
import { useState, useEffect } from "react";

const MoreInfoBottom = ({
    courseState,
    setCourseState,
    instructor,
    setInstructor,
    addInstructor,
}) => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");

    // Async search state
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debounced search effect
    useEffect(() => {
        if (inputValue.trim().length < 2) {
            setOptions([]);
            return;
        }

        setLoading(true);

        const delayDebounceFn = setTimeout(async () => {
            try {
                const data = await apiFetch({
                    url: `/api/v1/users/search`,
                    method: "GET",
                    params: { q: inputValue },
                });

                if (data.success) {
                    setOptions(
                        data.users.map((user) => ({
                            label: user.name,
                            value: user._id,
                        }))
                    );
                }
            } catch (err) {
                console.error("Error searching users:", err);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => {
            clearTimeout(delayDebounceFn);
            setLoading(false);
        };
    }, [inputValue]);

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
                                    top: "0.5rem",
                                    right: "0.5rem",
                                    zIndex: 10,
                                    width: "2rem",
                                    height: "2rem",
                                    bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
                                    backdropFilter: "blur(4px)",
                                    boxShadow: 1,
                                    color: (theme) => theme.palette.text.secondary,
                                    transition: "all 0.2s",
                                    "&:hover": {
                                        bgcolor: (theme) => theme.palette.error.main,
                                        color: "white",
                                        transform: "scale(1.1)"
                                    }
                                }}
                                size="small"
                                title="Remove Instructor"
                            >
                                <CloseIcon fontSize="small" />
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
                        onInputChange={(event, newInputValue, reason) => {
                            if (reason === "input") {
                                setInputValue(newInputValue);
                            }
                        }}
                        value={instructor}
                        loading={loading}
                        filterOptions={(x) => x}
                        isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                        }
                        getOptionLabel={(option) => option?.label || ""}
                        id="course-instructors"
                        options={options}
                        noOptionsText={
                            inputValue.trim().length < 2
                                ? "Type at least 2 characters to search"
                                : "No users found"
                        }
                        sx={{
                            width: "100%",
                            p: 0,
                            m: 0,
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search for an instructor..."
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
                                    endAdornment: (
                                        <>
                                            {loading ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                                sx={{
                                    width: "100%",
                                    "& .MuiInputBase-input": {
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        minHeight: "3rem",
                                    }
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
