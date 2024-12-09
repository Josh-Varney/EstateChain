import React, { useState, useEffect } from "react";

interface NotificationProps {
    message: string;
    type: "error" | "success";
    onClose?: () => void; // Callback to clear the message
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    // Determine the text color based on the notification type
    const textColor = type === "error" ? "text-red-500" : "text-green-500";
    const backgroundColor = type === "error" ? "bg-red-100" : "bg-green-100";
    const borderColor = type === "error" ? "border-red-500" : "border-green-500";

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setIsVisible(false); // Hide the notification after 5 seconds
                if (onClose) onClose(); // Notify parent to clear the message state
            }, 5000);

            return () => clearTimeout(timer); // Cleanup the timer on unmount
        }
    }, [message, onClose]);

    if (!isVisible) return null; // Do not render if not visible

    return (
        <div
            className={`mb-4 p-2 rounded-lg border ${backgroundColor} ${borderColor} ${textColor} shadow-md`}
        >
            {message}
        </div>
    );
};

export default Notification;
