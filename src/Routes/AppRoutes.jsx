import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import { Accueil } from "../Pages/Accueil.jsx";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Accueil" element={<Accueil />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

