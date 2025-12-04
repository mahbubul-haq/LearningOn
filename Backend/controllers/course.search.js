import Category from "../models/Category.js";
import Course from "../models/Course.js";

const getFilteredCourses = async (req, res) => {
    try {
        let { category, page, coursePerPage } = req.query;
        page = parseInt(page);
        coursePerPage = parseInt(coursePerPage);
        let skip = (page - 1) * coursePerPage;
        let categories = category ? [category] : [];
        let dbCategory,
            courses,
            totalDocuments = 0;

        if (category) {
            dbCategory = await Category.findOne(
                { name: category },
                "name subcategories"
            );
        }

        if (dbCategory) {
            categories = [...categories, ...dbCategory.subcategories];
        }
        if (categories.length > 0) {
            ///console.log(categories, skip, coursePerPage);
            courses = await Course.find(
                {
                    category: { $in: categories },
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
                    courseStatus: 1,
                }
            )
                .skip(skip)
                .limit(coursePerPage)
                .populate("owner", "name");

            totalDocuments = await Course.countDocuments({
                category: { $in: categories },
                courseStatus: "published",
            });
        } else {
            courses = await Course.find(
                { courseStatus: "published" },
                {
                    courseTitle: 1,
                    courseThumbnail: 1,
                    owner: 1,
                    ratings: 1,
                    // 'ratings.ratings': 0,
                    coursePrice: 1,
                    skillTags: 1,
                    courseStatus: 1,
                }
            )
                .skip(skip)
                .limit(coursePerPage)
                .populate("owner", "name");
            totalDocuments = await Course.countDocuments({
                courseStatus: "published",
            });
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
            totalDocuments: totalDocuments,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "course could not be fetched",
        });
    }
};

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
    try {
        const userId = req.userId;
        const courseId = req.params.courseId;

        let course = await Course.findById(courseId, {
            lessons: 1,
            courseInstructors: 1,
            owner: 1,
            enrolledStudents: 1, ///improvement -> just select the ids instead of whole objects
        });
        ///console.log(course, userId);

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
            };

            courseInfo.lessons = courseInfo.lessons?.map((lesson) => {
                if (lesson.questions) {
                    lesson.questions = lesson.questions.map((q) => {
                        return {
                            options: q.options,
                            question: q.question,
                        };
                    });
                    return lesson;
                } else return lesson;
            });
            //console.log(courseInfo);

            res.status(200).json({
                success: true,
                courseInfo: courseInfo,
            });
        } else {
            res.status(401).json({
                success: false,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
        });
    }
};

export {
    getCourseLessons,
    getFilteredCourses,
    getPopularCourses,
    getUnpublishedCourses
};

