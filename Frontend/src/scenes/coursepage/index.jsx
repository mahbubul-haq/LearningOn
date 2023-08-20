import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const CoursePage = () => {
    const { courseId } = useParams();

    useEffect(() => {
        console.log(courseId);
    }, []);

    return <div>CoursePage</div>;
};

export default CoursePage;
