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

    @media (max-width: 721px) {
        padding: 15px;
        margin-top: 100px;
        margin-bottom: 100px;
        max-width: 90%;
    }

    @media (max-width: 480px) {
        padding: 10px;
        margin-top: 50px;
        margin-bottom: 50px;
        max-width: 95%;
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

    @media (max-width: 1024px) {
        margin: 200px auto;
    }

    @media (max-width: 721px) {
        margin: 150px auto;
        max-width: 90%;
    }

    @media (max-width: 480px) {
        padding: 10px;
        margin: 100px auto;
        max-width: 95%;
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

    @media (max-width: 721px) {
        width: 250px;
    }

    @media (max-width: 480px) {
        width: 200px;
    }
`;

export const InputFieldAge = styled(InputField)`
    padding: 4px;
    text-align: center;
`;

export const InputAvatar = styled.input`
    padding: 10px;
    border-radius: 100px;

    @media (max-width: 721px) {
        padding: 8px;
    }

    @media (max-width: 480px) {
        padding: 6px;
    }
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

    @media (max-width: 721px) {
        width: 260px;
    }

    @media (max-width: 480px) {
        width: 220px;
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

    @media (max-width: 721px) {
        width: 180px;
    }

    @media (max-width: 480px) {
        width: 160px;
    }
`;

/* -----------------Img-----------------------*/
export const ImgAvatar = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 0 5px 10px rgba(0, 0.2, 0.2, 0.8);
    margin-bottom: 10px;

    @media (max-width: 721px) {
        width: 120px;
        height: 120px;
    }

    @media (max-width: 480px) {
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

    @media (max-width: 721px) {
        right: 10px;
    }

    @media (max-width: 480px) {
        right: 5px;
    }
`;

/* -----------------Text+Label-----------------------*/
export const TitleForm1 = styled.h1`
    font-size: xx-large;
    color: white;
    font-weight: bold;
    text-align: center;

    @media (max-width: 721px) {
        font-size: x-large;
    }

    @media (max-width: 480px) {
        font-size: large;
    }
`;

export const TitleForm2 = styled.h2`
    font-size: xx-large;
    color: white;
    font-weight: bold;
    text-align: center;

    @media (max-width: 721px) {
        font-size: x-large;
    }

    @media (max-width: 480px) {
        font-size: large;
    }
`;

export const P = styled.p`
    font-size: 12px;
    margin-left: 200px;

    @media (max-width: 721px) {
        margin-left: 100px;
    }

    @media (max-width: 480px) {
        margin-left: 50px;
    }
`;

export const Description = styled.textarea`
    border-radius: 20px;
    padding: 10px;
    max-height: 250px;
    height: 100px;
    overflow-y: auto;

    @media (max-width: 721px) {
        max-width: 90%;
    }

    @media (max-width: 480px) {
        max-width: 95%;
    }
`;
export const LabelError = styled.label`
    text-align:center;
        font-size:13px;
        color: red;
    `;

/* -----------------Div-----------------------*/
export const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 6px;
    margin-right: 15px;
    padding: 5px;

    @media (max-width: 721px) {
        margin-right: 0;
    }
`;

export const Div2 = styled(Div)`
    margin-left: 15px;

    @media (max-width: 721px) {
        margin-left: 0;
    }
`;

export const DivError = styled.div`
    height: 25px;
    text-align: left;
    margin-bottom: 5px;
    margin-right: auto;
    margin-left: auto;
`;
