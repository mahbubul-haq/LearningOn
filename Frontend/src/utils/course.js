export const getEnrollmentStatus = (purchased, user, courseInfo) => {
    if (purchased) {
        let isCourseInstructor = courseInfo?.courseInstructors?.reduce(
            (cur, instructor) => {
                return cur || instructor._id == user._id;
            },
            false
        );
        let isCourseOwner = courseInfo?.owner?._id == user._id;

        if (isCourseInstructor || isCourseOwner) {
            return "View Lessons";
        } else {
            return "Go to Course";
        }
    } else {
        return "Enroll Now";
    }
};


export const getEnrollmentText = (purchased, user, courseInfo) => {
    let numberOfStudents = courseInfo?.enrolledStudents?.length || 0;
    if (numberOfStudents >= 5) {
        return `${numberOfStudents} learners enrolled`;
    } else {
        let isCourseInstructor = courseInfo?.courseInstructors?.reduce(
            (cur, instructor) => {
                return cur || instructor._id == user._id;
            },
            false
        );
        let isCourseOwner = courseInfo?.owner?._id == user._id;
        if (isCourseInstructor || isCourseOwner) {
            return `${numberOfStudents} learners enrolled`;
        } else if (purchased) {
            return `${numberOfStudents} learners enrolled`;
        } else {
            return "Enrollment available";
        }
    }
}



export const isPurchased = (user, courseInfo) => {
    if (
        courseInfo?.enrolledStudents?.reduce((cur, enrollMent) => {
            return cur || enrollMent.userId == user._id;
        }, false)
    ) {
        return true;
    }

    if (
        courseInfo?.courseInstructors?.reduce((cur, instructor) => {
            return cur || instructor._id == user._id;
        }, false)
    ) {
        return true;
    }

    if (courseInfo?.owner?._id == user._id) {
        return true;
    }

    return false;
};
