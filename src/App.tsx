import { Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage/ProjectPage.tsx";
import Projects from "./pages/Projects/Projects.tsx";
import Login from "./pages/Login/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6">
            <Routes>
                <Route path="/" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/projects/:projectId" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
                <Route path="/login" element={<Login onLoginSuccess={() => {}} />} />
            </Routes>
        </div>
    );
};

export default App;