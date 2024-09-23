import styled from 'styled-components';


/* -----------------Form-----------------------*/
export const FormularRegister = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(207, 206, 206, 0.5);
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    max-width: 36.5vw;       /* Taille maximale sur les grands écrans */
    margin-bottom: 10vh;
    @media (max-width: 768px) {
        max-width: 45vw;
    }
    
    @media (max-width: 339px) {
        max-width: 55vw;
    }
    
    `;
export const FormMoreInfo = styled.form`

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(207, 206, 206, 0.5);
    padding: 20px;
    border-radius: 20px;
    flex-wrap: wrap;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top:5%; /* Centrer horizontalement en cas de besoin */
    margin-left: auto;
    margin-right: auto;
    max-width: 40vw;       /* Taille maximale sur les grands écrans */

/*   @media (max-width: 1610px){
        max-width: 40vw;
    }
    @media (max-width: 1530px){
        max-width: 45vw;
    }*/
    
    @media (max-width: 1366px) {
        max-width: 45vw;
    }

    @media (max-width: 1100px) {
        max-width: 52vw;
    }
    @media (max-width: 830px) {
        max-width: 58vw;
    }

    @media (max-width: 339px) {
        max-width: 55vw;
    }
    
    /*display: flex;
        flex-wrap: wrap;
        background-color: rgba(207, 206, 206, 0.5);
        padding: 20px;
        max-width: 36.5vw;
        height: auto;
        border-radius: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        justify-content: center;
        align-items: center;
        margin: 250px 0 0 600px ;*/
    `;
/* ----------------------------------------*/
/* -----------------Input-----------------------*/
export const InputField = styled.input`
        width: 14.5vw;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 20px;
        font-size: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.3s ease;
        margin-bottom: 20px;
        &:focus {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            outline: none;
        }
    
    @media (max-width: 1366px){
        font-size: 12px;
    }
    @media (max-width: 768px) {
        font-size: 10px;
    }
    @media (max-width: 411px) {
        font-size: 8px;
    }
    `;
export const InputAvatar = styled.input`
        padding: 10px;
        width: 10vw;
        height: 10vw;  
        display: none;
        
    `;
/* ----------------------------------------*/
/* -----------------Button+Select-----------------------*/
export const Select = styled.select`
    padding: 10px;
    font-size: 16px;
    border-radius: 20px;
    width: 15.5vw;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
    margin-bottom: 20px;

    &:focus {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        outline: none;
    }
    @media (max-width: 1366px){
        font-size: 12px;
        width: 15.8vw;
    }
    @media (max-width: 768px) {
        font-size: 10px;
        width: 17.1vw;
    }
    @media (max-width: 411px) {
        width: 20vw;
        font-size: 7px;
    }
`;
export const Button = styled.button`

    height: 30px;
    background: #2A0800;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    width: 10vw;

    transition: transform 0.3s ease, background-color 0.3s ease;

    &:hover {
        background-color: #775144;
        transform: translateY(5px);
    }
    @media (max-width: 1366px){
        font-size: 12px;
    }
    @media (max-width: 768px) {
        font-size: 10px;
    }
    @media (max-width: 411px) {
        font-size: 6px;
    }
`;
/* ----------------------------------------*/
/* -----------------Img-----------------------*/
export const ImgAvatar = styled.img`
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
        box-shadow: 0 5px 10px rgba(0, 0.2, 0.2, 0.8);
        margin-bottom: 10px;
    `;
export const ImgEye = styled.img`
        position: absolute;
        right: 35.5%;
        top: 56.4%;
        cursor: pointer;
        width: 20px;
        height: 20px;

    `;
/* ----------------------------------------*/
/* -----------------Text+Label-----------------------*/
export const TitleForm1 = styled.h1`
    color: white;
    font-weight: bold;
    font-size: 35px;
    text-align: center;
    margin-top: 20vh;
`;
export const P = styled.p`
        font-size: 12px;
        margin-left: 50%;
    
        @media (max-width: 1366px) {
            font-size: 10px;
        }
    
        @media (max-width: 768px) {
            font-size: 8px;
        }
    
    `;
export const Description = styled.textarea`
        border-radius: 20px;
        padding: 10px;
        height: 14.5vh;
        width: 14.5vw;
        overflow-y: auto;
        
    `;

export const LabelError = styled.label`
        color: red;
    `;

export  const LabelPhoto = styled.label`

`;
/* ----------------------------------------*/
/* -----------------Div-----------------------*/
export const Div = styled.div`
        display: flex;
        flex-direction: column;
        margin-right: 5px;
    `;
export const Div2 = styled.div`
        display: flex;
        flex-direction: column;
        margin-left: 5px;
    `;
export const DivError = styled.div`
        height: 25px;
        text-align: left ;
        margin-bottom: 5px;
        margin-right: 5px;
    `;
/* ----------------------------------------*/