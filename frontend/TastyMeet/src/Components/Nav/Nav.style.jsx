import styled from 'styled-components';

export const NavBar = styled.nav`
    display: flex;
    background: black;
`

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

    &:focus {
        outline: none;
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

        }(-45deg)' : 'rotate(0)'};
    }
}
`;

export const Menu = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    background: #a87676;
    position: absolute;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    top: 5rem; 
    left: 0;
    height: 100vh;
    width: 200px; 
    padding: 20px;
    transition: transform 0.3s ease-in-out;

    li {
        margin-bottom: 1rem;
        font-size: 1.2rem;
        color: white;

        a {
            text-decoration: none;
            color: white;
        }
    }
`;
