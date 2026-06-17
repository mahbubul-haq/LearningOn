import axios from "axios";

import {
    clearAuthData,
    getLastAccessTokenTime,
    shouldRefreshToken,
    updateAccessToken,
    updateAccessTokenTime,
} from "./authStore";

export const refreshAccessToken = async (force = false) => {
    if (!force && !shouldRefreshToken()) {
        return;
    }
    console.log("Refreshing access token");
    let lastAccessTokenTime = getLastAccessTokenTime();
    updateAccessTokenTime(Date.now())

    const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/refresh`,
        {},
        {
            withCredentials: true,
        }
    );
    // console.log('refreshed access token', res?.data)


    if (res?.data?.token) {
        updateAccessToken(res.data.token, Date.now());
    } else if (!lastAccessTokenTime || Date.now() - lastAccessTokenTime >= 20 * 60 * 1000) {
        clearAuthData();
        return null;
    } else {
        updateAccessTokenTime(lastAccessTokenTime);
    }

    return res?.data?.token || null;
};