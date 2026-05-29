import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { useCallback, useContext, useEffect } from "react";
import VideoUpload from "../../components/videoUpload/VideoUpload";
import { CreateCourseContext } from "../../state/CreateCourse";
import RightPanelBottom from "./RightPanelBottom";
import {
  deleteCourseThumbnailApi,
  deleteIntroVideoApi,
  uploadCourseThumbnailApi,
  uploadIntroVideoApi,
} from "./api/courseLessonsApi";

const CourseMedia = () => {
  const { courseState, setCourseState, courseStateRef } =
    useContext(CreateCourseContext);

  const applyUpdatedFields = useCallback((updatedFields = {}) => {
    courseStateRef.current = {
      ...courseStateRef.current,
      ...updatedFields,
    };
    setCourseState({ ...courseStateRef.current });
  }, [courseStateRef, setCourseState]);

  const setIntroVideo = useCallback((fileName) => {
    courseStateRef.current.introVideo.public_id = fileName;
    setCourseState({ ...courseStateRef.current });
  }, [courseStateRef, setCourseState]);

  const setCourseThumbnail = useCallback((fileName) => {
    courseStateRef.current.courseThumbnail.public_id = fileName;
    setCourseState({ ...courseStateRef.current });
  }, [courseStateRef, setCourseState]);

  const uploadThumbnailHandler = useCallback(
    async (file, { onUploadProgress } = {}) => {
      const courseId = courseStateRef.current?._id;
      if (!courseId) return { success: false };

      const data = await uploadCourseThumbnailApi(
        courseId,
        file,
        onUploadProgress
      );

      if (data?.success) {
        applyUpdatedFields(data.updatedFields);
      }

      return data;
    },
    [applyUpdatedFields, courseStateRef]
  );

  const uploadIntroVideoHandler = useCallback(
    async (file, { onUploadProgress } = {}) => {
      const courseId = courseStateRef.current?._id;
      if (!courseId) return { success: false };

      const data = await uploadIntroVideoApi(courseId, file, onUploadProgress);

      if (data?.success) {
        applyUpdatedFields(data.updatedFields);
      }

      return data;
    },
    [applyUpdatedFields, courseStateRef]
  );

  const deleteThumbnailHandler = useCallback(async () => {
    const courseId = courseStateRef.current?._id;
    if (!courseId) return { success: false };

    const data = await deleteCourseThumbnailApi(courseId);

    if (data?.success) {
      applyUpdatedFields(data.updatedFields);
    }

    return data;
  }, [applyUpdatedFields, courseStateRef]);

  const deleteIntroVideoHandler = useCallback(async () => {
    const courseId = courseStateRef.current?._id;
    if (!courseId) return { success: false };

    const data = await deleteIntroVideoApi(courseId);

    if (data?.success) {
      applyUpdatedFields(data.updatedFields);
    }

    return data;
  }, [applyUpdatedFields, courseStateRef]);

  useEffect(() => {
    const element = document.querySelector(".right-panel-course-media");
    if (element) {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }
  }, []);

  return (
    <>
      <Box
        className="right-panel-course-media"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          mt: "0rem",
          mb: "1rem",
          opacity: 0,
          transform: "translateY(4rem)",
          transition: "opacity 0.5s, transform 0.5s",
        }}
      >
        <Box>
          <Box sx={{ mb: "0.5rem" }}>
            <InputLabel htmlFor="thumbnail">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: (theme) => theme.palette.grey.grey600,
                }}
              >
                Course Thumbnail
              </Typography>
            </InputLabel>
          </Box>

          <VideoUpload
            updateCallBack={undefined}
            uploadHandler={uploadThumbnailHandler}
            deleteHandler={deleteThumbnailHandler}
            setFileName={setCourseThumbnail}
            fileName={courseState.courseThumbnail?.public_id}
            isImage={true}
            uploadText="Upload Thumbnail Image"
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ mb: "0.5rem" }}>
            <InputLabel htmlFor="youtube-link">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: (theme) => theme.palette.grey.grey600,
                }}
              >
                Course Intro Video
              </Typography>
            </InputLabel>
          </Box>

          <VideoUpload
            updateCallBack={undefined}
            uploadHandler={uploadIntroVideoHandler}
            deleteHandler={deleteIntroVideoHandler}
            setFileName={setIntroVideo}
            fileName={courseState.introVideo?.public_id}
            isImage={false}
            uploadText="Upload Intro Video"
          />
        </Box>
      </Box>
      <RightPanelBottom />
    </>
  );
};

export default CourseMedia;
