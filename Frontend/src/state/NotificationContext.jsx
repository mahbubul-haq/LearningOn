/* eslint-disable react/prop-types */
import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { apiFetch } from "../api/apiFetch";

export const NotificationContext = createContext();

export const NotificationState = (props) => {
    const [notifications, setNotifications] = React.useState([]);
    const token = useSelector((state) => state.auth.token);

    const getNotifications = async (userId) => {
        try {
            const data = await apiFetch({
                url: `/api/v1/notifications`,
                method: "GET",
            });

            if (data.success) {
                const notifications = data.notifications?.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                //console.log("notifications", notifications);
                setNotifications(notifications);
            } else {
                setNotifications([]);
            }
        } catch (err) {
            //console.log(err?.message);
            setNotifications([]);
        }
    };

    const updateNotifications = async (notificationId, status) => {
        if (status == "opened") {
            let hasNew = notifications.some((notification) => notification.status == "new");
            if (!hasNew) {
                return;
            }

            const data = await apiFetch({
                url: `/api/v1/notifications/${notificationId}`,
                method: "PATCH",
                data: {
                    status
                },
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (data.success) {
                setNotifications((prev) => {
                    return prev.map((notification) => {
                        if (notification.status == "new") {
                            return {
                                ...notification,
                                status: "opened",
                            };
                        } else {
                            return notification;
                        }
                    });
                });
            }
            
        } else if (status == "clicked") {
            const data = await apiFetch({
                url: `/api/v1/notifications/${notificationId}`,
                method: "PATCH",
                data: {
                    status
                },
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (data.success) {
                setNotifications((prev) => {
                    return prev.map((notification) => {
                        if (notification._id == data.notification._id) {
                            return data.notification;
                        } else {
                            return notification;
                        }
                    });
                });
            }
        }
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                setNotifications,
                getNotifications,
                updateNotifications,
            }}
        >
            {props.children}
        </NotificationContext.Provider>
    );
};
