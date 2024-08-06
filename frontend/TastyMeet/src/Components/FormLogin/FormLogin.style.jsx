import styled from 'styled-components';

export const FormContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.2); 
    padding: 20px;
    border-radius: 8px;
`;

export const Form = styled.form`
    display: flex;
`

export const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const LoginButton = styled.button`
    background-color: #a87676; 
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

export const Link = styled.a`
    color: #a87676; 
    text-decoration: none;
    margin-right: 10px;
`;
