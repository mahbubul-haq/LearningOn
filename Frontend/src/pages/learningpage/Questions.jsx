import React, { useContext } from "react";
import { LearningCourseContext } from "../../state/LearningCourseContex";

const Questions = ({ courseInfo }) => {
  const { openedLesson } = useContext(LearningCourseContext);

  return <div>Questions</div>;
};

export default Questions;
