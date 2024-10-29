import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

interface ProtectedRouteProps {
    children: ReactNode; // Define the type for children prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Optionally handle loading state

    return currentUser ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
