import Course from "../models/Course.js";
import People from "../models/People.js";
import { deleteImage } from "../utils/cloudinary.js";

const newCourse = async (req, res) => {
    //console.log(req.userId);

    try {
        const courseInfo = {
            category: req.body.category ? req.body.category : "",
            courseTitle: req.body.courseTitle ? req.body.courseTitle : "",
            courseDescription: req.body.courseDescription
                ? req.body.courseDescription
                : "",
            studentRequirements: req.body.studentRequirements
                ? req.body.studentRequirements
                : "",
            skillTags: req.body.skillTags ? req.body.skillTags : [],
            courseThumbnail: req.body.courseThumbnail
                ? req.body.courseThumbnail
                : "",
            introVideo: req.body.introVideo ? req.body.introVideo : "",
            courseLanguage: req.body.courseLanguage
                ? req.body.courseLanguage
                : "",
            coursePrice: req.body.coursePrice ? req.body.coursePrice : "",
            approxTimeToComplete: req.body.approxTimeToComplete
                ? req.body.approxTimeToComplete
                : "",
            courseInstructors: req.body.courseInstructors
                ? req.body.courseInstructors
                : [],
            lessons: req.body.lessons ? req.body.lessons : [],
            courseStatus: req.body.courseStatus
                ? req.body.courseStatus
                : "draft",
            owner: req.userId,
        };

        const newCourse = new Course(courseInfo);
        const savedCourse = await newCourse.save();

        // update the owner's courses
        // const owner = await People.findById(req.userId);
        // console.log(owner);
        // owner.courses.push(savedCourse._id);
        // console.log("owner", owner);
        // await owner.save();

        res.status(200).json({
            success: true,
            courseInfo: savedCourse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getDraftCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            owner: req.userId,
            courseStatus: "draft",
        });
        //console.log(courses);
        if (!courses || courses.length === 0) {
            // status 200 because it is ok to not draft course
            return res.status(200).json({
                success: false,
                message: "No courses found",
            });
        }
        res.status(200).json({
            success: true,
            courseInfo: courses[0],
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message,
        });
    }
};

