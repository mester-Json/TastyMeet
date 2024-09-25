import styled from "styled-components";
import Slider from 'react-slick';


export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:100px;
    height: 70vh;
`;


export const Card = styled.div`


`;

export const DivImage = styled.div`
    width: 450px;
    height: 400px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: grab;
    user-select: none;
    /* transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
        transition-duration: 0.5s;
    }  */
`

export const DivDescriptionPersso = styled.div`
margin-top :-50px;

`

export const ImageContainer = styled.div`
    width: 100%; 
    height: 100%;
    border-radius: 50%;
    background-color: #333;
    margin:auto;
    display: flex;

`;


export const Name = styled.h2`
    font-size: 1.5em;
    text-align: center;
    margin-top: 20px;
`;

export const Description = styled.p`
    text-align: center;

    
`;

const NavArrow = styled.div`
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    background-color: white; 
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    transform: perspective(500px) rotateX(10deg) rotateY(10deg);
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: perspective(500px) rotateX(0deg) rotateY(0deg) scale(1.05);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    &::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border-radius: 50%;
        z-index: -1;
        background: inherit;
        box-shadow: 0 0 8px 4px currentColor;
        opacity: 0.7;
        transition: box-shadow 0.3s;
    }
`;

export const LeftArrow = styled(NavArrow)`
    left: 625px;
    color: red;
    font-size: 2em;
    user-select: none;

    &::before {
        box-shadow: 0 0 8px 4px red;
    }
`;

export const RightArrow = styled(NavArrow)`
    right: 625px; 
    color: mediumspringgreen;
    font-size: 2em;
    user-select: none;

    &::before {
        box-shadow: 0 0 8px 4px mediumspringgreen;
    }
`;


export const GenderAge = styled.div`
  font-size: 1em;
  margin-top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  user-select: none;

`;

export const DescriptionPersso = styled.div`
    background-color: white;
    width: 100%;
    border-top: 9px solid black;
    height: 200px ;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    user-select: none;

`


export const Img = styled.img`
    width:450px;
    height: 350px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;


`

export const SliderStyle = styled(Slider)`
    user-select: none;
    outline: none; 
    border: none;
    pointer-events: none;

    &:focus {
        outline: none; /* Supprime le contour lors du focus */
    }
`;