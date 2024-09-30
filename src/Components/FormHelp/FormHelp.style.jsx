import styled from "styled-components";


export const Container = styled.div`
  max-width: 70vw;
  margin: 5vh auto 5vh auto;
  padding: 2.034vw;
  background-color: rgba(73, 37, 27, 0.7);
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;


export const HelpContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.5vw;
  text-transform: uppercase;
  text-align: start;
`;

export const HelpText = styled.p`
  background-color: #8b5a50;
  padding: 1.7vh;
  font-size: 1.2vw;
  border-radius: 10px;
  text-align: start;
`;


export const QuestionContainer = styled.div`
  max-width: 70vw;
  margin: 2vh auto 0 auto;
  align-item:center;
  padding: 1.7vh;
  background-color: rgba(73, 37, 27, 0.7);
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;


export const QuestionButton = styled.button`
  background-color: #9c6a5f;
  width: 100%;
  height: 5%;
  color: #ffffff;
  padding: 1.5vw;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  text-align: left;
  font-size: 1vw;

  margin : 0.8vh auto 0.8vh auto;

  &:hover {
    background-color: #a7796f;
  }
`;


export const QuestionContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "auto" : "0vh")}; /* Limite la hauteur du contenu */
  font-size: 1vw;
  overflow: hidden;
  transition: max-height 0.3s ease-out; /* Transition pour le déroulement */
  padding: ${({ isOpen }) => (isOpen ? "0.52vw" : "0")}; /* Ajout de padding uniquement si ouvert */
  background-color: #9c6a5f;
  border-radius: 1vw;
  
  color: #ffffff;

  p {
    margin: 0;
  }
`;