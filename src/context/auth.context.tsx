import {createContext, ReactNode, useContext, useState} from "react";

// Define the shape of your context
interface AuthContextType {
    username: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    setAuthData: (username: string, accessToken: string, refreshToken: string) => void;
}

// Provide a default value for the context
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    const setAuthData = (username: string, accessToken: string, refreshToken: string) => {
        setUsername(username);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        // Optionally save to local storage
        localStorage.setItem("username", username);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    };

    return (
        <AuthContext.Provider value={{username, accessToken, refreshToken, setAuthData}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for consuming the context
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;