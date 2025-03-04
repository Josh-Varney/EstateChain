import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignInWithGoogle } from '../../firebase/auth';
import axios from 'axios';
import { error } from 'console';

const GoogleProvider: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // const auth = getAuth();
        try {
            const user = await doSignInWithGoogle();
            const response = await axios.get(`http://localhost:3001/api/checkClient`, {
                params: { uuid: user.uid }
            })

            if (response.status !== 200){
                console.log("Admin Check Error", response.data);
            }

            if (response.data.exists == false){
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/selector");
            } 
            else {
                navigate("/adm-hub-hidden");
            }
        
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