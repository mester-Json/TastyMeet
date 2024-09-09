import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login  />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;