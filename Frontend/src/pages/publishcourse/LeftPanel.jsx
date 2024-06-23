import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import LeftPanelCourseContent from "./LeftPanelCourseContent";
import LeftPanelMoreInfo from "./LeftPanelMoreInfo";
import LeftPanelBasicInfo from "./LeftPanelBasicInfo";
import LeftPanelMedia from "./LeftPanelMedia";

const basicInfo = [
    ["Category", "category", 1],
    ["Course Title", "courseTitle", 2],
    ["Course Description", "courseDescription", 3],
    ["Student Requirements", "studentRequirements", 4],
    ["Skill Tags", "skillTags", 5],
];

const media = [
    ["Course Thumbnail", "courseThumbnail", 6],
    ["Intro Video", "introVideo", 7],
];
const moreInfo = [
    ["Course Language", "courseLanguage", 8],
    ["Course Price", "coursePrice", 9],
    ["Approx Time to Complete", "approxTimeToComplete", 10],
    ["Course Instructors", "courseInstructors", 11],
];

const LeftPanel = () => {
    const { courseState, inputSection, setInputSection, setMobileDrawerOpen } =
        useContext(CreateCourseContext);


    useEffect(() => {
        // setCourseState({
        //     ...courseState,
        //     category: "hello",
        //     courseTitle: "hello",
        //     courseDescription: "hello",
        //     studentRequirements: "hello",
        //     skillTags: "hello",
        // });
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                width: "100%",
            }}
        >
            <Box sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "auto 1fr",
            }}>
                <Box sx={{
                    width: "fit-content",
                    // backgroundColor: "#000",
                    height: inputSection === "basic info" ? "80%" : "0px",
                    transition: "height 0.5s",
                    mt: "2rem",
                    // mr: "1rem",
                    display: "flex",
                }}>
                    {new Array(3).fill(0).map((_, index) => (
                        <Box
                             sx={{
                            width: "3px",
                            height: inputSection === "basic info" ? "100%" : "0px",
                            backgroundColor: theme => theme.palette.primary.main,
                            borderRadius: "50%",
                            // my: "0.5rem",
                        }} key={index}></Box>
                    ))}
                </Box>
                <LeftPanelBasicInfo
                    basicInfo={basicInfo}
                    courseState={courseState}
                    setInputSection={setInputSection}
                    inputSection={inputSection}
                    setMobileDrawerOpen={setMobileDrawerOpen}
                />
            </Box>
            <Box sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "auto 1fr",
            }}>
                <Box sx={{
                    width: "fit-content",
                    // backgroundColor: "#000",
                    height: inputSection === "course media" ? "80%" : "0px",
                    transition: "height 0.5s",
                    // mr: "1rem",
                    mt: "2rem",
                    display: "flex",
                }}>
                    {new Array(3).fill(0).map((_, index) => (
                        <Box
                             sx={{
                            width: "3px",
                            height: inputSection === "course media" ? "100%" : "0px",
                            backgroundColor: theme => theme.palette.primary.main,
                            borderRadius: "50%",
                            // my: "0.5rem",
                        }} key={index}></Box>
                    ))}
                </Box>

                <LeftPanelMedia
                    media={media}
                    courseState={courseState}
                    setInputSection={setInputSection}
                    inputSection={inputSection}
                    setMobileDrawerOpen={setMobileDrawerOpen}
                />
            </Box>

            <Box sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "auto 1fr",
            }}>
                <Box sx={{
                    width: "fit-content",
                    // backgroundColor: "#000",
                    height: inputSection === "more info" ? "80%" : "0px",
                    transition: "height 0.5s",
                    // mr: "1rem",
                    mt: "2rem",
                    display: "flex",
                }}>
                    {new Array(3).fill(0).map((_, index) => (
                        <Box
                             sx={{
                            width: "3px",
                            height: inputSection === "more info" ? "100%" : "0px",
                            backgroundColor: theme => theme.palette.primary.main,
                            borderRadius: "50%",
                            // my: "0.5rem",
                        }} key={index}></Box>
                    ))}
                </Box>
                <LeftPanelMoreInfo
                    moreInfo={moreInfo}
                    courseState={courseState}
                    setInputSection={setInputSection}
                    inputSection={inputSection}
                    setMobileDrawerOpen={setMobileDrawerOpen}
                />
            </Box>

            <Box sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "auto 1fr",
            }}>
                <Box sx={{
                    width: "fit-content",
                    // backgroundColor: "#000",
                    height: inputSection === "course content" ? "90%" : "0px",
                    transition: "height 0.5s",
                    // mr: "1rem",
                    mt: "2rem",
                    display: "flex",
                }}>
                    {new Array(3).fill(0).map((_, index) => (
                        <Box
                             sx={{
                            width: "3px",
                            height: inputSection === "course content" ? "100%" : "0px",
                            backgroundColor: theme => theme.palette.primary.main,
                            borderRadius: "50%",
                            // my: "0.5rem",
                        }} key={index}></Box>
                    ))}
                </Box>
                <LeftPanelCourseContent
                    courseState={courseState}
                    setInputSection={setInputSection}
                    inputSection={inputSection}
                    setMobileDrawerOpen={setMobileDrawerOpen}
                />
            </Box>
        </Box>
    );
};

export default LeftPanel;
