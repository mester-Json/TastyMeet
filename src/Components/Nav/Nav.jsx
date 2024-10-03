import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BurgerMenu, Menu, NavBar, Img, NavDiv } from './Nav.style.jsx';
import logo from "../../Resources/Images/Logo.png";
import { logoutUser } from '../../Axios/Axios.js';

export const Nav = () => {
    const [open, setOpen] = useState(false);


    const handleLogout = async (e) => {
        e.preventDefault();
        await logoutUser();
        window.location.reload();
    };


    const isLoggedIn = sessionStorage.getItem('token') !== null;


    return (
        <NavBar>
            <Link to="/accueil">
                <Img src={logo} alt="Logo" />
            </Link>
            <NavDiv>
                {isLoggedIn && (
                    <BurgerMenu open={open} onClick={() => setOpen(!open)}>
                        <div />
                        <div />
                        <div />
                    </BurgerMenu>
                )}
                <Menu open={open}>
                    <li><a href="/profile">Mon Profile</a></li>
                    <li><a href="/accueil">Crouncher</a></li>
                    <li><a href="/messaging">Tchacher</a></li>
                    <li><a href="/help">Help</a></li>
                    {isLoggedIn && (
                        <li><a href="/" id="logout" onClick={handleLogout}>Déconnexion</a></li>
                    )}
                </Menu>
            </NavDiv>
        </NavBar>
    );
};
