import styled from 'styled-components';

/* -----------------Form-----------------------*/
export const FormularRegister = styled.form
    `
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
        margin: 250px 0 0 600px ;
        @media (max-width: 768px) {
            width: 90%;
        }

    `;
export const FormMoreInfo = styled.form
    `
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
        margin: 250px 0 0 600px ;
        @media (max-width: 768px) {
            width: 90%;
        }
    `;
/* ----------------------------------------*/
/* -----------------Input-----------------------*/
export const InputField = styled.input
    `
        width: 300px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.3s ease;
        margin-bottom: 20px;
        &:focus {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            outline: none;
        }
    `;
export const InputAvatar = styled.input
    `
        padding: 10px;
        border-radius: 100px;
    `;
/* ----------------------------------------*/
/* -----------------Button+Select-----------------------*/
export const  Select = styled.select
    `
        width: 320px;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #ccc;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.3s ease;
        margin-bottom: 20px;
        &:focus {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            outline: none;
        }
    `;
export const Button = styled.button
    `
        width: 200px;
        height: 30px;
        background: #2A0800;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer ;

        transition: transform 0.3s ease, background-color 0.3s ease;

        &:hover {
            background-color: #775144;
            transform: translateY(5px);
        }
    `;
/* ----------------------------------------*/
/* -----------------Img-----------------------*/
export const ImgAvatar = styled.img
    `
        width: 150px;
        height: 150px;
        border-radius: 50%;
        box-shadow: 0 5px 10px rgba(0, 0.2, 0.2, 0.8);
        margin-bottom: 10px;
    `;
export const ImgEye = styled.img
    `
        position: absolute;
        right: 640px;
        top: 54.4%;
        transform: translateY(-50%);  // Aligne verticalement au centre
        cursor: pointer;
        width: 20px;
        height: 20px;

    `;
/* ----------------------------------------*/
/* -----------------Text+Label-----------------------*/
export const TitleForm1 = styled.h1
    `
        position: absolute;
        font-size: xx-large;
        color : white;
        font-weight: bold;

        top: 150px;
        align-items: center;
        text-align: center;
    `;
export const TitleForm2 = styled.h2
    `
        position: absolute;
        font-size: xx-large;
        color : white;
        font-weight: bold;

        top: 150px;
        align-items: center;
        text-align: center;
    `;
export const P = styled.p
    `
        font-size: 12px;
        margin-left: 200px;
    `;
export const Description = styled.textarea
    `
        border-radius: 20px;
        padding: 10px;
        max-height: 250px;
        height: 100px;
        overflow-y: auto;
    `;

export const LabelError = styled.label
    `
        color: red;
    `;
/* ----------------------------------------*/
/* -----------------Div-----------------------*/
export  const  Div = styled.div
    `
        display: flex;
        flex-direction: column;
        margin-right: 5px;

    `;
export  const  Div2 = styled.div
    `
        display: flex;
        flex-direction: column;
        margin-left: 5px;
    `;
export  const  DivError = styled.div
    `
        height: 25px;
        text-align: left ;
        margin-bottom: 5px;
        margin-right: 5px;
    `;
/* ----------------------------------------*/