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

export { getFilteredCourses, getPopularCourses, getUnpublishedCourses };

