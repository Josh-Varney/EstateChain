import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import LandingHeader from "../../landing/components/header/header";
import LoginForm from "./components/login-form";

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();

    const checkAuthStatus = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          await signOut(auth);
        } catch (error) {
          console.error("Error signing out: ", error);
        }
      }
    };

    checkAuthStatus();
  }, [navigate]);

  window.addEventListener('message', (event: MessageEvent) => {
    console.log('Message received:', event); // Debugging all messages
  
    if (event.origin !== 'http://localhost:3000') {
      console.error('Unexpected origin:', event.origin);
      return;
    }
  
    const { status, accessToken } = event.data;

    console.log("shush");
  
    if (status === 'success') {
      console.log("shush succes")
      console.log('Login Successful! Access Token:', accessToken);
    } else if (status === 'failure') {
      console.log('Login Failed!');
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      <div data-aos="fade-down">
        <LandingHeader />
      </div>
      <div className="flex items-center justify-center flex-grow p-4 bg-cover bg-center" data-aos="zoom-in">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginScreen;
