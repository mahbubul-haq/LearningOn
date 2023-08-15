import React, { createContext, useEffect } from "react";
import { useSelector } from "react-redux";
import state from ".";
import axios from "axios";

export const CreateCourseContext = createContext();

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

    const isCourseValid = () => {
        for (const key in courseState) {
            if (!courseState[key] || courseState[key]?.length === 0) {
                return false;
            }
        }
        return true;
    };

    const getDraftCourse = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_URL}/course/draft`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            }
        );

        const data = await response.json();

        console.log(data);

        if (data.success) {
            setCourseState(data.courseInfo);
        } else {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_URL}/course/new`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );

            const data = await response.json();

            console.log(data);

            if (data.success) {
                setCourseState(data.courseInfo);
            }
        }
    };

    const updateCourse = async (status) => {
        console.log(courseState);

        const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_URL}/course/update/${
                courseState._id
            }/${status}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({
                    ...courseState,
                }),
            }
        );

        const data = await response.json();

        console.log(data);
    };

    const uploadFile = async (courseProperty, file, curValue) => {
        const data = new FormData();
        data.append("picture", file);

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                console.log(`${loaded}kb of ${total}kb | ${percent}%`);
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
                    const response = await fetch(
                        `${
                            import.meta.env.VITE_REACT_APP_URL
                        }/filedelete/${curValue}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": token,
                            },
                        }
                    );

                    const data = await response.json();
                    console.log(data);
                }

                await fetch(
                    `${import.meta.env.VITE_REACT_APP_URL}/course/update/${
                        courseState._id
                    }/draft`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token,
                        },
                        body: JSON.stringify({
                            ...courseState,
                            [courseProperty]: res.data.fileName,
                        }),
                    }
                );

                setCourseState({
                    ...courseState,
                    [courseProperty]: res.data.fileName,
                });
            }
        } catch (err) {
            console.log(err);
        }
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
            }}
        >
            {props.children}
        </CreateCourseContext.Provider>
    );
};
