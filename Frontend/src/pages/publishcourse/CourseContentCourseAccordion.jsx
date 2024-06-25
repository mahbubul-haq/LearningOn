import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useTheme from "@mui/material/styles/useTheme";
import { StyledButton } from "../../components/StyledButton";
import StyledTextField1 from "../../components/StyledTextField1";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CourseContentSublesson from "./CourseContentSublesson";
import InputLabel from "@mui/material/InputLabel";

const CourseContentCourseAccordion = ({
    lesson,
    index,
    expanded,
    handleExpand,
    handleInput,
    deleteLesson,
    deleteSubLesson,
    courseState,
    setCourseState,
    subExpanded,
    videoLinks,
    setVideoLinks,
}) => {
    const theme = useTheme();

    return (
        <Accordion
            sx={{
                backgroundColor: "white",
            }}
            expanded={expanded === `panel${index}`}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon
                        sx={{
                            color: theme.palette.grey.grey800,
                            fontSize: "2rem",
                            p: 0,
                            m: 0,
                        }}
                        onClick={(event) => {
                            handleExpand(event, index);
                        }}
                    />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    backgroundColor: (theme) => theme.palette.grey.grey50,
                }}
                onClick={(event) => {
                    handleExpand(event, index);
                }}
            >
                <Typography
                    sx={{
                        fontSize: "1.2rem",
                        color: theme.palette.grey.grey800,
                    }}
                >
                    <span
                        style={{
                            color: theme.palette.grey.grey800,
                            fontWeight: "600",
                        }}
                    >
                        Lesson {index + 1}
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {lesson.title}
                </Typography>
                <StyledButton
                    variant="outlined"
                    sx={{
                        ml: "auto",
                        mr: "1rem",
                        color: (theme) => theme.palette.grey.grey600,
                        borderColor: (theme) => theme.palette.grey.grey600,
                        "&&": {
                            padding: "0.3rem 1rem",
                        },
                    }}
                    onClick={async (event) => {
                        event.stopPropagation();

                        await deleteLesson(index);
                    }}
                >
                    Delete
                </StyledButton>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    padding: "1.5rem",
                }}
            >
                <InputLabel htmlFor="title">
                    <Typography
                        variant="h6"
                        sx={{
                            mb: "0.5rem",
                            fontWeight: "600",
                            color: (theme) => theme.palette.grey.grey600,
                        }}
                    >
                        Title{" "}
                        <span
                            style={{
                                color: "red",
                                fontSize: "1.1rem",
                            }}
                        >
                            *
                        </span>
                    </Typography>
                </InputLabel>

                <StyledTextField1
                    placeholder="Title of the lesson"
                    multiline
                    rows={1}
                    id="title"
                    name="title"
                    inputProps={{
                        maxLength: 100,
                    }}
                    // change font size of input
                    onChange={(event) => handleInput(event, index)}
                    value={lesson.title}
                    sx={{
                        p: 0,
                        "& .MuiInputBase-input": {
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: (theme) => theme.palette.grey.grey600,
                        },
                        width: "100%",
                    }}
                />

                <InputLabel htmlFor="description">
                    <Typography
                        variant="h6"
                        sx={{
                            mb: "0.5rem",
                            fontWeight: "600",
                            color: (theme) => theme.palette.grey.grey600,
                        }}
                    >
                        Description
                    </Typography>
                </InputLabel>

                <StyledTextField1
                    placeholder="Description of the lesson"
                    multiline
                    rows={5}
                    id="description"
                    name="description"
                    inputProps={{
                        maxLength: 2000,
                    }}
                    // change font size of input
                    onChange={(event) => handleInput(event, index)}
                    value={lesson.description}
                    sx={{
                        fontSize: "0.9rem",
                        letterSpacing: "0.01rem",
                        lineHeight: "1.5rem",
                        fontWeight: "400",
                        width: "100%",

                        color: (theme) => theme.palette.grey.grey600,
                    }}
                />

                <CourseContentSublesson
                    lesson={lesson}
                    index={index}
                    subExpanded={subExpanded}
                    handleExpand={handleExpand}
                    handleInput={handleInput}
                    deleteSubLesson={deleteSubLesson}
                    videoLinks={videoLinks}
                    setVideoLinks={setVideoLinks}
                />

                <Fab
                    variant="extended"
                    size="medium"
                    sx={{
                        mt: "1rem",
                        backgroundColor: (theme) =>
                            theme.palette.background.buttonBgPink,
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: (theme) =>
                                theme.palette.background.buttonBgPinkDark,
                        },
                    }}
                    onClick={() => {
                        setCourseState({
                            ...courseState,
                            lessons: [
                                ...courseState.lessons.map(
                                    (curLesson, curIndex) => {
                                        if (curIndex === index) {
                                            return {
                                                ...curLesson,
                                                subLessons: [
                                                    ...curLesson.subLessons,
                                                    {
                                                        title: "",
                                                        lectureNote: "",
                                                        videoLink: "",
                                                    },
                                                ],
                                            };
                                        }
                                        return curLesson;
                                    }
                                ),
                            ],
                        });
                    }}
                >
                    <AddIcon sx={{ mr: "0.5rem" }} />
                    <Typography
                        sx={{
                            fontWeight: "600",
                            color: (theme) => theme.palette.text.primary,
                            textTransform: "capitalize",
                        }}
                    >
                        Add Lesson {index + 1}.{lesson.subLessons.length + 1}
                    </Typography>
                </Fab>
            </AccordionDetails>
            <AccordionActions></AccordionActions>
        </Accordion>
    );
};

export default CourseContentCourseAccordion;
