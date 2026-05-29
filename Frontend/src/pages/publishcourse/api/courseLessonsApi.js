import { apiFetch } from "../../../api/apiFetch";

const multipartConfig = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("picture", file);

  return {
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
    ...(onUploadProgress ? { onUploadProgress } : {}),
  };
};

export const addLessonApi = async (courseId) => {
  return apiFetch({
    url: `/api/v1/courses/${courseId}/lessons`,
    method: "POST",
  });
};

export const addSubLessonApi = async (courseId, lessonId) => {
  return apiFetch({
    url: `/api/v1/courses/${courseId}/lessons/${lessonId}/sublessons`,
    method: "POST",
  });
};

export const uploadCourseThumbnailApi = async (
  courseId,
  file,
  onUploadProgress
) => {
  return apiFetch({
    url: `/api/v1/courses/${courseId}/media/thumbnail`,
    method: "POST",
    ...multipartConfig(file, onUploadProgress),
  });
};

export const deleteCourseThumbnailApi = async (courseId) => {
  return apiFetch({
    url: `/api/v1/courses/${courseId}/media/thumbnail`,
    method: "DELETE",
  });
};

export const uploadIntroVideoApi = async (courseId, file, onUploadProgress) => {
  return apiFetch({
    url: `/api/v1/courses/${courseId}/media/intro-video`,
    method: "POST",
    ...multipartConfig(file, onUploadProgress),
  });
};

export const deleteIntroVideoApi = async (courseId) => {
  return apiFetch({
    url: `/api/v1/courses/${courseId}/media/intro-video`,
    method: "DELETE",
  });
};

export const uploadSubLessonVideoApi = async (
  courseId,
  lessonId,
  subLessonId,
  file,
  onUploadProgress
) => {
  return apiFetch({
    url: `/api/v1/courses/${courseId}/lessons/${lessonId}/sublessons/${subLessonId}/video`,
    method: "POST",
    ...multipartConfig(file, onUploadProgress),
  });
};

export const deleteSubLessonVideoApi = async (
  courseId,
  lessonId,
  subLessonId
) => {
  return apiFetch({
    url: `/api/v1/courses/${courseId}/lessons/${lessonId}/sublessons/${subLessonId}/video`,
    method: "DELETE",
  });
};

export const deleteLessonApi = async (courseId, lesson) => {
  if (lesson?._id) {
    return apiFetch({
      url: `/api/v1/courses/${courseId}/lessons/${lesson._id}`,
      method: "DELETE",
    });
  }

  return null;
};

export const deleteSubLessonApi = async (courseId, lessonId, subLessonId) => {
  if (lessonId && subLessonId) {
    return apiFetch({
      url: `/api/v1/courses/${courseId}/lessons/${lessonId}/sublessons/${subLessonId}`,
      method: "DELETE",
    });
  }

  return null;
};
