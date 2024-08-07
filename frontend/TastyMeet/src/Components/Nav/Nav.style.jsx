import styled from 'styled-components';



export const NavBar = styled.nav`
    display: inline-flex;
    justify-content: space-between;
    background: #2A0800;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 124px; 
`;

export const BurgerMenu = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10; 
    margin: 40px 25px 0 0;
    transition: transform 0.3s ease-in-out;
    
    &:focus {
        outline: none;
    }

    &:hover div {
        background: Grey; 
    }

    div {
        width: 2rem;
        height: 0.25rem;
        background: white;
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;

        :first-child {
            transform: ${({ open }) => open
    ? 'rotate(45deg)' : 'rotate(0)'};
        }

        :nth-child(2) {
            opacity: ${({ open }) => open ? '0' : '1'};
            transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'}; 
        }

        :last-child {
            transform: ${({ open }) => open
    ? 'rotate(-45deg)' : 'rotate(0)'};
        }
    }
`;

export const Menu = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    background: #2A0800;
    position: absolute;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 5rem; 
    right: 0;  
    height: 20vh;
    width: 200px; 
    padding: 20px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    box-shadow: ${({ open }) => open ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none'}; // Ombre lors de l'ouverture

    li {
        margin-bottom: 1rem;
        font-size: 1.2rem;
        color: white;

        a {
            text-decoration: none;
            color: white;
            &:hover {
                color: #775144 ;
            }
        }
    }
`;

export const Img = styled.img`
    width: 85px ;
    height: 85px;
    display: flex;
    padding: 20px;
`
