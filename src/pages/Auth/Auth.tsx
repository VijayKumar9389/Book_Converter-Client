import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RefreshTokenForm from './components/RefreshTokenForm';

const Auth: React.FC = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    const handleLoginSuccess = (newAccessToken: string, newRefreshToken: string) => {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
    };

    const handleAccessTokenRefreshed = (newAccessToken: string) => {
        setAccessToken(newAccessToken);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white shadow-lg rounded">
                {!accessToken ? (
                    <>
                        <LoginForm onLoginSuccess={handleLoginSuccess} />
                        <RegisterForm />
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Logged In</h2>
                        <p>Access Token: {accessToken}</p>
                        <RefreshTokenForm
                            refreshToken={refreshToken!}
                            onAccessTokenRefreshed={handleAccessTokenRefreshed}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Auth;