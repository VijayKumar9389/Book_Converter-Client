import React, { useState } from 'react';
import axios from 'axios';

interface LoginFormProps {
    onLoginSuccess: (accessToken: string, refreshToken: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission default behavior

        setError(''); // Clear any previous error message

        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password,
            });

            // Extract tokens from the response
            const { access, refresh } = response.data;

            // Store tokens in localStorage (or sessionStorage as per your requirement)
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            // Notify parent component of login success
            onLoginSuccess(access, refresh);

        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                setError('Invalid username or password'); // Handle 401 Unauthorized error
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }

            console.error('Login error:', err.response?.data || err.message); // Log error details for debugging
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="w-full p-2 mt-2 border border-gray-300 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 mt-2 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white rounded">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;