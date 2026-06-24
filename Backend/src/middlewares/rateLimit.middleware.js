import crypto from "crypto";
import redisClient from "../configs/redisClient.js";
import { rateLimitConfig } from "../configs/rateLimit.config.js";

// returns {isAllowed, currentCount, remainingCount, resetAfterSeconds}
const SLIDING_WINDOW_SCRIPT = `
-- Redis Lua arrays start at 1, so the first key passed from Node is KEYS[1].
local key = KEYS[1]

-- ARGV values are passed from consumeSlidingWindow in this exact order.
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local member = ARGV[4]
local expiry = tonumber(ARGV[5])

-- Remove requests older than the current sliding window.
redis.call("ZREMRANGEBYSCORE", key, 0, now - window)

local current = redis.call("ZCARD", key)

-- WITHSCORES returns {member, score}. For the oldest request:
-- oldest[1] = member/id, oldest[2] = timestamp score.
local oldest = redis.call("ZRANGE", key, 0, 0, "WITHSCORES")
local reset_after = math.ceil(window / 1000)

if oldest[2] then
    -- Time until the oldest request leaves the window.
    reset_after = math.max(1, math.ceil((tonumber(oldest[2]) + window - now) / 1000))
end

if current >= limit then
    -- Block this request and do not store a new entry.
    -- To keep the key alive 
    redis.call("PEXPIRE", key, expiry)

    return {0, current, 0, reset_after}
end

-- Store this allowed request in the sorted set.
-- score = current timestamp, member = unique request id.
redis.call("ZADD", key, now, member)
redis.call("PEXPIRE", key, expiry)

oldest = redis.call("ZRANGE", key, 0, 0, "WITHSCORES")
if oldest[2] then
    reset_after = math.max(1, math.ceil((tonumber(oldest[2]) + window - now) / 1000))
end

return {1, current + 1, limit - current - 1, reset_after}
`;

const getClientIp = (req) => {
    return req.ip || req.socket?.remoteAddress || "unknown";
};

const hashValue = (value) => {
    return crypto
        .createHash("sha256")
        .update(String(value).trim().toLowerCase())
        .digest("hex");
};

const createRequestMember = () => {
    return `${Date.now()}:${crypto.randomUUID()}`;
};

// Runs the Redis Lua script and normalizes its array response into an object.
const consumeSlidingWindow = async ({ key, limit, windowSeconds }) => {
    const windowMs = windowSeconds * 1000;
    const expireMs = windowMs + 60 * 1000;
    const [allowed, count, remaining, resetAfter] = await redisClient.eval(
        SLIDING_WINDOW_SCRIPT,
        {
            keys: [key],
            arguments: [
                String(Date.now()),
                String(windowMs),
                String(limit),
                createRequestMember(),
                String(expireMs),
            ],
        }
    );

    return {
        allowed: Number(allowed) === 1,
        count: Number(count),
        limit,
        remaining: Number(remaining),
        resetAfter: Number(resetAfter),
        windowSeconds,
    };
};

const setRateLimitHeaders = (res, result) => {
    res.set("RateLimit-Limit", String(result.limit));
    res.set("RateLimit-Remaining", String(result.remaining));
    res.set("RateLimit-Reset", String(result.resetAfter));
    res.set("RateLimit-Policy", `${result.limit};w=${result.windowSeconds}`);
};

const rateLimitResponse = (res, result, message) => {
    setRateLimitHeaders(res, result);
    res.set("Retry-After", String(result.resetAfter));

    return res.status(429).json({
        success: false,
        message,
        retryAfter: result.resetAfter,
    });
};

const createRateLimitKey = (...parts) => {
    return [rateLimitConfig.prefix, ...parts].join(":");
};

export const generalIpRateLimiter = async (req, res, next) => {
    try {
        const ip = getClientIp(req);
        const result = await consumeSlidingWindow({
            key: createRateLimitKey("general", "ip", hashValue(ip)),
            limit: rateLimitConfig.generalIp.ip.limit,
            windowSeconds: rateLimitConfig.generalIp.ip.windowSeconds,
        });

        if (!result.allowed) {
            return rateLimitResponse(
                res,
                result,
                "Too many requests from this network. Please wait before trying again."
            );
        }

        setRateLimitHeaders(res, result);
        next();
    } catch (error) {
        next(error);
    }
};

export const loginRateLimiter = async (req, res, next) => {
    try {
        const email = req.body?.email;

        if (!email) {
            return next();
        }

        const result = await consumeSlidingWindow({
            key: createRateLimitKey("login", "email", hashValue(email)),
            limit: rateLimitConfig.login.email.limit,
            windowSeconds: rateLimitConfig.login.email.windowSeconds,
        });

        if (!result.allowed) {
            return rateLimitResponse(
                res,
                result,
                "Too many login attempts for this account. Please wait before trying again."
            );
        }

        setRateLimitHeaders(res, result);
        next();
    } catch (error) {
        next(error);
    }
};
