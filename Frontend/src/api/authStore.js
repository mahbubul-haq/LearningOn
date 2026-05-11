let accessToken = null;

let lastRefreshTokenTime = 0;

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => {
    return accessToken;
};

export const shouldRefreshToken = () => {
    const now = Date.now();

    return now - lastRefreshTokenTime >= 15 * 60 * 1000;
};

export const updateRefreshTime = () => {
    lastRefreshTokenTime = Date.now();
};