const updateCourse = async (req, res) => {
    let courseId = req.params.courseId;
    const status = req.params.status;

    // console.log("update course", courseId, status);
    if (courseId == undefined || courseId == "undefined") {
        return res.status(400).json({
            success: false,
            message: "Course ID is required",
        });
    }
    else if (req.body?.id && req.body.id != courseId) {
        return res.status(400).json({
            success: false,
            message: "Course ID does not match",
        });
    }

    try {
        let course;
        course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        courseId = course._id;

        if (parseFloat(req.body.coursePrice) < 0) {
            return res.status(400).json({
                success: false,
                errors: {
                    coursePrice: "Course price cannot be negative",
                },
            });
        }

        // delete the course from the courses of the previous instructors

        for (let i = 0; i < course.courseInstructors.length; i++) {
            if (
                !req.body?.courseInstructors?.includes(
                    course.courseInstructors[i]
                )
            ) {
                const instructor = await People.findById(
                    course.courseInstructors[i]
                );
                if (instructor) {
                    if (instructor.courses.includes(course._id)) {
                        const index = instructor.courses.indexOf(course._id);
                        instructor.courses.splice(index, 1);

                        await instructor.save();
                    }
                }
            }
        }

        // extract the fields which are modified

        let newObj = {};

        for (let key in req.body) {
            if (req.body[key] != course._doc[key]) {
                newObj[key] = req.body[key];
            }
        }

        const courseInfo = {
            // ...course._doc,
            // category: req.body.category ? req.body.category : "",
            // courseTitle: req.body.courseTitle ? req.body.courseTitle : "",
            // courseDescription: req.body.courseDescription ? req.body.courseDescription : "",
            // studentRequirements: req.body.studentRequirements ? req.body.studentRequirements : "",
            // skillTags: req.body.skillTags ? req.body.skillTags : [],
            // courseThumbnail: req.body.courseThumbnail ? req.body.courseThumbnail : "",
            // introVideo: req.body.introVideo ? req.body.introVideo : "",
            // courseLanguage: req.body.courseLanguage ? req.body.courseLanguage : "",
            // coursePrice: req.body.coursePrice ? req.body.coursePrice : "",
            // approxTimeToComplete: req.body.approxTimeToComplete ? req.body.approxTimeToComplete : "",
            // courseInstructors: req.body.courseInstructors ? req.body.courseInstructors : [],
            // lessons: req.body.lessons ? req.body.lessons : [],
            // courseStatus: status,
            ...newObj,
            courseStatus: status,
            owner: req.userId,
        };

        //console.log(courseInfo, req.body);
        const { _id, ...updateFields } = courseInfo;

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            updateFields,
            {
                new: true,
            }
        );

        // update the courses of updatedCourse.courseInstructors

        for (let i = 0; i < updatedCourse.courseInstructors.length; i++) {
            const instructor = await People.findById(
                updatedCourse.courseInstructors[i]
            );
            if (instructor) {
                if (!instructor.courses.includes(updatedCourse._id)) {
                    instructor.courses.push(updatedCourse._id);
                    await instructor.save();
                }
            }
        }

        const owner = await People.findById(req.userId);
        if (owner) {
            if (!owner.courses.includes(updatedCourse._id)) {
                owner.courses.push(updatedCourse._id);
                await owner.save();
            }
        }

        res.status(200).json({
            success: true,
            courseInfo: updatedCourse,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getCourseByIdWithOutPopulate = async (req, res) => {
    const courseId = req.params.courseId;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "No course found",
            });
        }

        res.status(200).json({
            success: true,
            courseInfo: course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getCourseById = async (req, res) => {
    const courseId = req.params.courseId;

    try {
        let course = await Course.findById(courseId)
            .populate({
                path: "courseInstructors",
                select: "_id name",
            })
            .populate("enrolledStudents ratings.ratings.userId");
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "No course found",
            });
        }

        course = course._doc;

        course.lessons = course.lessons.map((lesson) => {
            let subLessons = lesson.subLessons;
            subLessons = subLessons.map((subLesson) => {
                return { title: subLesson.title };
            });
            lesson = {
                ...lesson,
                subLessons: subLessons,
            };
            return lesson;
        });
        ///console.log(course);

        res.status(200).json({
            success: true,
            courseInfo: course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate(
            "courseInstructors owner enrolledStudents ratings.ratings.userId"
        );
        if (!courses) {
            return res.status(404).json({
                success: false,
                message: "No courses found",
            });
        }

        res.status(200).json({
            success: true,
            courseInfo: courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyCourses = async (req, res) => {
    try {
        // find courses with owner as req.userId or there is an entry req.userId inside courseInstructors
        const courses = await Course.find({
            $or: [{ owner: req.userId }, { courseInstructors: req.userId }],
        }).populate(
            "courseInstructors owner enrolledStudents ratings.ratings.userId"
        );
        if (!courses) {
            return res.status(404).json({
                success: false,
                message: "No courses found",
            });
        }

        res.status(200).json({
            success: true,
            courseInfo: courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteCourse = async (req, res) => {
    let courseId = req.params.courseId;

    try {
        let course = await Course.findById(courseId);
        // console.log(course);

        if (!courseId || !course || course.owner != req.userId) {
            return res.status(404).json({
                success: false,
                message: "No course found",
            });
        }

        if (course.courseThumbnail) {
            await deleteImage(course.courseThumbnail, "image");
        }
        if (course.introVideo) {
            await deleteImage(course.introVideo, "video");
        }

        //console.log("course", course);

        for (let i = 0; i < course.lessons?.length; i++) {
            for (let j = 0; j < course.lessons[i].subLessons?.length; j++) {
                if (course.lessons[i].subLessons[j]?.videoLink) {
                    await deleteImage(
                        course.lessons[i].subLessons[j].videoLink,
                        "video"
                    );
                }
            }
        }

        let instructors = course.courseInstructors;

        for (let i = 0; i < instructors.length; i++) {
            let instructor = await People.findById(instructors[i]);
            if (instructor) {
                let index = instructor.courses.indexOf(courseId);
                if (index > -1) {
                    instructor.courses.splice(index, 1);
                    await instructor.save();
                }
            }
        }

        let owner = await People.findById(req.userId);
        if (owner) {
            let index = owner.courses.indexOf(courseId);
            if (index > -1) {
                owner.courses.splice(index, 1);
                await owner.save();
            }
        }

        await Course.findByIdAndDelete(courseId);

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    deleteCourse,
    getAllCourses,
    getCourseById,
    getCourseByIdWithOutPopulate,
    getDraftCourses,
    getMyCourses,
    newCourse,
    updateCourse
};

