import { useQuery } from "@tanstack/react-query";

export const useUserPublishedCourses = (userId) => {
    return useQuery({
        queryKey: ["userPublishedCourses", userId],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/courses?userId=${userId}&courseStatus=published`, {
                method: "GET",
            });
            const data = await response.json();
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