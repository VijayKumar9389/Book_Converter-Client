import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                password,
            });
            setMessage(`User ${response.data.username} created successfully.`);
        } catch (err: any) {
            console.error('Registration error:', err.response?.data || err.message);
            setError('Failed to create user');
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleRegister}>
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
                {message && <p className="text-green-500 text-sm">{message}</p>}
                <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white rounded">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;