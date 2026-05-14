import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../../../api/apiFetch";

export const useGetCertificate = (courseId, token, enabled) => {
    return useQuery({
        queryKey: ["certificate", courseId],
        queryFn: async () => {
            const data = await apiFetch({
                url: `/api/v1/certificates/${courseId}`,
                method: "GET",
            });
            if (!data?.success) {
                throw new Error(data?.message || "Failed to fetch certificate");
            }
            return data?.certificate;
        },

        staleTime: 30 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        enabled: !!courseId && !!token && enabled,
    })
}

