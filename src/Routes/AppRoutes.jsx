import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "../Components/Nav/Nav.jsx";
import { Footer } from "../Components/Footer/Footer.jsx";

import { ChatApp } from "../Components/Messaging/ChatApp.jsx";
import { FormHelp } from '../Components/FormHelp/FormHelp.jsx';
import { FormRegister } from '../Components/FormRegister/FormRegister.jsx';
import { Profil } from "../Components/Profil/Profil";
import { Home } from "../Components/Home/Home.jsx";
import { FormLogin } from '../Components/FormLogin/FormLogin.jsx'


import "../App.css";
import Messaging from "../Pages/Messaging.jsx";


const isAuthenticated = () => {
    return sessionStorage.getItem("token") !== null;
};

export const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Nav />
                <div id="container">
                    <Routes>
                        <Route path="/" element={<FormLogin />} />
                        <Route path="/register" element={<FormRegister />} />
                        {/* Protected Routes */}
                        <Route
                            path="/messaging"
                            element={isAuthenticated() ? <Messaging /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/message/:conversationId"
                            element={
                                isAuthenticated() ? (
                                    <ChatApp />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                        <Route
                            path="/accueil"
                            element={isAuthenticated() ? <Home /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/profile"
                            element={isAuthenticated() ? <Profil /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/help"
                            element={isAuthenticated() ? <FormHelp /> : <Navigate to="/" />}
                        />
                        {/* Fallback for unknown routes */}
                        <Route path="*" element={<h1> 404 </h1>} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </>
    );
};