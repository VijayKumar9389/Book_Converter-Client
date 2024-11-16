import { useState } from 'react';
import axios from 'axios';

const RefreshTokenForm = () => {
    const [error, setError] = useState('');

    const handleRefresh = async () => {
        // Retrieve the refresh token from localStorage
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            setError('No refresh token available');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8000/api/refresh/',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`, // Use the correct format for headers
                    },
                }
            );

            // Assuming you'll want to handle the response here, e.g., storing the new access token
            console.log('New access token:', response.data);

        } catch (err) {
            setError('Failed to refresh token');
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Refresh Access Token</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={handleRefresh} className="w-full p-2 mt-4 bg-blue-500 text-white rounded">Refresh Token</button>
        </div>
    );
};

export default RefreshTokenForm;