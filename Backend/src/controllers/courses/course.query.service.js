import Category from "../../models/Category.js";
import Course from "../../models/Course.js";


const getRelatedCourses = async (category, courseId, res) => {
    try {

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
                _id: { $ne: courseId },
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
            excludeIds.push(courseId);
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

        return res.status(200).json({
            success: true,
            courses: courses,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Related courses could not be fetched",
        });
    }
};


export {
    getRelatedCourses
}