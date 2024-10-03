import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Title,
  HelpText,
  QuestionContainer,
  QuestionButton,
  QuestionContent,
} from "./FormHelp.style.jsx";

export const FormHelp = () => {
  // Gérer l'état de la visibilité des contenus déroulants pour chaque question
  // const [isOpen1, setIsOpen1] = useState(false);
  // const [isOpen2, setIsOpen2] = useState(false);
  // const [isOpen3, setIsOpen3] = useState(false);
  const [openQuestions, setOpenQuestions] = useState([false, false, false]);


  const toggleDropdown = (index) => {
    const updatedQuestions = openQuestions.map((isOpen, i) =>
      i === index ? !isOpen : isOpen
    );
    setOpenQuestions(updatedQuestions);
  };
  // Fonction pour gérer l'ouverture et la fermeture de la liste

  // const toggleDropdown1 = () => setIsOpen1(!isOpen1);
  // const toggleDropdown2 = () => setIsOpen2(!isOpen2);
  // const toggleDropdown3 = () => setIsOpen3(!isOpen3);

  return (
    <Container>
      <Header>
        <Title>HELP</Title>
        <HelpText>
          Batnae municipium in Anthemusia conditum Macedonum manu priscorum ab
          Euphrate flumine brevi spatio disparatur, refertum mercatoribus
          opulentis, ubi annua sollemnitate prope Septembris initium mensis ad
          nundinas magna promiscuae fortunae convenit multitudo ad commer-canda
          quae Indi mittunt et Seres aliaque plurima vehi terra marique
          consueta.
        </HelpText>
      </Header>
      <QuestionContainer>
        {/* Première question avec son contenu déroulant */}
        <QuestionButton onClick={() => toggleDropdown(0)}>
          + C'est une question
        </QuestionButton>
        <QuestionContent opened={`` + openQuestions[0]}>
          <p>
            Ceci est le contenu de la première question. Lorem ipsum dolor sit
            amet...
          </p>
        </QuestionContent>

        {/* Deuxième question avec son contenu déroulant */}
        <QuestionButton onClick={() => toggleDropdown(1)}>
          + C'est une question
        </QuestionButton>
        <QuestionContent opened={`` + openQuestions[1]}>
          <p>
            Ceci est le contenu de la deuxième question. Lorem ipsum dolor sit
            amet...
          </p>
        </QuestionContent>

        {/* Troisième question avec son contenu déroulant */}
        <QuestionButton onClick={() => toggleDropdown(2)}>
          + C'est une question
        </QuestionButton>
        <QuestionContent opened={`` + openQuestions[2]}>
          <p>
            Ceci est le contenu de la troisième question. Lorem ipsum dolor sit
            amet...
          </p>
        </QuestionContent>
      </QuestionContainer>
    </Container>
  );
};