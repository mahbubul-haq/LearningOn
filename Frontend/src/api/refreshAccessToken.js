import axios from "axios";

import {
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

    if (res?.data?.token) {
        updateAccessToken(res.data.token, Date.now());
    }
    else updateAccessTokenTime(lastAccessTokenTime);


    return res?.data?.accessToken || null;
};