import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StyledTextField1 from "../../components/StyledTextField1";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useState, useContext, useEffect} from "react";
import { CreateCourseContext } from "../../state/CreateCourse";

const MoreInfoTop = ({
    courseState,
    setCourseState,
    languages,
    errors,
    setErrors,
    
}) => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const {courseStateRef} = useContext(CreateCourseContext);
    const [coursePrice, setCoursePrice] = useState(courseState.coursePrice);

    useEffect(() => { 
        if (!coursePrice) setCoursePrice(courseState.coursePrice);
    }, [courseState]);

  return (
    <>
        <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="course-language">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",

                                color: (theme) => theme.palette.grey.grey600,
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
                            width: isMobileScreens ? "100%" : "250px",
                            maxWidth: "100%",
                        }}
                        renderInput={(params) => (
                            <StyledTextField1
                                placeholder="Select language"
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
            </Box>

            <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="course-price">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",

                                color: (theme) => theme.palette.grey.grey600,
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
                    <StyledTextField1
                        placeholder="$50"
                        multiline
                        maxRows={3}
                        id="course-price"
                        inputProps={{
                            maxLength: 6,
                        }}
                        InputProps={{
                            endAdornment: (
                                <AttachMoneyIcon
                                    sx={{
                                        color: (theme) => theme.palette.grey.grey600,
                                        fontSize: "2rem",
                                    }}
                                    position="end"
                                />
                            ),
                        }}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        //   }}
                        // change font size of input
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
                        sx={{
                            p: 0,
                            "& .MuiInputBase-input": {
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: (theme) => theme.palette.grey.grey600,
                            },
                            width: isMobileScreens ? "100%" : "300px",
                            maxWidth: "100%",
                            "&&": {
                                p: 0,
                            },
                        }}
                    />

                    {errors.coursePrice && (
                        <Typography
                            sx={{
                                color: (theme) => theme.palette.error.main,
                            }}
                        >
                            {errors.coursePrice}
                        </Typography>
                    )}
                </Box>
            </Box>
    </>
  )
}

export default MoreInfoTop