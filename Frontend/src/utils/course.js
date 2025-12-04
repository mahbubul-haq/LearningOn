export const getEnrollmentStatus = (purchased, user, courseInfo) => {
    if (purchased) {
        let isCourseInstructor = courseInfo.courseInstructors?.reduce(
            (cur, instructor) => {
                return cur || instructor._id == user._id;
            },
            false
        );
        let isCourseOwner = courseInfo.owner?._id == user._id;

        if (isCourseInstructor || isCourseOwner) {
            return "Open Lessons";
        } else {
            return "Start Learning";
        }
    } else {
        return "Enroll Now";
    }
};

export const isPurchased = (user, courseInfo) => {
    if (
        courseInfo.enrolledStudents?.reduce((cur, enrollMent) => {
            return cur || enrollMent.userId == user._id;
        }, false)
    ) {
        return true;
    }

    if (
        courseInfo.courseInstructors?.reduce((cur, instructor) => {
            return cur || instructor._id == user._id;
        }, false)
    ) {
        return true;
    }

    if (courseInfo.owner?._id == user._id) {
        return true;
    }

    return false;
};
