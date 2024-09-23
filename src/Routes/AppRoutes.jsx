import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from "../Pages/Login.jsx";
import { Register } from "../Pages/Register.jsx";
import { Messaging } from "../Pages/Messaging.jsx";
import { Message } from "../Pages/Message.jsx";
import { Accueil } from "../Pages/Accueil.jsx";
import { ProfilPage } from '../Pages/ProfilePage.jsx';
import { Help } from '../Pages/Help.jsx';


const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;  // Si le token existe, l'utilisateur est authentifié
};

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/messaging" element={isAuthenticated() ? <Messaging /> : <Navigate to="/message" replace />} />
                <Route path="/message" element={isAuthenticated() ? <Message /> : <Navigate to="/login" replace />} />
                <Route path="/accueil" element={isAuthenticated() ? <Accueil /> : <Navigate to="/login" replace />} />
                <Route path="/profile" element={isAuthenticated() ? <ProfilPage /> : <Navigate to="/login" replace />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

// export const AppRoutes = () => {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path='/profile' element={<ProfilPage />} />
//                 <Route path="/messaging" element={<Messaging />} />
//                 <Route path="/message" element={<Message />} />
//                 <Route path="/Accueil" element={<Accueil />} />
//                 <Route path="/help" element={<Help />} />
//                 <Route path="*" element={<h1>404 Not Found</h1>} />

//             </Routes>
//         </BrowserRouter>
//     );
// }

/*

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from "../Pages/Login.jsx";
import { Register  }from "../Pages/Register.jsx";

import { Messaging } from "../Pages/Messaging.jsx";
import { Message } from "../Pages/Message.jsx";
import { Accueil } from "../Pages/Accueil.jsx";
*/