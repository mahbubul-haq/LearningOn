import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    lastAccessTokenTime: 0
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.lastAccessTokenTime = action.payload.lastAccessTokenTime;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.lastAccessTokenTime = 0;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            if (!action.payload) {
                state.user = null;
            }
        },

        setLastAccessTokenTime: (state, action) => {
            state.lastAccessTokenTime = action.payload;
        },
        setTokenWithTimestamp: (state, action) => {
            state.token = action.payload.token;
            state.lastAccessTokenTime = action.payload.timestamp;
            if (!action.payload.token) {
                state.user = null;
            }
        }

    },
});

export const { setMode, setLogin, setLogout, setToken, setLastAccessTokenTime, setTokenWithTimestamp } = authSlice.actions;

export default authSlice.reducer;
