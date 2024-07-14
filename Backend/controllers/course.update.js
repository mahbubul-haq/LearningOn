import Course from "../models/Course.js";

const updateStatus = async (req, res) => {
    try {
        const { courseId, status } = req.body;

        const course = await Course.findByIdAndUpdate(
            courseId,
            {
                courseStatus: status,
            },
            {
                new: true,
            }
        );
        //console.log(course);

        res.status(200).json({
            success: true,
            course: course,
        });
    } catch (err) {
        res.status(200).json({
            success: false,
        });
    }
};

export { updateStatus };

