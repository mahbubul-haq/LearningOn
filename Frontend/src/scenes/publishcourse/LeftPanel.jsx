import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import FlexBetween from "../../components/FlexBetween";

import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { StyledCheckbox } from "../../components/StyledButton";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import state from "../../state";

const basicInfo = [
    ["Category", "category"],
    ["Course Title", "courseTitle"],
    ["Course Description", "courseDescription"],
    ["Student Requirements", "studentRequirements"],
    ["Skill Tags", "skillTags"],
];

const media = [
    ["Course Thumbnail", "courseThumbnail"],
    ["Intro Video", "introVideo"],
];
const moreInfo = [
    ["Course Language", "courseLanguage"],
    ["Course Price", "coursePrice"],
    ["Approx Time to Complete", "approxTimeToComplete"],
    ["Course Instructors", "courseInstructors"],
];

const LeftPanel = () => {

    const {courseState, setCourseState} = useContext(CreateCourseContext);
    console.log(courseState);

    // setCourseState({
    //     ...courseState,
    //     category: "hello"
    // });

    useEffect(() => {
        setCourseState({
            ...courseState,
            category: "hello",
            courseTitle: "hello",
            courseDescription: "hello",
            studentRequirements: "hello",
            skillTags: "hello",
        });
    }, []);

    return (
        
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "600",
                        mb: "0.2rem",
                    }}
                >
                    Basic Info
                </Typography>
                {basicInfo.map((item, index) => (
                    <FlexBetween
                        key={item}
                        gap="0.5rem"
                        sx={{
                            "&&": {
                                justifyContent: "flex-start",
                                alignItems: "center",
                            },
                        }}
                    >
                        <StyledCheckbox
                            icon={
                                <RadioButtonUncheckedIcon
                                    sx={{
                                        fontSize: "1.1rem",
                                    }}
                                />
                            }
                            checkedIcon={
                                <CheckCircleIcon
                                    sx={{
                                        fontSize: "1.1rem",
                                    }}
                                />
                            }
                            checked={courseState[item[1]].length > 0}
                            sx={{
                                "&&": {
                                    // different color if checked vs unchecked
                                    color: courseState[item[1]].length > 0 ? (theme) =>
                                        theme.palette.primary.dark : (theme) =>
                                        theme.palette.grey.grey400,
                                },
                                // border: "1px solid #E0E0E0"
                            }}
                        />

                        <Typography
                            variant="body1"
                            sx={{
                                color: (theme) => theme.palette.text.secondary,
                                // border: "1px solid #E0E0E0",
                                padding: "0",
                                fontSize: "0.8rem",
                            }}
                        >
                            {item[0]}
                        </Typography>
                    </FlexBetween>
                ))}

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "600",
                        mb: "0.2rem",
                        mt: "0.5rem",
                    }}
                >
                    Media
                </Typography>
                {media.map((item, index) => (
                    <FlexBetween
                        key={item}
                        gap="0.5rem"
                        sx={{
                            "&&": {
                                justifyContent: "flex-start",
                                alignItems: "center",
                            },
                        }}
                    >
                        <StyledCheckbox
                            icon={
                                <RadioButtonUncheckedIcon
                                    sx={{
                                        fontSize: "1.1rem",
                                    }}
                                />
                            }
                            checkedIcon={
                                <CheckCircleIcon
                                    sx={{
                                        fontSize: "1.1rem",
                                    }}
                                />
                            }
                            checked={courseState[item[1]].length > 0}
                            sx={{
                                "&&": {
                                    // different color if checked vs unchecked
                                    color: courseState[item[1]].length > 0 ? (theme) =>
                                        theme.palette.primary.dark : (theme) =>
                                        theme.palette.grey.grey400,

                                },
                                // border: "1px solid #E0E0E0"
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            {item[0]}
                        </Typography>
                    </FlexBetween>
                ))}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "600",
                        mb: "0.2rem",
                        mt: "0.5rem",
                    }}
                >
                    More Info
                </Typography>
                {moreInfo.map((item, index) => (
                    <FlexBetween
                        key={item}
                        gap="0.5rem"
                        sx={{
                            "&&": {
                                justifyContent: "flex-start",
                                alignItems: "center",
                            },
                        }}
                    >
                        <StyledCheckbox
                            icon={
                                <RadioButtonUncheckedIcon
                                    sx={{
                                        fontSize: "1.1rem",
                                    }}
                                />
                            }
                            checkedIcon={
                                <CheckCircleIcon
                                    sx={{
                                        fontSize: "1.1rem",
                                    }}
                                />
                            }
                            checked={courseState[item[1]].length > 0}
                            sx={{
                                "&&": {
                                    // different color if checked vs unchecked
                                    color: courseState[item[1]].length > 0 ? (theme) =>
                                        theme.palette.primary.dark : (theme) =>
                                        theme.palette.grey.grey400,
                                },
                                // border: "1px solid #E0E0E0"
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            {item[0]}
                        </Typography>
                    </FlexBetween>
                ))}

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "600",
                        mb: "0.2rem",
                        mt: "0.5rem",
                    }}
                >
                    Course Content
                </Typography>
                

                {/* <Box>
                    <StyledCheckbox
                        icon={
                            <RadioButtonUncheckedIcon
                                sx={{
                                    fontSize: "1.2rem",
                                }}
                            />
                        }
                        checkedIcon={
                            <CheckCircleIcon
                                sx={{
                                    fontSize: "1.2rem",
                                }}
                            />
                        }
                        checked={false}
                        sx={{
                            "&&": {
                                color: (theme) => theme.palette.primary.dark,
                            },
                        }}
                    />
                </Box> */}
            </Box>
        
    );
};

export default LeftPanel;
