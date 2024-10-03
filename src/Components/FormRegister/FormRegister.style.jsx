import styled from "styled-components";

/* -----------------Form-----------------------*/
export const FormularRegister = styled.form`
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(207, 206, 206, 0.5);
  padding: 1vw;
  fit-content;
  border-radius: 5vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  justify-content: center;
  align-items: center;

  @media (min-width: 426px) {
    display: flex;
    gap: 1vw;
    flex-wrap: none;
  }
  @media (min-width: 769px) {
    display: flex;
    flex-wrap: none;
    gap: 1vw;
  }
`;

export const FormMoreInfo = styled.form`
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(207, 206, 206, 0.5);
  padding: 1vw;
  height: fit-content;
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;


`;

/* -----------------Input-----------------------*/
export const InputField = styled.input`
  padding: 1vw;

  border: 1px solid #ccc;
  border-radius: 1.5vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  &:focus {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    outline: none;
  }

  &::placeholder {
    text-align: center;
  }

  @media (min-width: 426px) {
    font-size: 2vw;
  }

  @media (min-width: 769px) {
    font-size: 1.5vw;
  }

  @media (min-width: 1266px) {
    font-size: 1vw;
    padding: 0.4vw;
  }
`;

export const InputFieldAge = styled(InputField)`
  padding: 1vw;
  text-align: center;

  @media (min-width: 426px) {
    font-size: 2vw;
  }

  @media (min-width: 769px) {
    font-size: 1.5vw;
  }

  @media (min-width: 1266px) {
    font-size: 1vw;
    padding: 0.4vw;
  }
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
  padding: 1vw;
  border: 1px solid #ccc;
  border-radius: 1.5vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  &:focus {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    outline: none;
  }

  &::placeholder {
    text-align: center;
  }

  @media (min-width: 426px) {
    font-size: 2vw;
  }

  @media (min-width: 769px) {
    font-size: 1.5vw;
  }
  @media (min-width: 1266px) {
    font-size: 1vw;
    padding: 0.4vw;
  }
`;

export const Button = styled.button`
  width: 60%;
  height: 3vh;
  background: #2a0800;
  color: white;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  margin-top: 1vh;
  &:hover {
    background-color: #775144;
    transform: translateY(5px);
  }

  @media (min-width: 1025px){
    font-size: 1vw;
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
  text-align: center;
  font-size: 13px;
  color: red;
`;

/* -----------------Div-----------------------*/
export const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;

  @media (min-width: 426px) {
    width: 35vw;
  }
  @media (min-width: 769px) {
    width: 30vw;
  }
  @media (min-width: 1025px) {
    width: 20vw;
  }
`;

export const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  gap: 1vh;

  @media (min-width: 426px) {
    width: 35vw;
  }
  @media (min-width: 769px) {
    width: 30vw;
  }
  @media (min-width: 1025px) {
    width: 20vw;
  }
`;

export const DivError = styled.div`
  height: 2.74vh;
  text-align: left;
  margin-bottom: 0.3vh;
  margin-right: auto;
  margin-left: auto;
`;

export const ContainerRegister = styled.div`
  margin: auto;
  font-size: 3vw;
  @media (max-width: 425px) {
    width: 80vw;
  }
  @media (min-width: 426px) {
    font-size: 2vw;
  }

  @media (min-width: 769px) {
    font-size: 1.5vw;
  }

  @media (min-width: 1266px) {
    font-size: 1vw;
  }
`;
