import { sendAuthEvent } from "./authChannel";
import { store } from "../main";
import { setToken, setLastAccessTokenTime, setTokenWithTimestamp } from "../state/reduxStore/authSlice";


export const setAccessToken = (token) => {
    // accessToken = token;
    // sendAuthEvent({ type: "ACCESS_TOKEN_UPDATED", token });
    store.dispatch(setToken(token));
};

export const getAccessToken = () => {
    // return accessToken;
    return store.getState().auth.token;
};

export const shouldRefreshToken = () => {
    const now = Date.now();

    return now - store.getState().auth.lastAccessTokenTime >= 15 * 60 * 1000;
};

export const updateAccessTokenTime = (timestamp) => {
    sendAuthEvent({ type: "LAST_ACCESS_TOKEN_TIME_UPDATED", timestamp });
    store.dispatch(setLastAccessTokenTime(timestamp));

};

export const getLastAccessTokenTime = () => {
    return store.getState().auth.lastAccessTokenTime;
};

export const updateAccessToken = (token, timestamp) => {
    sendAuthEvent({ type: "ACCESS_TOKEN_UPDATED", token, timestamp });
    store.dispatch(setTokenWithTimestamp({ token, timestamp }));
};


export const applyRemoteAccessToken = (token, timestamp) => {
    store.dispatch(setTokenWithTimestamp({ token, timestamp }));
};

export const applyRemoteAccessTokenTime = (timestamp) => {
    store.dispatch(setLastAccessTokenTime(timestamp));
};