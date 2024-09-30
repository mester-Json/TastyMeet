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
          <p> Bienvenue sur la page d'aide ! Ici, vous trouverez des réponses aux questions les plus fréquemment posées ainsi que des solutions aux problèmes courants. Si vous avez besoin d'assistance, nous sommes là pour vous aider.</p>
        </HelpText>
      </HelpContainer>
      <QuestionContainer>
        {/* Première question avec son contenu déroulant */}
        <QuestionButton onClick={toggleDropdown1}>+ C'est une question</QuestionButton>
        <QuestionContent isOpen={isOpen1}>
        <p>Pour créer un compte, cliquez sur le bouton "S'inscrire" en haut à droite de la page. Remplissez le formulaire avec vos informations personnelles (nom, adresse e-mail, mot de passe) puis validez. Vous recevrez un e-mail de confirmation.</p>
        </QuestionContent>

        {/* Deuxième question avec son contenu déroulant */}
        <QuestionButton onClick={toggleDropdown2}>+ C'est une question</QuestionButton>
        <QuestionContent isOpen={isOpen2}>
        <p>Si vous avez oublié votre mot de passe, cliquez sur le lien "Mot de passe oublié" sur la page de connexion. Entrez l'adresse e-mail associée à votre compte et vous recevrez un e-mail pour réinitialiser votre mot de passe.</p>
        </QuestionContent>

        {/* Troisième question avec son contenu déroulant */}
        <QuestionButton onClick={toggleDropdown3}>+ C'est une question</QuestionButton>
        <QuestionContent isOpen={isOpen3}>
        <p>Si vous avez toujours des questions ou des problèmes après avoir consulté notre page d'aide, n'hésitez pas à nous contacter directement :

E-mail : support@Tastymeet.com</p>
        </QuestionContent>
      </QuestionContainer>
    </Container>
  );
}

