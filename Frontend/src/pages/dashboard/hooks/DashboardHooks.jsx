import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { DashboardContext } from "../../../state/DashboardContext";

export const useRecentEnrollments = (courseId, user) => {
    const { getRecentEnrollments } = useContext(DashboardContext);
    return useInfiniteQuery({
        queryKey: ["recent-enrollments", user?._id, courseId || "all"],
        queryFn: ({ pageParam = null }) => getRecentEnrollments({ courseId, cursor: pageParam }),

        getNextPageParam: (lastPage) => {
            if (lastPage.success) {
                return lastPage.nextCursor;
            }
            return null;
        },
        staleTime: 30 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        enabled: !!user,
    });
}

export const useMyCourses = (user) => {
    const { getMyCourses } = useContext(DashboardContext);
    return useQuery({
        queryKey: ["my-courses", user?._id],
        queryFn: () => getMyCourses(),
        staleTime: 30 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        enabled: !!user,
    });
}

export const useEnrollmentAnalytics = (courseId, user, startDate, endDate, enabled = true) => {
    const { getEnrollmentAnalytics } = useContext(DashboardContext);
    return useQuery({
        queryKey: ["enrollment-analytics", user?._id, courseId || "all", startDate, endDate],
        queryFn: () => getEnrollmentAnalytics({ courseId, startDate, endDate }),
        staleTime: 30 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        enabled: Boolean(enabled && user && startDate && endDate),
    });
}
