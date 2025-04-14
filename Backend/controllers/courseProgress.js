import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";

const getCourseProgress = async (req, res) => {
    try {
        let courseProgress = await CourseProgress.findOne({
            userId: req.userId,
            courseId: req.params.courseId,
        });
        if (!courseProgress) {
            let course = await Course.exists(
                {
                    _id: req.params.courseId,
                },
            );
            //console.log(req.params.courseId, course);
            if (course) {
                //console.log(...courseProgress.quizProgress);
                //console.log(...courseProgress.lessonProgress);
                courseProgress = new CourseProgress({
                    userId: req.userId,
                    courseId: req.params.courseId,
                });
                await courseProgress.save();
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Course progress not found",
                });
            }
        }
        return res.status(200).json({
            success: true,
            courseProgress: courseProgress,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const submitQuiz = async (req, res) => {
    const { courseId } = req.params;
    const userId = req.userId;
    try {
        const { lesson, answer } = req.body;
        const progressData = await CourseProgress.findOne({
            courseId,
            userId,
        });
        if (!progressData) {
            return res.status(404).json({
                success: false,
                message: "Course progress not found",
            });
        }

        const course = await Course.findById(courseId,
            {
                "lessons": 1,
            }
        );
        //console.log(course, progressData);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        let questions = [];
        if (course.lessons[lesson - 1]?.questions) {
            questions = course.lessons[lesson - 1].questions;
        }

        Object.keys(answer).forEach((key) => {
            let lossonFromKey = parseInt(key.split("_")[0].substring(1));
            if (lesson != lossonFromKey) {
                return;
            }
            if (!answer[key]) {
                return;
            }
            let qidx = parseInt(key.split("_")[1]) - 1;
            let q = questions[qidx];
            let correctAnswer = q.answer;
            if (progressData.completed.includes(key)) {
                return;
            }
            if (correctAnswer == answer[key]) {
                if (!progressData.completed.includes(key)) progressData.completed.push(key);
                progressData.progressData = {
                    ...progressData.progressData,
                    [key]: {
                        isCorrect: true,
                        correctAnswer: answer[key],
                    },

                }
            }
            else {
                //console.log(progressData.ongoing, progressData.ongoing.includes(key), key);
                if (progressData.ongoing.includes(key)) {
                   // console.log("ongoing", key);
                    progressData.ongoing = progressData.ongoing.filter(val => val != key);
                    if (!progressData.completed.includes(key)) progressData.completed.push(key);
                    progressData.progressData = {
                        ...progressData.progressData,
                        [key]: {
                            isCorrect: false,
                            correctAnswer: correctAnswer,
                            yourAnswer: answer[key],
                        },

                    }

                }
                else {
                    //console.log("not ongoing", key, progressData.ongoing, progressData.ongoing.includes(key));
                    progressData.ongoing.push(key);
                    progressData.progressData = {
                        ...progressData.progressData,
                        [key]: {
                            yourAnswer: answer[key]
                        }
                    }
                }
            }
        })

        await progressData.save();


        return res.status(200).json({
            success: true,
            progressData: progressData,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

export { getCourseProgress, submitQuiz };

