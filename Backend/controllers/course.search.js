import Course from "../models/Course.js";
import Category from "../models/Category.js";

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
            courses = await Course.find({
                category: { $in: categories },
                courseStatus: "published",
            })
                .skip(skip)
                .limit(coursePerPage).populate("owner");

            totalDocuments = await Course.countDocuments({
                category: { $in: categories },
                courseStatus: "published"
            });
        } else {
            courses = await Course.find({courseStatus: "published"}).skip(skip).limit(coursePerPage).populate("owner");
            totalDocuments = await Course.countDocuments({
                courseStatus: "published"
            });
        }

        res.status(200).json({
            success: true,
            courses: courses,
            totalDocuments: totalDocuments
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "course could not be fetched",
        });
    }
};

export { getFilteredCourses };
