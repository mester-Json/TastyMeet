import styled from 'styled-components';


export const NavBar = styled.nav`
  display: flex;
  width: 100%;
  background: #2A0800;
  position:relative;
  justify-content: space-between;
`


export const NavDiv = styled.div`
  align-items: center;
  height: 100%;
  padding: 0 20px; 


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
        background-color: #E5EAFE;
        transform: scale(1.5); 
    }

    div {
        width: 100%; 
        height: 0.25rem; 
        background: #ffffff; 
        transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out; 

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
    flex-direction: column;
    background: #2A0800;
    position: absolute;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 6.5rem; 
    z-index:100;
    right: 0;  
    height: 20vh;
    width: 200px; 
    padding: 20px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    box-shadow: ${({ open }) => open ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none'}; 

    li {
        margin-bottom: 1rem;
        font-size: 1.2rem;
        color: white;
        margin-left: 15px;

        a {
            cursor: help;
            text-decoration: none;
            color: white;
            transition: color 0.3s ease; 

            &:hover {
               color:#4FFFE3;
                /* text-decoration: underline solid red;  */
            }
        }
    }
`;

export const Img = styled.img`
  width: 85px;
  height: 85px;
  padding: 20px;
  margin-left: 20px;
`
