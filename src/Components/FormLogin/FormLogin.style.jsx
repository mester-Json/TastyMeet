import styled from "styled-components";
import { Link } from "react-router-dom";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgba(207, 206, 206, 0.5);
  padding: 1.5vw;
  border-radius: 1.5vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 18vh;
  @media (min-width: 426px) {
    height: 100%; 
  }
`;

export const InputField = styled.input`
  text-align: center;
  padding: 3vw;
  margin: 0.5vw;
  border: 1px solid #ccc;
  border-radius: 1.5vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  &:focus {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    outline: none;
  }
  font-size: 3vw;
  @media (min-width: 426px) {
    font-size: 2vw;
    padding: 0.5vw;
  }

  @media (min-width: 769px) {
    font-size: 1.5vw;
    padding: 0.5vw;
  }

  @media (min-width: 1266px) {
    font-size: 1vw;
    padding: 0.5vw;
  }
`;

export const Button = styled.button`
  padding: 2vw;
  background: #2a0800;
  color: white;
  border: none;
  border-radius: 1.5vw;
  cursor: crosshair;
  margin: 0.5vw 1vw 0.5vw 1vw;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: #775144;
    transform: translateY(-5px);
  }
  font-size: 3vw;

  @media (min-width: 426px) {
    font-size: 2vw;
    padding: 0.4vw;
  }

  @media (min-width: 769px) {
    font-size: 1.5vw;
    padding: 0.4vw;
  }

  @media (min-width: 1266px) {
    font-size: 1vw;
    padding: 0.4vw;
  }
`;

export const DivText = styled.div`
  display: inline-flex;
  justify-content: space-around;
`;

export const Inscription = styled(Link)`
  color: black;
  &:hover {
    color: #4fffe3;
  }
`;

export const Mdp = styled(Link)`
  color: black;
  &:hover {
    color: #4fffe3;
  }
`;

export const Div = styled.div`
  width: 70%;
  font-size: 3vw;
  @media (min-width: 426px) {
    width: 50%;
    font-size: 2vw;
  }

  @media (min-width: 769px) {
    width: 45%;
    font-size: 1.5vw;
  }

  @media (min-width: 1266px) {
    width: 30%;
    font-size: 1vw;
  }
`;