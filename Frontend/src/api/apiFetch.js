import axios from "axios";

import { getAccessToken } from "./authStore";

import { refreshAccessToken } from "./refreshAccessToken";
import axiosClient from "./axiosClient";

export const apiFetch = async (config) => {
    // proactive refresh
    await refreshAccessToken();
    console.log("API Fetch called", config);

    try {
        const response = await axiosClient({
            ...config,
            headers: {
                ...config.headers,
                "auth-token": getAccessToken()
                    ? getAccessToken()
                    : "",
            },
            withCredentials: true,
        });

        return response.data;
    } catch (err) {
        const originalRequest = config;

        // avoid infinite retry loop
        if (originalRequest._retry) {
            throw err;
        }

        if (err.response?.status === 401) {
            try {
                originalRequest._retry = true;

                // force refresh
                await refreshAccessToken(true);

                const retryResponse = await axios({
                    ...originalRequest,
                    headers: {
                        ...originalRequest.headers,
                        "auth-token": getAccessToken()
                            ? getAccessToken()
                            : "",
                    },
                    withCredentials: true,
                });

                return retryResponse.data;
            } catch (refreshError) {
                // logout flow
                window.location.href = "/login";

                throw refreshError;
            }
        }

        throw err;
    }
};