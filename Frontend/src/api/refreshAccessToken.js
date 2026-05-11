import axios from "axios";

import {
    setAccessToken,
    shouldRefreshToken,
    updateRefreshTime,
} from "./authStore";

export const refreshAccessToken = async (force = false) => {
    if (!force && !shouldRefreshToken()) {
        return;
    }

    updateRefreshTime();
    console.log("Calling refresh access token");

    const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
        {},
        {
            withCredentials: true,
        }
    );

    if (res?.data?.accessToken) setAccessToken(res.data.accessToken);
    else setAccessToken(null);

    updateRefreshTime();

    return res?.data?.accessToken || null;
};