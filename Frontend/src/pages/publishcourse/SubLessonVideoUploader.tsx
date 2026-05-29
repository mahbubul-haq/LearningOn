import React, { Dispatch, SetStateAction, useCallback, useContext } from "react";
import Typography from "@mui/material/Typography";
import VideoUpload from "../../components/videoUpload/VideoUpload";
import { CreateCourseContext } from "../../state/CreateCourse";
import {
  deleteSubLessonVideoApi,
  uploadSubLessonVideoApi,
} from "./api/courseLessonsApi";

type Props = {
  subLessonVideoLink: string;
  lessonId: string | undefined;
  subLessonId: string | undefined;
  setVideoLinks: Dispatch<SetStateAction<string[]>>;
  onLessonsSynced: (lessons: unknown[]) => void;
};

export default React.memo(function SubLessonVideoUploader({
  subLessonVideoLink,
  lessonId,
  subLessonId,
  setVideoLinks,
  onLessonsSynced,
}: Props) {
  const { courseStateRef } = useContext(CreateCourseContext);

  const setFileName = useCallback(
    (fileName: string) => {
      if (fileName) {
        setVideoLinks((prev: string[]) => [...prev, fileName]);
      } else {
        setVideoLinks((prev: string[]) =>
          prev.filter((link: string) => link !== subLessonVideoLink)
        );
      }
    },
    [setVideoLinks, subLessonVideoLink]
  );

  const uploadHandler = useCallback(
    async (file: File, { onUploadProgress }: { onUploadProgress?: (e: unknown) => void } = {}) => {
      const courseId = courseStateRef.current?._id;
      if (!courseId || !lessonId || !subLessonId) {
        return { success: false };
      }

      const data = await uploadSubLessonVideoApi(
        courseId,
        lessonId,
        subLessonId,
        file,
        onUploadProgress
      );

      if (data?.success && data.courseInfo?.lessons) {
        onLessonsSynced(data.courseInfo.lessons);
      }

      return data;
    },
    [courseStateRef, lessonId, subLessonId, onLessonsSynced]
  );

  const deleteHandler = useCallback(async () => {
    const courseId = courseStateRef.current?._id;
    if (!courseId || !lessonId || !subLessonId) {
      return { success: false };
    }

    const data = await deleteSubLessonVideoApi(courseId, lessonId, subLessonId);

    if (data?.success && data.courseInfo?.lessons) {
      onLessonsSynced(data.courseInfo.lessons);
    }

    return data;
  }, [courseStateRef, lessonId, subLessonId, onLessonsSynced]);

  if (!lessonId || !subLessonId) {
    return (
      <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
        Save lesson structure before uploading video.
      </Typography>
    );
  }

  return (
    <VideoUpload
      updateCallBack={undefined}
      uploadHandler={uploadHandler}
      deleteHandler={deleteHandler}
      fileName={subLessonVideoLink}
      setFileName={setFileName}
      isImage={false}
    />
  );
});
