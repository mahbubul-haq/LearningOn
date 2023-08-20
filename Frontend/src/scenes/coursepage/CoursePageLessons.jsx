import React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyledButton } from "../../components/StyledButton";
import { InputLabel, TableCell } from "@mui/material";
import { Box } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const CoursePageLessons = ({ courseInfo }) => {
    const [expanded, setExpanded] = React.useState("");

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
            {courseInfo.lessons?.map((lesson, index) => (
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
                                Lesson {index + 1}
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

                                    color: (theme) =>
                                        theme.palette.grey.grey800,
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
                                    {lesson.subLessons.map(
                                        (subLesson, subIndex) => (
                                            <TableRow
                                                key={index + " " + subIndex}
                                            >
                                                <TableCell
                                                    sx={{
                                                        fontSize: "1rem",

                                                        color: theme.palette
                                                            .grey.grey800,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Lesson {index + 1}.
                                                        {subIndex + 1}
                                                    </span>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    {subLesson.title}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
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
