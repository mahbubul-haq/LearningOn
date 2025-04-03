import React, { useContext, useEffect } from "react";
import { LearningCourseContext } from "../../state/LearningCourseContex";

const Questions = ({ courseInfo, progressData }) => {
  const { openedLesson } = useContext(LearningCourseContext);

  useEffect(() => {
    console.log("questions", courseInfo);
    console.log("progressData", progressData);
  })


  return <div>Questions</div>;
};

export default Questions;
