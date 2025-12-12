/* eslint-disable react/prop-types */
import React, { createContext, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
// import state from ".";
import axios from "axios";

export const CreateCourseContext = createContext();

export const initialCourseState = {
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
  const token = useSelector((state) => state.auth.token);

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

  const courseStateRef = useRef(courseState);

  useEffect(() => {
    courseStateRef.current = courseState;

  }, [courseState]);

  const [introVideoUrl, setIntroVideoUrl] = React.useState("");
  const [courseThumbnailInput, setCourseThumbnailInput] = React.useState("");
  const [introVideoInput, setIntroVideoInput] = React.useState("");
  const [inputSection, setInputSection] = React.useState("basic info");
  const [uploadProgress, setUploadProgress] = React.useState(-1);
  const [inputLessons, setInputLessons] = React.useState([]);
  const [uploadStatus, setUploadStatus] = React.useState("");/// trigggers update course, shows Dialog while publishing: "", "publishing", "unpublished", "failed" -> after admin approve --> "published" 
  const [errors, setErrors] = React.useState({});
  const [updating, setUpdating] = React.useState("");/// snackbar/trigger update: "", updating, updated, failed
  const [editMode, setEditMode] = React.useState("");
  const [courseId, setCourseId] = React.useState("");
  const [newDraft, setNewDraft] = React.useState(false);/// discarded due to redirecting to home/dashboard
  const [deleteCourseStatus, setDeleteCourseStatus] = React.useState("");// trigger delete course, shows dialog: "", "deleting", "deleted", "failed"
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  // useEffect(() => {
  //     console.log(isCourseValid());
  // }, [courseState]);

  // useEffect(() => {
  //     //short youtube link with id -> https://youtu.be/3v1n5b0Uu3g
  //     console.log(courseState.introVideo);
  //     setIntroVideoUrl(`https://youtu.be/${courseState.introVideo}`);
  // }, []);

  // useEffect(() => {
  //     setCourseState({
  //         ...courseState,
  //         introVideo: getYouTubeId(introVideoUrl),
  //     });
  // }, [introVideoUrl]);

  // const getYouTubeId = (url) => {
  //     if (url) {

  //         let ampersandPosition = url.indexOf("&");
  //         if (ampersandPosition != -1) {
  //             url = url.substring(0, ampersandPosition);
  //         }

  //         if (url.includes("v=")) {
  //             let id = url.split("v=")[1];
  //             return id;
  //         }
  //         else {
  //             let id = url.split("/");
  //             //console.log(id[id.length - 1]);
  //             return id[id.length - 1];
  //         }
  //     }
  //     return "";
  // };

  const isCourseValid = () => {
    if (
      courseState.category.trim()?.length === 0 ||
      courseState.courseTitle.trim()?.length === 0 ||
      courseState.courseDescription.trim()?.length === 0 ||
      courseState.studentRequirements.trim()?.length === 0 ||
      courseState.skillTags?.length === 0 ||
      courseState.courseThumbnail?.length === 0 ||
      courseState.introVideo?.length === 0 ||
      courseState.courseLanguage.trim()?.length === 0 ||
      courseState.coursePrice.trim()?.length === 0 ||
      courseState.approxTimeToComplete.trim()?.length === 0 ||
      courseState.courseInstructors?.length === 0 ||
      courseState.lessons?.length === 0
    )
      return false;

    for (let lesson of courseState.lessons) {
      if (!lesson.title) return false;
      for (let subLesson of lesson.subLessons) {
        if (!subLesson.title || !(subLesson.videoLink || subLesson.lectureNote))
          return false;
      }
    }
    let flag = true;
    courseState.lessons?.forEach((lesson) => {
      lesson.questions?.forEach((question) => {
        if (!question.question || !question.answer) flag = false;
        question.options?.forEach((option) => {
          if (!option) flag = false;
        });
      });
    });
    return flag;
  };

  const deleteCourse = async (courseId) => {
    setDeleteCourseStatus("deleting");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/course/delete/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const data = await response.json();
      // console.log("deleted", data);
      if (data.success) {
        setDeleteCourseStatus("deleted");
      } else {
        setDeleteCourseStatus("failed");
      }
    } catch (error) {
      setDeleteCourseStatus("failed");
    }
  };

  const updateCallback = async () => {
    if (newDraft) {
      setTimeout(() => {
        setNewDraft(false);
      }, 2000);

      return { success: false };
    } else {
      if (editMode == "edit") {
        await updateCourse("unpublished");
      } else {
        await updateCourse("draft");
      }
      return { success: true };
    }
  };

  const getDraftCourse = async () => {
    if (isAnyError()) return;

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/course/draft`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );

    const data = await response.json();

    // console.log(data);

    if (data.success) {
      setCourseState(data.courseInfo);
    }
  };

  const getCoursePlainById = async (courseId) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/course/get/plain/${courseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );

    const data = await response.json();

    //console.log(data);

    if (data.success) {
      console.log("getCoursePlainById", data.courseInfo);
      courseStateRef.current = data.courseInfo;
      setCourseState(data.courseInfo);
    }
  };

  const updateCourse = async (status) => {
    //console.log(courseState);
    // console.log("update course called", status, courseState);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/course/update/${courseState._id
        }/${status}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            ...courseStateRef.current
          }),
        }
      );

      const data = await response.json();
      // console.log("done", data);
      if (data.success) {
        ///setCourseState(data.courseInfo);
        if (status === "unpublished" && uploadStatus == "publishing")
          setUploadStatus("published");
        if (status === "draft" && updating == "updating")
          setUpdating("updated");
        setErrors({});

        courseStateRef.current.courseStatus = status;
        setCourseState({ ...courseStateRef.current });
        //   setCourseState({
        //   ...data.courseInfo,
        //   courseStatus: status,
        // });

        //setIntroVideoUrl(`https://youtu.be/${data.courseInfo.introVideo}`);
      } else {
        if (status === "unpublished" && uploadStatus == "publishing")
          setUploadStatus("unpublished");
        if (status === "draft" && updating == "updating") setUpdating("failed");

        if (data.errors) setErrors(data.errors);
      }
    } catch (err) {
      if (status === "unpublished" && uploadStatus == "publishing")
        setUploadStatus("unpublished");
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
        `${import.meta.env.VITE_SERVER_URL}/fileupload`,
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

      // console.log(res.data);

      if (res.data.success) {
        setUploadProgress(100);

        if (curValue) {
          await fetch(
            `${import.meta.env.VITE_SERVER_URL}/filedelete/${curValue}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "auth-token": token,
              },
            }
          );

          //const data = await response.json();
          // console.log(data);
        }

        await fetch(
          `${import.meta.env.VITE_SERVER_URL}/course/update/${courseState._id
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
        introVideoUrl,
        setIntroVideoUrl,
        setNewDraft,
        newDraft,
        updateCallback,
        deleteCourseStatus,
        setDeleteCourseStatus,
        deleteCourse,
        mobileDrawerOpen,
        setMobileDrawerOpen,
        courseStateRef,
      }}
    >
      {props.children}
    </CreateCourseContext.Provider>
  );
};
