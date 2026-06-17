import Category from "../../models/Category.js";
import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";
import QuizAttempt from "../../models/QuizAttempt.js";
import { getFilteredCourses, getPublishedCoursesByCategory, getRecentCourses, getRelatedCourses, getTrendingCourses, getUserCourses } from "../../services/courses/course.query.service.js";

// ================================== NEW CONTROLLERS =================================

const getCourses = async (req, res) => {

    const { trending, recent, category, courseId, userId, courseStatus, limit, page, coursePerPage } = req.query;
    // console.log("category", category);
    // console.log("courseId", courseId);
    let courses = [];
    console.log("page", page, coursePerPage);
    if (trending == "true") {
        courses = await getTrendingCourses()
    }
    else if (recent == "true") {
        courses = await getRecentCourses()
    }
    else if (category && courseId) {
        courses = await getRelatedCourses(category, courseId);
    }
    else if (category && limit) {
        courses = await getPublishedCoursesByCategory(category, limit);
    }
    else if (userId && courseStatus) {
        courses = await getUserCourses(userId, courseStatus);
    } else if (page && coursePerPage) {
        const data = await getFilteredCourses(category, page, coursePerPage);
        return res.status(200).json({
            success: true,
            courses: data.courses,
            totalDocuments: data.totalDocuments
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid query parameters"
        })
    }

    return res.status(200).json({
        success: true,
        courses: courses
    })

}


// ================================== OLD CONTROLLERS =================================



const getUnpublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            courseStatus: "unpublished",
        }).populate("owner");

        res.status(200).json({
            success: true,
            courses: courses,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
        });
    }
};

const getPopularCourses = async (req, res) => {
    try {
        const { category } = req.query;
        let courses;

        if (category === "all") {
            courses = await Course.find(
                {
                    courseStatus: "published",
                },
                {
                    courseTitle: 1,
                    courseThumbnail: 1,
                    owner: 1,
                    ratings: 1,
                    // 'ratings.ratings': 0,
                    coursePrice: 1,
                    skillTags: 1,
                    category: 1,
                    courseStatus: 1,
                    enrolledStudentsCount: 1,
                }
            )
                .sort({ "ratings.totalRating": -1 })
                .limit(30)
                .populate("owner", "name");
        } else {
            courses = await Course.find(
                {
                    courseStatus: "published",
                    category: category,
                },
                {
                    courseTitle: 1,
                    courseThumbnail: 1,
                    owner: 1,
                    ratings: 1,
                    // 'ratings.ratings': 0,
                    coursePrice: 1,
                    skillTags: 1,
                    category: 1,
                    courseStatus: 1,
                    enrolledStudentsCount: 1,
                }
            )
                .sort({ "ratings.totalRating": -1 })
                .limit(30)
                .populate("owner", "name");
        }
        courses = courses.map((course) => {
            return {
                ...course._doc,
                ratings: {
                    totalRating: course.ratings.totalRating,
                    numberOfRatings: course.ratings.numberOfRatings,
                },
            };
        });

        res.status(200).json({
            success: true,
            courses: courses,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
        });
    }
};

const getCourseLessons = async (req, res) => {
    // console.log("getCourseLessons", req.params.courseId, req.userId);
    try {
        const userId = req.userId;
        const courseId = req.params.courseId;

        let course = await Course.findById(courseId, {
            lessons: 1,
            courseInstructors: 1,
            courseThumbnail: 1,
            owner: 1,
            courseTitle: 1,
            enrolledStudents: 1, ///improvement -> just select the ids instead of whole objects
        }).populate("enrolledStudents", "userId")
        // console.log(course, userId);

        if (
            course?.owner == userId ||
            course?.courseInstructors?.reduce(
                (res, ins) => res || ins == userId,
                false
            ) ||
            course?.enrolledStudents?.reduce(
                (res, enrollment) => res || enrollment?.userId == userId,
                false
            )
        ) {
            let courseInfo = {
                _id: course._doc?._id,
                lessons: course._doc?.lessons,
                courseTitle: course._doc?.courseTitle,
                courseThumbnail: course._doc?.courseThumbnail,
            };

            //console.log(courseInfo);
            const lessonIds = courseInfo.lessons?.map((lesson) => lesson._id);
            let quizInfo = await QuizAttempt.find({
                lessonId: { $in: lessonIds },
                userId: userId,
                courseId: courseId,
            }).select("score progress lessonId status quizEndTime").lean();
            // console.log(quizInfo);//score, progress,  lessonId, status needed
            let quizMap = new Map(
                quizInfo.map((quiz) => [quiz.lessonId.toString(), quiz])
            );


            courseInfo.lessons = courseInfo.lessons?.map((lesson) => {
                if (lesson.questions && lesson.questions?.questions?.length > 0) {
                    lesson.quiz ??= {};
                    let quiz = quizMap.get(lesson._id.toString());
                    lesson.quiz.metadata = {
                        numberOfQuestions: lesson.questions.questions?.length,
                        examDuration: lesson.questions.examDuration == Number.MAX_SAFE_INTEGER ? Math.max(5 * 60, lesson.questions.questions?.length * 90) : lesson.questions.examDuration,
                    }
                    if (quiz) {
                        lesson.quiz.metadata.score = quiz.score;
                        lesson.quiz.metadata.progress = quiz.progress;
                        lesson.quiz.metadata.status = quiz.quizEndTime < new Date() ? "completed" : quiz.status;
                        lesson.quiz.metadata.remainingTime = Math.max(0, new Date(quiz.quizEndTime).getTime() - new Date().getTime()) / 1000;
                    }

                    return {
                        description: lesson.description,
                        subLessons: lesson.subLessons,
                        title: lesson.title,
                        _id: lesson._id,
                        quiz: lesson.quiz,
                    }
                } else return lesson;
            });
            // console.log(courseInfo);

            res.status(200).json({
                success: true,
                courseInfo: courseInfo,
            });
        } else {
            res.status(403).json({
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
        });
    }
};




export {
    getCourseLessons,
    getFilteredCourses,
    getPopularCourses,
    getUnpublishedCourses,
    getCourses,

};

