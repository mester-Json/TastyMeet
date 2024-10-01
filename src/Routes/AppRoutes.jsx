import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import Messaging from "../Pages/Messaging.jsx";
import Message from "../Pages/Message.jsx";
import Accueil from "../Pages/Accueil.jsx";
import ProfilPage from '../Pages/ProfilePage.jsx';
import Help from '../Pages/Help.jsx';

const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null;
};

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route path="/messaging" element={isAuthenticated() ? <Messaging /> : <Navigate to="/" />} />
                <Route path="/message/:conversationId" element={isAuthenticated() ? <Message /> : <Navigate to="/login" replace />} />                <Route path="/accueil" element={isAuthenticated() ? <Accueil /> : <Navigate to="/" />} />
                <Route path="/profile" element={isAuthenticated() ? <ProfilPage /> : <Navigate to="/" />} />
                <Route path="/help" element={isAuthenticated() ? <Help /> : <Navigate to="/" />} />

                {/* Fallback for unknown routes */}
                <Route path="*" element={<h1> 404  </h1>} />
            </Routes>
        </BrowserRouter>
    );
};

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
