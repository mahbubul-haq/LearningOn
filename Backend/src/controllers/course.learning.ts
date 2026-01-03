import CourseProgress from "../models/CourseProgress.js";
import Course from "../models/Course.js";

const getCourseProgress = async (req: any, res: any) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.userId;

        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        });

        if (!courseProgress) {
            courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
            });
        }
        const course = await Course.findById(courseId);

        if (course) {
            let lessonProgressMap = new Map();
            courseProgress.lessonsProgress?.forEach((lesson: any) => {
                lessonProgressMap.set(lesson.lessonId.toString(), lesson);
            });
            let totalSubLessons = 0, totalCompletedSubLessons = 0;
            let lessonsMap = new Map();

            for (let i = 0; i < course.lessons?.length; i++) {
                lessonsMap.set(course.lessons[i]._id?.toString(), course.lessons[i]);

                // adds progress for new lessons
                if (!lessonProgressMap.has(course.lessons[i]._id?.toString())) {
                    lessonProgressMap.set(course.lessons[i]._id?.toString(), {
                        lessonId: course.lessons[i]._id!,
                        subLessonsProgress: [],
                        completed: false,
                        progressPercentage: 0,
                    });
                }
                let lessonProgress = lessonProgressMap.get(course.lessons[i]._id?.toString());
                let subLessonMap = new Map();
                lessonProgress?.subLessonsProgress?.forEach((subLesson: any) => {
                    subLessonMap.set(subLesson.subLessonId.toString(), subLesson);
                });

                let availableSubLessonSet = new Set();
                let totalThisLessonCompletedSubLessons = 0;

                // adds progress for new sublessons
                for (let j = 0; j < course.lessons[i].subLessons?.length; j++) {
                    availableSubLessonSet.add(course.lessons[i].subLessons[j]._id?.toString());
                    if (!subLessonMap.has(course.lessons[i].subLessons[j]._id?.toString())) {
                        subLessonMap.set(course.lessons[i].subLessons[j]._id?.toString(), {
                            subLessonId: course.lessons[i].subLessons[j]._id!,
                            completed: false,
                            videoDuration: course.lessons[i].subLessons[j].videoDuration,
                        });
                    } else {
                        totalThisLessonCompletedSubLessons += subLessonMap.get(course.lessons[i].subLessons[j]._id?.toString())?.completed ? 1 : 0;
                        totalCompletedSubLessons += subLessonMap.get(course.lessons[i].subLessons[j]._id?.toString())?.completed ? 1 : 0;
                    }
                    totalSubLessons++;

                }

                // handles deleted sublessons
                if (availableSubLessonSet.size < subLessonMap.size) {
                    for (let [key] of subLessonMap) {
                        if (!availableSubLessonSet.has(key)) {
                            subLessonMap.delete(key);
                        }
                    }
                }

                lessonProgress.progressPercentage = (totalThisLessonCompletedSubLessons / course.lessons[i].subLessons?.length) * 100;
                lessonProgress.completed = totalThisLessonCompletedSubLessons == course.lessons[i].subLessons?.length;
                lessonProgress.subLessonsProgress = Array.from(subLessonMap.values());
            }
            // handles deleted lessons
            if (lessonProgressMap.size > lessonsMap.size) {
                for (let [key] of lessonProgressMap) {
                    if (!lessonsMap.has(key)) {
                        lessonProgressMap.delete(key);
                    }
                }
            }

            courseProgress.lessonsProgress = Array.from(lessonProgressMap.values());
            courseProgress.progressPercentage = (totalCompletedSubLessons / totalSubLessons) * 100;
            courseProgress.completed = totalCompletedSubLessons == totalSubLessons;
            await courseProgress.save();

            return res.status(200).json({
                success: true,
                message: "Course Progress Found",
                courseProgress,
            });
        }

        return res.status(404).json({
            success: false,
            message: "Course not found",
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const updateWatchTime = async (req: any, res: any) => {
    try {
        const userId = req.userId;
        const courseId = req.params.courseId;
        const { lessonId, subLessonId, currentTime, watchTime } = req.body;

        await CourseProgress.updateOne({
            courseId: courseId,
            userId: userId
        }, {
            $set: {
                "lessonsProgress.$[lesson].subLessonsProgress.$[subLesson].currentTime": currentTime,
                "lessonsProgress.$[lesson].subLessonsProgress.$[subLesson].watchTime": watchTime,
            }
        }, {
            arrayFilters: [
                { "lesson.lessonId": lessonId },
                { "subLesson.subLessonId": subLessonId }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Watch Time Updated",
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}



const updateProgress = async (req: any, res: any) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.userId;
        const { lessonId, subLessonId } = req.body;

        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        });

        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course Progress Not Found",
            });
        }

        let isCurLessonComplete = true, isOtherLessonsComplete = true;
        let curLessonCompletedSubLessons = 0;
        let curLessonTotalSubLessons = 0;
        let totalSubLessons = 0;
        let totalCompletedSubLessons = 0;
        courseProgress.lessonsProgress.forEach((lesson: any) => {
            if (lesson.lessonId.toString() === lessonId) {
                totalSubLessons += lesson.subLessonsProgress.length;
                lesson.subLessonsProgress.forEach((subLesson: any) => {
                    if (subLesson.subLessonId.toString() != subLessonId && !subLesson.completed) {
                        isCurLessonComplete = false;
                        return;
                    }
                    if (subLesson.completed || subLesson.subLessonId.toString() == subLessonId) {
                        totalCompletedSubLessons++;
                        curLessonCompletedSubLessons++;
                    }
                    curLessonTotalSubLessons++;
                });
            } else if (lesson.lessonId.toString() != lessonId && !lesson.completed) {
                isOtherLessonsComplete = false;
                totalSubLessons += lesson.subLessonsProgress.length;
                totalCompletedSubLessons += lesson.subLessonsProgress.filter((subLesson: any) => subLesson.completed)?.length || 0;
            }
            else {
                totalSubLessons += lesson.subLessonsProgress.length;
                totalCompletedSubLessons += lesson.subLessonsProgress.length;
            }
        });

        // console.log(lessonId, subLessonId);
        let update: any = {
            "lessonsProgress.$[l].subLessonsProgress.$[s].completed": true
        };

        if (isCurLessonComplete) {
            update["lessonsProgress.$[l].completed"] = true;
        }


        if (isOtherLessonsComplete && isCurLessonComplete) {
            update["completed"] = true;
        }

        update["lessonsProgress.$[l].progressPercentage"] = (curLessonCompletedSubLessons / curLessonTotalSubLessons) * 100;
        update["progressPercentage"] = (totalCompletedSubLessons / totalSubLessons) * 100;

        const updatedCourseProgress = await CourseProgress.findOneAndUpdate(
            {
                courseId,
                userId,
            },
            {
                $set: update
            },
            {
                arrayFilters: [
                    { "l.lessonId": lessonId },
                    { "s.subLessonId": subLessonId }
                ],
                new: true,
                lean: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Course Progress Updated",
            courseProgress: updatedCourseProgress,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export { getCourseProgress, updateProgress, updateWatchTime };