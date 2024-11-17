// services/authService.ts
import axios from 'axios';
import { refreshToken} from "./token.utils.ts";

// Helper function to get the access token
const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

// Helper function to get the refresh token
const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken');
};

// API Client with interceptors
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

// Add request interceptor to attach access token
apiClient.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Add response interceptor to handle token expiration and refresh
apiClient.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshTokenFromStorage = getRefreshToken();
            try {
                const newAccessToken = await refreshToken(refreshTokenFromStorage);
                localStorage.setItem('accessToken', newAccessToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Optional: Redirect to login page here if refresh fails
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // Reject other errors
    }
);

export { apiClient, getAccessToken, getRefreshToken };