import { useState } from 'react';
import { BurgerMenu, Menu, NavBar, Img, NavDiv } from './Nav.style.jsx';
import logo from "../../Resources/Images/Logo.png";

export const Nav = () => {
    const [open, setOpen] = useState(false);

    return (

        <NavBar>
            <Img src={logo} alt="Logo" />
            <NavDiv>
                <BurgerMenu open={open} onClick={() => setOpen(!open)}>
                    <div />
                    <div />
                    <div />
                </BurgerMenu>
                <Menu open={open}>
                    <li><a href="/profile">Mon Profile</a></li>
                    <li><a href="/accueil">Crouncher</a></li>
                    <li><a href="/message">Tchacher</a></li>
                    <li><a href="/help">Help</a></li>
                </Menu>

            </NavDiv>
        </NavBar>

    )
};

