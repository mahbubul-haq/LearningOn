import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

// ─── Global 429 Rate Limit Handler ───────────────────────────────────
// Intercepts all 429 responses and shows a non-intrusive notification.
// This runs outside React, so we inject a DOM element directly.

let rateLimitAlertTimeout = null;

const showRateLimitAlert = (message, retryAfter) => {
    // Prevent stacking multiple alerts
    const existingAlert = document.getElementById("rate-limit-alert");
    if (existingAlert) {
        existingAlert.remove();
    }
    if (rateLimitAlertTimeout) {
        clearTimeout(rateLimitAlertTimeout);
    }

    const displayMessage = message || "Too many requests. Please slow down.";
    const retryText = retryAfter ? ` Try again in ${retryAfter}s.` : "";

    const alertEl = document.createElement("div");
    alertEl.id = "rate-limit-alert";
    alertEl.innerHTML = `
        <div style="
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            background: linear-gradient(135deg, #d32f2f, #b71c1c);
            color: #fff;
            padding: 14px 28px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            font-family: 'Inter', 'Roboto', sans-serif;
            font-size: 14px;
            font-weight: 500;
            max-width: 90vw;
            text-align: center;
            animation: rateLimitSlideIn 0.3s ease-out;
            backdrop-filter: blur(8px);
        ">
            ⚠️ ${displayMessage}${retryText}
        </div>
        <style>
            @keyframes rateLimitSlideIn {
                from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes rateLimitSlideOut {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        </style>
    `;

    document.body.appendChild(alertEl);

    const dismissAfter = Math.min((retryAfter || 5) * 1000, 8000);
    rateLimitAlertTimeout = setTimeout(() => {
        const el = document.getElementById("rate-limit-alert");
        if (el) {
            el.firstElementChild.style.animation = "rateLimitSlideOut 0.3s ease-in forwards";
            setTimeout(() => el.remove(), 300);
        }
    }, dismissAfter);
};

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 429) {
            const data = error.response.data;
            showRateLimitAlert(data?.message, data?.retryAfter);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;