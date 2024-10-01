import styled from 'styled-components';

/* -----------------Form-----------------------*/
export const FormularRegister = styled.form`
    display: flex;
    flex-wrap: wrap;
    background-color: rgba(207, 206, 206, 0.5);
    padding: 1.25rem; /* 20px -> 1.25rem */
    max-width: 70%; /* Réduit à un pourcentage */
    height: auto;
    border-radius: 1.25rem; /* 20px -> 1.25rem */
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1); /* 0 4px 8px */
    margin: 10rem auto; /* 150px -> 10rem */
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        max-width: 90%;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
`;

export const FormMoreInfo = styled.form`
    display: flex;
    flex-wrap: wrap;
    background-color: rgba(207, 206, 206, 0.5);
    padding: 1.25rem;
    max-width: 90%; /* Pourcentage pour la responsivité */
    height: auto;
    border-radius: 1.25rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
    margin: 15rem auto 0; /* Adapté pour centrer mieux */
    @media (max-width: 768px) {
        max-width: 90%;
        margin: 3rem auto 0;
    }
`;

/* ----------------------------------------*/
/* -----------------Input-----------------------*/
export const InputField = styled.input`
    width: 100%; /* Utilisation de 100% pour la largeur */
    padding: 0.5rem; /* 7px -> 0.5rem */
    border: 1px solid #ccc;
    border-radius: 1.25rem; /* 20px -> 1.25rem */
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
    margin-bottom: 0.5rem;
    &:focus {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
        outline: none;
    }
    &::placeholder {
        text-align: center;
    }
`;

export const InputFieldAge = styled(InputField)`
    padding: 0.5rem; /* Unité relative pour l'accessibilité */
    text-align: center;
`;

export const InputAvatar = styled.input`
    padding: 0.625rem; /* 10px -> 0.625rem */
    border-radius: 50%;
`;

/* ----------------------------------------*/
/* -----------------Button+Select-----------------------*/
export const Select = styled.select`
    width: 100%; /* Remplacer px par 100% */
    padding: 0.5rem;
    font-size: 0.875rem; /* 13px -> 0.875rem */
    text-align: center;
    border-radius: 1.25rem;
    border: 1px solid #ccc;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
    margin-bottom: 0.5rem;
    &:focus {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
        outline: none;
    }
`;

export const Button = styled.button`
    width: 100%; /* Largeur relative à son parent */
    height: 2rem; /* 30px -> 2rem */
    background: #2a0800;
    color: white;
    border: none;
    border-radius: 1.25rem;
    cursor: pointer;
    margin-top: 1.5rem; /* 25px -> 1.5rem */
    transition: transform 0.3s ease, background-color 0.3s ease;

    &:hover {
        background-color: #775144;
        transform: translateY(0.3125rem); /* 5px -> 0.3125rem */
    }
`;

/* ----------------------------------------*/
/* -----------------Img-----------------------*/
export const ImgAvatar = styled.img`
    width: 9.375rem; /* 150px -> 9.375rem */
    height: 9.375rem;
    border-radius: 50%;
    box-shadow: 0 0.3125rem 0.625rem rgba(0, 0, 0, 0.8);
    margin-bottom: 0.625rem; /* 10px -> 0.625rem */
`;

export const ImgEye = styled.img`
    position: absolute;
    right: 40%; /* Remplacer les pixels par des pourcentages */
    top: 54.4%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 1.25rem; /* 20px -> 1.25rem */
    height: 1.25rem;
`;

/* ----------------------------------------*/
/* -----------------Text+Label-----------------------*/
export const TitleForm1 = styled.h1`
    font-size: 2rem; /* xx-large remplacé par une valeur plus spécifique */
    color: white;
    font-weight: bold;
    text-align: center;
`;

export const TitleForm2 = styled.h2`
    font-size: 2rem;
    color: white;
    font-weight: bold;
    text-align: center;
`;

export const P = styled.p`
    font-size: 0.75rem; /* 12px -> 0.75rem */
    margin-left: 50%; /* Ajuster avec % */
`;

export const Description = styled.textarea`
    border-radius: 1.25rem;
    padding: 0.625rem;
    max-height: 15.625rem; /* 250px -> 15.625rem */
    height: 6.25rem; /* 100px -> 6.25rem */
    overflow-y: auto;
`;

/* ----------------------------------------*/
/* -----------------Div-----------------------*/
export const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0.375rem; /* 6px -> 0.375rem */
    margin-right: 0.9375rem; /* 15px -> 0.9375rem */
    padding: 0.3125rem; /* 5px -> 0.3125rem */
`;

export const Div2 = styled(Div)`
    margin-left: 0.9375rem;
`;

export const DivError = styled.div`
    height: 1.5625rem; /* 25px -> 1.5625rem */
    text-align: left;
    margin-bottom: 0.5rem;
    margin-right: auto;
    margin-left: auto;
`;

/* ----------------------------------------*/
