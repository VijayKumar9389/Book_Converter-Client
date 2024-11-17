// components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext} from "../context/auth.context.tsx";
import { isTokenValid, refreshToken} from "../utils/token.utils.ts";
import { getAccessToken, getRefreshToken} from "../utils/interceptors.ts";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { accessToken } = useAuthContext(); // Assuming you have a setter in context
    const [loading, setLoading] = useState(true); // Loading state to handle token refresh

    const token = accessToken || getAccessToken(); // Fallback to local storage if context is empty

    useEffect(() => {
        const handleTokenRefresh = async () => {
            if (!isTokenValid(token)) {
                const refreshTokenFromStorage = getRefreshToken();
                try {
                    const newAccessToken = await refreshToken(refreshTokenFromStorage);
                    // store the new token in local storage
                    localStorage.setItem('accessToken', newAccessToken); // Store it in localStorage
                } catch (error) {
                    console.error('Token refresh failed:', error);
                    // Optional: Redirect to login page if refresh fails
                }
            }
            setLoading(false);
        };

        if (loading) {
            handleTokenRefresh();
        }
    }, [loading, token]);

    if (loading) return <div>Loading...</div>; // Optionally show a loading state

    if (!isTokenValid(token)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;