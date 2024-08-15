/* eslint-disable react/prop-types */
import React, { createContext } from "react";
import { useSelector } from "react-redux";

export const NotificationContext = createContext();

export const NotificationState = (props) => {
    const [notifications, setNotifications] = React.useState([]);
    const token = useSelector((state) => state.auth.token);

    const getNotifications = async (userId) => {
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/notification/get/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );

            const data = await response.json();

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
            notifications.forEach(async (notification) => {
                if (notification.status == "new") {
                    const res = await fetch(
                        `${
                            import.meta.env.VITE_SERVER_URL
                        }/notification/update/${notification._id}/opened`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": token,
                            },
                        }
                    );
                    const data = await res.json();
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
            });
        } else if (status == "clicked") {
            const res = await fetch(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/notification/update/${notificationId}/clicked`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );
            const data = await res.json();
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
