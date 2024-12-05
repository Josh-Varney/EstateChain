import React from "react";

interface NotificationProps {
    message: string;
    type: "error" | "success";
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
    const textColor = type === "error" ? "text-red-500" : "text-green-500";
    return <div className={`mb-4 ${textColor}`}>{message}</div>;
};

export default Notification;
