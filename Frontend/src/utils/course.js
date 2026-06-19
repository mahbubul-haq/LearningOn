export const getEnrollmentButtonText = (user, courseInfo, enrollmentStatus) => {
    if (isOwnerOrInstructor(user, courseInfo)) {
        return "View Lessons";
    }
    else if (enrollmentStatus?.status === "open") {
        return "Complete Payment";
    }
    else if (enrollmentStatus?.status === "pending") {
        return "Enrollment Pending";
    }
    else if (enrollmentStatus?.status === "enrolled") {
        return "Go to Course";
    }
    else {
        return "Enroll Now";
    }
};


export const getEnrollmentText = (user, courseInfo, enrollmentStatus) => {

    //may update later
    if (isOwnerOrInstructor(user, courseInfo)) {
        return `${courseInfo?.enrolledStudentsCount || 0} learners enrolled`;
    }
    else if (enrollmentStatus?.status === "open") {
        return `${courseInfo?.enrolledStudentsCount || 0} learners enrolled`;
    }
    else if (enrollmentStatus?.status === "pending") {
        return `${courseInfo?.enrolledStudentsCount || 0} learners enrolled`;
    }
    else if (enrollmentStatus?.status === "enrolled") {
        return `${courseInfo?.enrolledStudentsCount || 0} learners enrolled`;
    }
    else {
        return `${courseInfo?.enrolledStudentsCount || 0} learners enrolled`;
    }
}


export const isOwnerOrInstructor = (user, courseInfo) => {
    if (!user || !courseInfo) return false;
    let isCourseInstructor = courseInfo?.courseInstructors?.reduce(
        (cur, instructor) => {
            return cur || instructor._id == user?._id;
        },
        false
    );
    let isCourseOwner = courseInfo?.owner == user?._id;
    return isCourseInstructor || isCourseOwner;
}

