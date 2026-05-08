import { useQuery } from "@tanstack/react-query"

export const useGetCertificate = (courseId, token, enabled) => {
    return useQuery({
        queryKey: ["certificate", courseId],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/certificates/${courseId}`,
                {
                    method: "GET",
                    headers: {
                        'auth-token': token
                    },

                }
            );
            const data = await res.json();
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

