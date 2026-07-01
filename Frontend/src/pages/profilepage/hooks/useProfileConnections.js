import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../../api/apiFetch';
import { useSelector } from 'react-redux';

export const useFollowers = (userId, page = 1, limit = 10, enabled = true) => {
    const currentUserId = useSelector(state => state.auth.user?._id);

    return useQuery({
        queryKey: ['followers', userId, currentUserId, page, limit],
        queryFn: async () => {
            const data = await apiFetch({
                url: `/api/v1/users/${userId}/followers`,
                params: {
                    page,
                    limit,
                },
                method: "GET",
            });
            if (!data.success) {
                throw new Error(data.message || "Failed to fetch followers");
            }
            return data;
        },
        enabled: !!userId && enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useFollowing = (userId, page = 1, limit = 10, enabled = true) => {
    const currentUserId = useSelector(state => state.auth.user?._id);

    return useQuery({
        queryKey: ['following', userId, currentUserId, page, limit],
        queryFn: async () => {
            const data = await apiFetch({
                url: `/api/v1/users/${userId}/following`,
                params: {
                    page,
                    limit,
                },
                method: "GET",
            });
            if (!data.success) {
                throw new Error(data.message || "Failed to fetch following");
            }
            return data;
        },
        enabled: !!userId && enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
