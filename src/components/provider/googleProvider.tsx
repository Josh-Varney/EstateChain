import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignInWithGoogle } from '../../firebase/auth';

const GoogleProvider: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // const auth = getAuth();
        try {
            await doSignInWithGoogle();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/selector");
        } catch (error) {
            console.error("Sign-in error:", error);
        }
    };

    return (
        <button
            className="w-full p-2 border bg-gray-300 square-full rounded-lg shadow-md hover:bg-gray-400" onClick={handleSubmit}
            >
            <div className="flex flex-row items-center justify-center text-center space-x-1">
                <img
                    src="/assets/icons8-google-2.svg"
                    alt="Google Logo"
                    className="w-6 h-6 opacity-100"
                />
                <h1 className="text-sm text-gray-800">Google</h1>
            </div>
        </button>
    );
};


export default GoogleProvider;