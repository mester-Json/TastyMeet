import styled from "styled-components";


export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #7c4a42;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 10%
`;


export const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  text-transform: uppercase;
  text-align: start;
`;

export const HelpText = styled.p`
  background-color: #8b5a50;
  padding: 15px;
  border-radius: 10px;
  text-align: start;
`;


export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


export const QuestionButton = styled.button`
  background-color: #9c6a5f;
  color: #ffffff;
  padding: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  text-align: left;
  margin-bottom: 10px;

  &:hover {
    background-color: #a7796f;
  }
`;


export const QuestionContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "200px" : "0")}; /* Limite la hauteur du contenu */
  overflow: hidden;
  transition: max-height 0.3s ease-out; /* Transition pour le déroulement */
  padding: ${({ isOpen }) => (isOpen ? "10px" : "0")}; /* Ajout de padding uniquement si ouvert */
  background-color: #9c6a5f;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #ffffff;

  p {
    margin: 0;
  }
`;
