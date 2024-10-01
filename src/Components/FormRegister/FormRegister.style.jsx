import styled from 'styled-components';

/* -----------------Form-----------------------*/
export const FormularRegister = styled.form`
    display: flex;
    flex-wrap: wrap;
    background-color: rgba(207, 206, 206, 0.5);
    padding: 20px;
    max-width: 700px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 150px;
    margin-bottom: 150px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        max-width: 90%;
        margin-top: 100px;
        margin-bottom: 100px;
    }
`;

export const FormMoreInfo = styled.form`
    display: flex;
    flex-wrap: wrap;
    background-color: rgba(207, 206, 206, 0.5);
    padding: 20px;
    max-width: 700px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
    margin: 250px 0 0 600px;

    @media (max-width: 768px) {
        width: 90%;
        margin: 100px auto 0 auto; /* Centrer le formulaire sur petit écran */
    }
`;

/* -----------------Input-----------------------*/
export const InputField = styled.input`
    width: 300px;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
    margin-bottom: 5px;

    &:focus {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        outline: none;
    }
    
    &::placeholder {
        text-align: center;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const InputFieldAge = styled.input`
    width: 300px;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
    margin-bottom: 5px;
    text-align: center;

    &:focus {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        outline: none;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const InputAvatar = styled.input`
    padding: 10px;
    border-radius: 100px;
`;

/* -----------------Button+Select-----------------------*/
export const Select = styled.select`
    width: 315px;
    padding: 5px;
    font-size: 13px;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
    margin-bottom: 5px;

    &:focus {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        outline: none;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const Button = styled.button`
    width: 200px;
    height: 30px;
    background: #2A0800;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 25px;
    transition: transform 0.3s ease, background-color 0.3s ease;

    &:hover {
        background-color: #775144;
        transform: translateY(5px);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

/* -----------------Img-----------------------*/
export const ImgAvatar = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 0 5px 10px rgba(0, 0.2, 0.2, 0.8);
    margin-bottom: 10px;

    @media (max-width: 768px) {
        width: 100px;
        height: 100px;
    }
`;

export const ImgEye = styled.img`
    position: absolute;
    right: 640px;
    top: 54.4%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 20px;
    height: 20px;

    @media (max-width: 768px) {
        right: 30px; /* Ajuste la position en fonction de l'écran */
    }
`;

/* -----------------Text+Label-----------------------*/
export const TitleForm1 = styled.h1`
    font-size: xx-large;
    color: white;
    font-weight: bold;
    text-align: center;

    @media (max-width: 768px) {
        font-size: x-large; /* Ajuste la taille du titre */
    }
`;

export const TitleForm2 = styled.h2`
    font-size: xx-large;
    color: white;
    font-weight: bold;
    align-items: center;
    text-align: center;

    @media (max-width: 768px) {
        font-size: x-large; /* Ajuste la taille du sous-titre */
    }
`;

export const P = styled.p`
    font-size: 12px;
    margin-left: 200px;

    @media (max-width: 768px) {
        margin-left: 0; /* Centre le texte sur petits écrans */
        text-align: center;
    }
`;

export const Description = styled.textarea`
    border-radius: 20px;
    padding: 10px;
    max-height: 250px;
    height: 100px;
    overflow-y: auto;

    @media (max-width: 768px) {
        width: 100%; /* Prend toute la largeur sur petits écrans */
    }
`;

export const LabelError = styled.label`
    text-align: center;
    font-size: 13px;
    color: red;
`;

/* -----------------Div-----------------------*/
export const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 6px;
    margin-right: 15px;
    padding: 5px;

    @media (max-width: 768px) {
        margin-right: 0; /* Centre les éléments sur petits écrans */
        align-items: center; /* Centre les éléments horizontalement */
    }
`;

export const Div2 = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    padding: 5px;

    @media (max-width: 768px) {
        margin-left: 0; /* Centre les éléments sur petits écrans */
        align-items: center; /* Centre les éléments horizontalement */
    }
`;

export const DivError = styled.div`
    height: 25px;
    text-align: left;
    margin-bottom: 5px;
    margin-right: auto;
    margin-left: auto;
`;
