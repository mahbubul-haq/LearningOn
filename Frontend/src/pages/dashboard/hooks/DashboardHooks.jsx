import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { DashboardContext } from "../../../state/DashboardContext";

export const useRecentEnrollments = (courseId, token) => {
    const { getRecentEnrollments } = useContext(DashboardContext);
    return useInfiniteQuery({
        queryKey: ["recent-enrollments", courseId || "all"],
        queryFn: ({ pageParam = null }) => getRecentEnrollments({ courseId, authToken: token, cursor: pageParam }),

        getNextPageParam: (lastPage) => {
            if (lastPage.success) {
                return lastPage.nextCursor;
            }
            return null;
        },
        staleTime: 30 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        enabled: !!token,
    });
}

export const useMyCourses = (token) => {
    const { getMyCourses } = useContext(DashboardContext);
    return useQuery({
        queryKey: ["my-courses"],
        queryFn: () => getMyCourses(token),
        staleTime: 30 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        enabled: !!token,
    });
}
