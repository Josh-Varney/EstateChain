import React, { useState } from "react";
import { validateEmail } from "../../../../../firebase/footer/newsletter";

const SubscriptionForm: React.FC = () => {
    const [email, setEmail] = useState<string>(""); // State for input value
    const [message, setMessage] = useState<string>(""); // Unified state for message
    const [messageType, setMessageType] = useState<"success" | "error" | "">(""); // Type of message: success or error
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    const showMessage = (message: string, type: "success" | "error") => {
        setMessage(message);
        setMessageType(type);
        setFadeOut(false);

        setTimeout(() => setFadeOut(true), 4000);
        setTimeout(() => {
            setMessage("");
            setMessageType("");
        }, 5000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        const message = await validateEmail(trimmedEmail);

        if (message === "You are already subscribed to the newsletter!") {
            showMessage(message, "error");
        } else if (message.startsWith("Successfully")) {
            showMessage(message, "success");
            setEmail("");
        } else {
            showMessage(message, "error");
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col col-span-12 md:col-span-5">
            <div>
             <img src="/assets/White_LOGO_Header_option_1.svg" alt="Logo 1" className="w-44"/>
            </div>
            <div className="mt-2">
                <h1 className="text-2xl sm:text-3xl font-sem text-white leading-snug">
                    Stay Ahead with Webtrix Insights
                </h1>
            </div>
            <div>
                <p className="text-gray-400 text-sm mt-4">
                    Be the first to know about new features, upcoming events, and everything happening in the world of Webtrix.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-6">
                {message && (
                    <div
                        className={`mb-4 text-sm p-2 rounded transition-opacity duration-1000 ${
                            messageType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        } ${fadeOut ? "opacity-0" : "opacity-100"}`}
                    >
                        {message}
                    </div>
                )}
                <div className="mt-6 flex flex-row items-stretch rounded-md overflow-hidden border border-gray-600 bg-gray-700">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-grow px-4 py-3 text-sm bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        aria-label="Email Address"
                    />
                    <button
                        type="submit"
                        className="flex-shrink-0 px-6 py-3 bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:outline-none transition whitespace-nowrap"
                    >
                        Subscribe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubscriptionForm;
