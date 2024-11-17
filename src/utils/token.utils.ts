import axios from "axios";

// Check if the token is valid by inspecting the JWT expiration
export const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        return payload.exp * 1000 > Date.now(); // Check if token has expired
    } catch {
        return false; // Invalid token format
    }
};

// Function to refresh the access token using the refresh token
export const refreshToken = async (refreshToken: string | null) => {
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await axios.post(
            'http://localhost:8000/api/refresh/',
            { refresh: refreshToken },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        return response.data.access; // Return new access token
    } catch {
        throw new Error('Token refresh failed');
    }
};