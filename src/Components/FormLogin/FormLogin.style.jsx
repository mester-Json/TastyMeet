import styled from 'styled-components';
import { Link, } from 'react-router-dom'


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    background-color: rgba(207, 206, 206, 0.5); 
    padding: 20px;
    width: 70%;        
    max-width: 450px;  
    height: auto;
    margin: 300px 0 0 750px ;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 

    @media (max-width: 768px) {
        width: 90%;  
    }
`;

export const InputField = styled.input`
    width: calc(90% - 20px);
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 20px;
    margin-left: 25px;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    transition: box-shadow 0.3s ease;

    &:focus {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); 
        outline: none; 
    }
`;

export const Button = styled.button`
    width: calc(50% - 30px);
    padding: 10px;
    background: #2A0800;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: crosshair ;
    margin-left: 135px;
    margin-bottom: 20px;
    transition: transform 0.3s ease, background-color 0.3s ease;

    &:hover {
        background-color: #775144;
        transform: translateY(-5px);  
    }
`

export const Inscription = styled(Link)`
    color: black  ;
    margin-left: 115px;
    &:hover {
        color: #775144;
    }
`

export const Mdp = styled(Link)`
    color: black;
    margin-left: 40px;
    &:hover {
        color: #775144;
    }
`


