import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const RequireNoAuth = () => {
    const { auth } = useAuth(); // Get auth context
    const location = useLocation();

    // If the user is authenticated, redirect to the homepage or any other page
    return auth?.user
        ? <Navigate to="/" state={{ from: location }} replace />
        : <Outlet />;
};

export default RequireNoAuth;
