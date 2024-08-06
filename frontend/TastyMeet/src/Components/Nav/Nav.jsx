import { useState } from 'react';
import { BurgerMenu , Menu , NaveBar } from './Nav.style.jsx';

const Nav = () => {
    const [ open , setOpen ] = useState( false );

    return (
        <>
            <NavBar>

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
        </>
    );
};

export default Nav;