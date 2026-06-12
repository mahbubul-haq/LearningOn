import { useQuery } from "@tanstack/react-query";
import { CoursePageContext } from "../../../state/CoursePageContext"
import { useContext } from "react"

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

