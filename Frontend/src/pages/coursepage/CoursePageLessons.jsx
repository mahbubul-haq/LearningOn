import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

const CoursePageLessons = ({ courseInfo }) => {
    const [expanded, setExpanded] = React.useState("");
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const theme = useTheme();

    const handleExpand = (event, index) => {
        event.stopPropagation();

        if (expanded === `panel${index}`) {
            setExpanded("");
        } else {
            setExpanded(`panel${index}`);
        }
    };

    return (
        <React.Fragment>
            {courseInfo?.lessons?.map((lesson, index) => (
                <Accordion
                    key={index}
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
                        // sx={{
                        //     backgroundColor: (theme) =>
                        //         theme.palette.grey.grey50,
                        // }}
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
                                {isNonMobileScreens ? "Lesson" : ""} {index + 1}
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {lesson.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            padding: "0 1rem 1rem 1rem",
                        }}
                    >
                        {lesson.description && (
                            <Typography
                                sx={{
                                    lineHeight: "1.5rem",
                                    mb: "1rem",

                                    color: (theme) => theme.palette.grey.grey800,
                                }}
                            >
                                {lesson.description?.split("\n").map(
                                    (line, index) =>
                                        line && (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        )
                                )}
                            </Typography>
                        )}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {lesson.subLessons.map((subLesson, subIndex) => (
                                        <TableRow key={index + " " + subIndex}>
                                            <TableCell
                                                sx={{
                                                    fontSize: "1rem",

                                                    color: theme.palette.grey.grey800,
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {isNonMobileScreens ? "Lesson" : ""} {index + 1}.{subIndex + 1}
                                                </span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                {subLesson.title}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            ))}
        </React.Fragment>
    );
};

export default CoursePageLessons;
