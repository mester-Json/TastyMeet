import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  padding: 1vw;
  background-color: #7c4a42;
  color: #ffffff;
  border-radius: 0.5vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.header`
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.5vw;
  text-transform: uppercase;
  text-align: start;
`;

export const HelpText = styled.p`
  background-color: #8b5a50;
  padding: 0.8vw;
  border-radius: 0.5vw;
  text-align: start;
  font-size: 0.9vw;
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8vw;
`;

export const QuestionButton = styled.button`
  background-color: #9c6a5f;
  color: #ffffff;
  padding: 0.8vw;
  border: none;
  border-radius: 0.5vw;
  cursor: pointer;
  font-size: 0.9vw;
  text-align: left;

  &:hover {
    background-color: #a7796f;
  }
`;

export const QuestionContent = styled.div.attrs(({ opened }) => ({
  "aria-expanded": opened,
}))`
  max-height: ${({ opened }) =>
    opened === "true" ? "200px" : "0"}; /* Limite la hauteur du contenu */
  overflow: hidden;
  transition: max-height 0.3s ease-out; /* Transition pour le déroulement */
  padding: ${({ opened }) =>
    opened === "true" ? "0.8vw;" : "0"}; /* Ajout de padding uniquement si ouvert */
  background-color: #9c6a5f;
  border-radius: 0.25vw;
  margin-top: 0.25vw;
  margin-bottom: 0.25vw;
  color: #ffffff;
  opacity: ${({ opened }) =>
    opened === "true" ? "1" : "0"}; /* Transition de l'opacité */
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;

  p {
    margin: 0;
  }
`;