import React, { createContext, useEffect } from "react";
import { useSelector } from "react-redux";
import state from ".";
import axios from "axios";

export const CreateCourseContext = createContext();

const initialCourseState = {
    category: "",
    courseTitle: "",
    courseDescription: "",
    studentRequirements: "",
    skillTags: [],
    courseThumbnail: "",
    introVideo: "",
    courseLanguage: "",
    coursePrice: "",
    approxTimeToComplete: "",
    courseInstructors: [],
    lessons: [],
};

export const CreateCourseState = (props) => {
    const token = useSelector((state) => state.token);

    const [courseState, setCourseState] = React.useState({
        category: "",
        courseTitle: "",
        courseDescription: "",
        studentRequirements: "",
        skillTags: [],
        courseThumbnail: "",
        introVideo: "",
        courseLanguage: "",
        coursePrice: "",
        approxTimeToComplete: "",
        courseInstructors: [],
        lessons: [],
    });
    const [courseThumbnailInput, setCourseThumbnailInput] = React.useState("");
    const [introVideoInput, setIntroVideoInput] = React.useState("");
    const [inputSection, setInputSection] = React.useState("basic info");
    const [uploadProgress, setUploadProgress] = React.useState(-1);
    const [inputLessons, setInputLessons] = React.useState([]);
    const [uploadStatus, setUploadStatus] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [updating, setUpdating] = React.useState("");
    const [editMode, setEditMode] = React.useState(false);
    const [courseId, setCourseId] = React.useState("");

    // useEffect(() => {
    //     console.log(isCourseValid());
    // }, [courseState]);

    const isCourseValid = () => {
        if (
            courseState.category?.length === 0 ||
            courseState.courseTitle?.length === 0 ||
            courseState.courseDescription?.length === 0 ||
            courseState.studentRequirements?.length === 0 ||
            courseState.skillTags?.length === 0 ||
            courseState.courseThumbnail?.length === 0 ||
            courseState.introVideo?.length === 0 ||
            courseState.courseLanguage?.length === 0 ||
            courseState.coursePrice?.length === 0 ||
            courseState.approxTimeToComplete?.length === 0 ||
            courseState.courseInstructors?.length === 0 ||
            courseState.lessons?.length === 0
        )
            return false;

        for (let lesson of courseState.lessons) {
            if (!lesson.title) return false;
            for (let subLesson of lesson.subLessons) {
                if (!subLesson.title || !(subLesson.videoLink || subLesson.lectureNote)) return false;
            }
        }

        return true;
    };

    const getDraftCourse = async () => {
        if (isAnyError()) return;

        const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/course/draft`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
        });

        const data = await response.json();

        //console.log(data);

        if (data.success) {
            setCourseState(data.courseInfo);
        } else {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/course/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });

            const data = await response.json();

            //console.log(data);

            if (data.success) {
                setCourseState(data.courseInfo);
            }
        }
    };

    const getCoursePlainById = async (courseId) => {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/course/get/plain/${courseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
        });

        const data = await response.json();

        //console.log(data);

        if (data.success) {
            setCourseState(data.courseInfo);
        }
    };

    const updateCourse = async (status) => {
        //console.log(courseState);
        console.log("update course called");
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/course/update/${courseState._id}/${status}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({
                    ...courseState,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setCourseState(data.courseInfo);
                if (status === "published" && uploadStatus == "publishing") setUploadStatus("published");
                if (status === "draft" && updating == "updating") setUpdating("updated");
                setErrors({});
                getDraftCourse();
            } else {
                if (status === "published" && uploadStatus == "publishing") setUploadStatus("unpublished");
                if (status === "draft" && updating == "updating") setUpdating("failed");

                if (data.errors) setErrors(data.errors);
            }
        } catch (err) {
            if (status === "published" && uploadStatus == "publishing") setUploadStatus("unpublished");
            if (status === "draft" && updating == "updating") setUpdating("failed");
        }
    };

    const uploadFile = async (courseProperty, file, curValue) => {
        const data = new FormData();
        data.append("picture", file);

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                //console.log(`${loaded}kb of ${total}kb | ${percent}%`);
                if (percent < 100) {
                    setUploadProgress(percent);
                }
            },
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_URL}/fileupload`,
                data,
                /// send both headers and options
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "auth-token": token,
                    },
                    ...options,
                }
            );

            console.log(res.data);

            if (res.data.success) {
                setUploadProgress(100);

                if (curValue) {
                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/filedelete/${curValue}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token,
                        },
                    });

                    const data = await response.json();
                    // console.log(data);
                }

                await fetch(`${import.meta.env.VITE_REACT_APP_URL}/course/update/${courseState._id}/draft`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    body: JSON.stringify({
                        ...courseState,
                        [courseProperty]: res.data.fileName,
                    }),
                });

                setCourseState({
                    ...courseState,
                    [courseProperty]: res.data.fileName,
                });
            }
        } catch (err) {
            //console.log(err);
        }
    };

    const isAnyError = () => {
        if (errors) {
            for (let error in errors) {
                if (errors[error]) return true;
            }
        }

        return false;
    };

    return (
        <CreateCourseContext.Provider
            value={{
                courseState,
                setCourseState,
                isCourseValid,
                inputSection,
                setInputSection,
                courseThumbnailInput,
                setCourseThumbnailInput,
                introVideoInput,
                setIntroVideoInput,
                getDraftCourse,
                updateCourse,
                uploadFile,
                uploadProgress,
                setUploadProgress,
                inputLessons,
                setInputLessons,
                uploadStatus,
                setUploadStatus,
                errors,
                setErrors,
                isAnyError,
                updating,
                setUpdating,
                courseId,
                setCourseId,
                editMode,
                setEditMode,
                getCoursePlainById,
            }}
        >
            {props.children}
        </CreateCourseContext.Provider>
    );
};
