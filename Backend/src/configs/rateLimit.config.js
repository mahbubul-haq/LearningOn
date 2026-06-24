const numberFromEnv = (name, fallback) => {
    const value = Number(process.env[name]);
    return Number.isFinite(value) && value > 0 ? value : fallback;
};

export const rateLimitConfig = {
    prefix: process.env.RATE_LIMIT_PREFIX || "rate-limit",
    generalIp: {
        ip: {
            limit: numberFromEnv("GENERAL_IP_RATE_LIMIT", 2000),
            windowSeconds: numberFromEnv("GENERAL_IP_RATE_LIMIT_WINDOW_SECONDS", 60),
        },
    },
    login: {
        email: {
            limit: numberFromEnv("LOGIN_EMAIL_RATE_LIMIT", 15),
            windowSeconds: numberFromEnv("LOGIN_EMAIL_RATE_LIMIT_WINDOW_SECONDS", 15 * 60),
        },
    },
};
