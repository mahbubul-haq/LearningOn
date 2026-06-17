import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "./state/AppContext";
import { refreshAccessToken } from "./api/refreshAccessToken";
import { initAuthChannel } from "./api/authChannel";
import { applyRemoteAccessToken, applyRemoteAccessTokenTime, applyRemoteLogin, applyRemoteLogout, clearAuthData, updateDateLogin } from "./api/authStore";
import axiosClient from "./api/axiosClient";

const AppInitializer = () => {

    const { mode, token, lastAccessTokenTime, user } = useSelector((state) => state.auth);

    const { fetchCategories, fetchUser } = useContext(AppContext);
    useEffect(() => {
        fetchCategories();

    }, []);

    useEffect(() => {

        const initializeAuth = async () => {
            try {
                await refreshAccessToken(true);
            } catch (err) {
                if (token || user) {
                    clearAuthData();
                }
            }
        };

        initializeAuth();

        const cleanup = initAuthChannel((data) => {
            if (data.type === "ACCESS_TOKEN_UPDATED") {
                applyRemoteAccessToken(data.token, data.timestamp);
            }
            else if (data.type === "LAST_ACCESS_TOKEN_TIME_UPDATED") {
                applyRemoteAccessTokenTime(data.timestamp);
            }
            else if (data.type === "LOGIN") {
                applyRemoteLogin(data.user, data.token, data.lastAccessTokenTime);
            }
            else if (data.type === "LOGOUT") {
                applyRemoteLogout();
            }
        });

        return () => {
            cleanup?.()
        }
    }, []);

    useEffect(() => {
        if (token && !user) {

            fetchUser(token, lastAccessTokenTime);
        }

    }, [token])


    return null;
}

export default AppInitializer