import { useQuery } from "@tanstack/react-query";

export const useMyPublishedCourses = (token) => {
    return useQuery({
        queryKey: ["myPublishedCourses"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/courses/mine/published`, {
                method: "GET",
                headers: {
                    "auth-token": token
                }
            });
            const data = await response.json();
            if (!data.success) {
                throw new Error("Failed to fetch my published courses");
            }
            return data.courses;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 30,
        enabled: !!token,
    });
}