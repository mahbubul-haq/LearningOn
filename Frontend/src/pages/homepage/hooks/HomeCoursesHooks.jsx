import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../api/apiFetch";
import { HomePageContext } from "../../../state/HomePageState";
import { useContext } from "react";

export const useUserPublishedCourses = (userId) => {
    return useQuery({
        queryKey: ["userPublishedCourses", userId],
        queryFn: async () => {
            const data = await apiFetch({
                url: `/api/v1/courses`,
                method: "GET",
                params: {
                    userId,
                    courseStatus: 'published'
                }
            });
            if (!data.success) {
                throw new Error("Failed to fetch my published courses");
            }
            return data.courses;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 10,
        enabled: !!userId,
    });
}

export const useMyEnrolledCourses = (userId) => {
    return useQuery({
        queryKey: ["myEnrolledCourses", userId],
        queryFn: async () => {
            const data = await apiFetch({
                url: `/api/v1/users/me/enrolled-courses`,
                method: "GET",
            });
            if (!data.success) {
                throw new Error("Failed to fetch my enrolled courses");
            }
            // console.log("my enrolled courses", data.courses);
            return data.courses;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 10,
        enabled: !!userId,
    });
}

export const useTrendingCourses = () => {
    return useQuery({
        queryKey: ["trendingCourses"],
        queryFn: async () => {
            const data = await apiFetch({
                url: `/api/v1/courses`,
                method: "GET",
                params: {
                    trending: 'true'
                }
            });
            console.log("trending courses", data.courses);
            if (!data.success) {
                throw new Error("Failed to fetch trending courses");
            }
            return data.courses;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });
}

export const useRecentCourses = () => {
    return useQuery({
        queryKey: ["recentCourses"],
        queryFn: async () => {
            const data = await apiFetch({
                url: `/api/v1/courses`,
                method: "GET",
                params: {
                    recent: 'true'
                }
            });
            console.log("recent courses", data.courses);
            if (!data.success) {
                throw new Error("Failed to fetch recent courses");
            }
            return data.courses;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });
}

export const usePopularCourses = (catgory, courseType) => {
    const { getCourses } = useContext(HomePageContext);
    return useQuery({
        queryKey: ["popularCourses", catgory],
        queryFn: async () => {
            const data = await getCourses(catgory);
            return data;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        enabled: courseType === "Popular Courses"
    });
}
