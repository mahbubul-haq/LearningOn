import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useContext, useEffect } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";

const MoreInfoTop = ({
    courseState,
    setCourseState,
    languages,
    errors,
    setErrors,

}) => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const { courseStateRef } = useContext(CreateCourseContext);
    const [coursePrice, setCoursePrice] = useState(courseState.coursePrice);

    useEffect(() => {
        if (!coursePrice) setCoursePrice(courseState.coursePrice);
    }, [courseState]);

    return (
        <>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: "1.5rem",
                width: "100%"
            }}>
                <Box>
                    <Box
                        sx={{
                            mb: "0.5rem",
                        }}
                    >
                        <InputLabel htmlFor="course-language">
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
                                Course Language
                            </Typography>
                        </InputLabel>
                    </Box>
                    <Box>
                        <Autocomplete
                            disablePortal
                            onChange={(event, value) => {
                                setCourseState({
                                    ...courseState,
                                    courseLanguage: value ? value.value : "",
                                });
                            }}
                            value={
                                courseState.courseLanguage === ""
                                    ? null
                                    : {
                                        label: courseState.courseLanguage,
                                        value: courseState.courseLanguage,
                                    }
                            }
                            id="course-language"
                            options={languages ? languages : [{ label: "No data" }]}
                            sx={{
                                width: "100%",
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Select language"
                                    size="small"
                                    fullWidth
                                    variant="outlined"
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
                        <InputLabel htmlFor="course-price">
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
                                Course Price in USD
                            </Typography>
                        </InputLabel>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        <TextField
                            placeholder="$50"
                            id="course-price"
                            inputProps={{
                                maxLength: 6,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <AttachMoneyIcon
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: "1.5rem",
                                        }}
                                        position="end"
                                    />
                                ),
                            }}
                            onChange={(event) => {
                                setCoursePrice(event.target.value && event.target.value > 0 && !(event.target.value == "0") ? event.target.value.toString() : "");
                                courseStateRef.current.coursePrice = event.target.value && event.target.value > 0 && !(event.target.value == "0") ? event.target.value.toString() : "";
                            }}
                            onBlur={(event) => {
                                setCourseState({
                                    ...courseStateRef.current
                                });

                                if (event.target.value === "" || event.target.value <= 0 || event.target.value == "0") {
                                    setErrors({
                                        ...errors,
                                        coursePrice: "",
                                    });
                                }
                            }}

                            value={
                                coursePrice ? coursePrice.toString() : ""
                            }
                            fullWidth
                            variant="outlined"
                            sx={{
                                "& .MuiInputBase-input": {
                                    fontSize: "1.5rem",
                                    fontWeight: "600",
                                    color: "text.primary",
                                },
                            }}
                        />

                        {errors.coursePrice && (
                            <Typography
                                sx={{
                                    color: "error.main",
                                }}
                            >
                                {errors.coursePrice}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MoreInfoTop