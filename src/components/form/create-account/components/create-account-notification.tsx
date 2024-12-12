import React, { useState, useEffect } from "react";

interface NotificationProps {
    message: string;
    type: "error" | "success";
    onClose?: () => void; // Callback to clear the message
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    const textColor = type === "error" ? "text-red-500" : "text-green-500";
    const borderColor = type === "error" ? "border-red-500" : "border-green-500";

    useEffect(() => {
        if (message) {
            setIsVisible(true); // Show notification when message changes

            const timer = setTimeout(() => {
                setIsVisible(false); // Hide after 5 seconds
                if (onClose) onClose(); // Clear the message state in parent
            }, 5000);

            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [message, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`mb-7 p-2 rounded-lg border ${borderColor} ${textColor} shadow-md`}>
            {message}
        </div>
    );
};

export default Notification;
