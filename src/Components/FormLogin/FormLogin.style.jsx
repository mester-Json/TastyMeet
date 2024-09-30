import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgba(207, 206, 206, 0.5);
  padding: 20px;
  width: 80%;
  max-width: 550px;
  min-width:150px;
  height: auto;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

`;

export const InputField = styled.input`
  width: calc(100% - 35px);
  padding: 12px;
  margin: 25px 15px 0 0;
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
  width: calc(100% - auto);
  padding: 10px ;
  background: #2A0800;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: crosshair;
  margin:25px  10px  20px  10px  ;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: #775144;
    transform: translateY(-5px);
  }
`;

export const Inscription = styled(Link)`
  color: black;
  margin: 50px ;
  text-align: center;

  &:hover {
    color: #4FFFE3;
  }  
  @media (max-width: 768px) {
    font-size:10px;
    margin-left:0px;
}
`;

export const Mdp = styled(Link)`
  color: black;
  margin: 50px  ;
  text-align: center;

  &:hover {
    color: #4FFFE3;
  }
  @media (max-width:768px) {
    font-size:10px;
    margin-left:5px;

  }
`;

export const Div = styled.div`
    padding:150px;
    margin-bottom:63px;

`