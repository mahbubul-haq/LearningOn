import Category from "../../models/Category.js";
import Course from "../../models/Course.js";
import { isValidObjectId, Types } from "mongoose";


const getRelatedCourses = async (category, courseId) => {

    const courseIdObj = new Types.ObjectId(courseId);
    let categories = [category];
    const dbCategory = await Category.findOne({
        $or: [
            { name: category },             // parent category
            { subcategories: category }     // if it's a subcategory
        ]
    }, "name subcategories").lean();

    if (dbCategory) {
        categories = [...categories, ...dbCategory.subcategories];
    }

    let courses = await Course.find(
        {
            category: { $in: categories },
            courseStatus: "published",
            _id: { $ne: courseIdObj },
        },
        {
            courseTitle: 1,
            courseThumbnail: 1,
            owner: 1,
            ratings: 1,
            coursePrice: 1,
            skillTags: 1,
            courseStatus: 1,
            category: 1,
        }
    )
        .limit(4)
        .populate("owner", "name");

    // console.log(courses);

    if (courses.length < 4) {
        const excludeIds = courses.map((c) => c._id);
        excludeIds.push(courseIdObj);
        const remainingCount = 4 - courses.length;
        const randomCourses = await Course.aggregate([
            {
                $match: {
                    _id: { $nin: excludeIds },
                    courseStatus: "published",
                },
            },
            {
                $sample: { size: remainingCount },
            },
            {
                $lookup: {
                    from: "peoples",              // collection name in MongoDB
                    localField: "owner",        // field in Course
                    foreignField: "_id",        // field in User
                    as: "owner",                // output array field
                },
            },
            {
                $unwind: "$owner",            // convert array → object
            },
            {
                $project: {
                    courseTitle: 1,
                    courseThumbnail: 1,
                    ratings: 1,
                    coursePrice: 1,
                    skillTags: 1,
                    courseStatus: 1,
                    category: 1,
                    "owner._id": 1,
                    "owner.name": 1,
                },
            },
        ]);
        courses = [...courses, ...randomCourses];
    }

    courses = courses.map((course) => {
        const courseData = course._doc || course;
        return {
            ...courseData,
            ratings: {
                totalRating: courseData.ratings?.totalRating || 0,
                numberOfRatings: courseData.ratings?.numberOfRatings || 0,
            },
        };
    });

    return courses;

};

const getUserCourses = async (userId, courseStatus) => {

    const courses = await Course.find(
        { $or: [{ owner: userId }, { courseInstructors: userId }], courseStatus: courseStatus },
        {
            courseTitle: 1,
            courseThumbnail: 1,
            owner: 1,
            ratings: 1,
            coursePrice: 1,
            skillTags: 1,
            courseStatus: 1,
            category: 1
        }
    )
        .sort({ createdAt: -1 })
        .populate("owner", "name");

    return courses;

}

const getPublishedCoursesByCategory = async (category, limit) => {

    let query = { courseStatus: "published" }
    if (category !== "all") {
        query.category = category;
    }

    const courses = await Course.find(
        query,
        {
            courseTitle: 1,
            courseThumbnail: 1,
            owner: 1,
            ratings: 1,
            coursePrice: 1,
            skillTags: 1,
            courseStatus: 1,
            category: 1,
        }
    )
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("owner", "name")
        .lean();

    return courses;

}

const getFilteredCourses = async (category, page, coursePerPage) => {

    page = parseInt(page);
    coursePerPage = parseInt(coursePerPage);
    let skip = (page - 1) * coursePerPage;
    let categories = category ? [category] : [];
    let dbCategory,
        courses = [],
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
            .populate("owner", "name")
            .lean();

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
            .populate("owner", "name")
            .lean();
        totalDocuments = await Course.countDocuments({
            courseStatus: "published",
        });
    }

    return { courses, totalDocuments }


};



export {
    getRelatedCourses,
    getUserCourses,
    getPublishedCoursesByCategory,
    getFilteredCourses,
}