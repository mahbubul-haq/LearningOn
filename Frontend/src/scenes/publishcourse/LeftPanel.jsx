import { useEffect} from "react";
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
    const { courseState,  inputSection, setInputSection } =
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
                paddingRight: "0.5rem",
            }}
        >
            <LeftPanelBasicInfo
                basicInfo={basicInfo}
                courseState={courseState}
                setInputSection={setInputSection}
                inputSection={inputSection}
            />

            <LeftPanelMedia
                media={media}
                courseState={courseState}
                setInputSection={setInputSection}
                inputSection={inputSection}
            />
            
            
            <LeftPanelMoreInfo
                moreInfo={moreInfo}
                courseState={courseState}
                setInputSection={setInputSection}
                inputSection={inputSection}
            />
            
            <LeftPanelCourseContent
                courseState={courseState}
                setInputSection={setInputSection}
                inputSection={inputSection}
            />

        </Box>
    );
};

export default LeftPanel;
