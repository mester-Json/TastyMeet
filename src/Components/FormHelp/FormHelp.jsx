import React, { useState } from "react";
import { Container, HelpContainer, Title, HelpText, QuestionContainer, QuestionButton, QuestionContent } from "./FormHelp.style.jsx";

export const FormHelp = () => {
  // Gérer l'état de la visibilité des contenus déroulants pour chaque question
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  // Fonction pour gérer l'ouverture et la fermeture de la liste
  const toggleDropdown1 = () => setIsOpen1(!isOpen1);
  const toggleDropdown2 = () => setIsOpen2(!isOpen2);
  const toggleDropdown3 = () => setIsOpen3(!isOpen3);

  return (
    <Container>
      <HelpContainer>
        <HelpText>
          <Title>HELP</Title>
          <p>Batnae municipium in Anthemusia conditum Macedonum manu priscorum ab Euphrate flumine brevi spatio disparatur,
          refertum mercatoribus opulentis, ubi annua sollemnitate prope Septembris initium mensis ad nundinas magna promiscuae
          fortunae convenit multitudo ad commer-canda quae Indi mittunt et Seres aliaque plurima vehi terra marique consueta.</p>
        </HelpText>
      </HelpContainer>
      <QuestionContainer>
        {/* Première question avec son contenu déroulant */}
        <QuestionButton onClick={toggleDropdown1}>+ C'est une question</QuestionButton>
        <QuestionContent isOpen={isOpen1}>
          <p>Ceci est le contenu de la première question. Lorem ipsum dolor sit amet...</p>
        </QuestionContent>

        {/* Deuxième question avec son contenu déroulant */}
        <QuestionButton onClick={toggleDropdown2}>+ C'est une question</QuestionButton>
        <QuestionContent isOpen={isOpen2}>
          <p>Ceci est le contenu de la deuxième question. Lorem ipsum dolor sit amet...</p>
        </QuestionContent>

        {/* Troisième question avec son contenu déroulant */}
        <QuestionButton onClick={toggleDropdown3}>+ C'est une question</QuestionButton>
        <QuestionContent isOpen={isOpen3}>
          <p>Ceci est le contenu de la troisième question. Lorem ipsum dolor sit amet...</p>
        </QuestionContent>
      </QuestionContainer>
    </Container>
  );
}

