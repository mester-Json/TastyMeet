import { useState } from 'react';
import { BurgerMenu , Menu , NavBar , Img , Div } from './Nav.style.jsx';
import logo from "../../Resources/Images/Logo.png" ;

const Nav = () => {
    const [ open , setOpen ] = useState( false );

    return (
        <Div>
            <NavBar>
                <Img src={logo} alt="Logo" />
                <BurgerMenu open={ open } onClick={ () => setOpen( ! open ) }>
                    <div/>
                    <div/>
                    <div/>
                </BurgerMenu>
                <Menu open={ open }>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Mon Profile</a></li>
                    <li><a href="#">Crouncher</a></li>
                    <li><a href="#">Tchacher</a></li>
                    <li><a href="#">Help</a></li>
                </Menu>

            </NavBar>
        </Div>
    );
};

export default Nav;