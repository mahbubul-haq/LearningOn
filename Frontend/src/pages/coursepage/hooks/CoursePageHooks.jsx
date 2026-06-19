import { useQuery } from "@tanstack/react-query";
import { CoursePageContext } from "../../../state/CoursePageContext"
import { useContext } from "react"
import { apiFetch } from "../../../api/apiFetch";

export const useCoursePageReviews = (courseId, userId) => {
    const { fetchAllReviews } = useContext(CoursePageContext);
    return useQuery({
        queryKey: [`coursePageReviews`, courseId, userId],
        queryFn: () => fetchAllReviews(courseId, userId),
        enabled: !!courseId,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
    })
}

export const useCoursePageRelatedCourses = (category, courseId) => {
    const { fetchRelatedCourses } = useContext(CoursePageContext);
    return useQuery({
        queryKey: [`coursePageRelatedCourses`, category, courseId],
        queryFn: () => fetchRelatedCourses(category, courseId),
        enabled: !!category && !!courseId,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
    })
}

export const useEnrollmentStatus = (courseId, user, token) => {
    return useQuery({
        queryKey: [`enrollmentStatus`, courseId, user?._id],
        queryFn: () => apiFetch({
            url: `/data/payment-status/${courseId}`,
            method: "GET",
        }),
        refetchInterval: (query) => {
            const res = query?.state?.data;
            const status = res?.status;

            if (status === 'enrolled') return false;
            if (query?.state?.dataUpdateCount >= 10) return false; /// max 10 times polling

            return status === 'pending' ? 120000 : false; // Poll every 120 seconds
        },
        enabled: !!courseId && !!user?._id && !!token,
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 5,
    })
}

