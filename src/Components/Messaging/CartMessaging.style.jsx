import styled from 'styled-components';

export const Avatar = styled.div`
  flex-shrink: 0;
  margin-left: 10px; /* Espacement entre l'avatar et le contenu du message */
  margin-right: 10px;
  margin-bottom: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column; /* Empiler les éléments verticalement */
  color: white; /* Couleur du texte */

  h4 {
    margin: 0; /* Pas de marge pour le prénom */
    font-size: 16px;
  }

  p.date {
    margin: 5px 0 0 0; /* Espacement entre le message et la date */
    font-size: 12px; /* Taille de police pour la date */
    color: #ccc; /* Couleur pour la date */
  }
`;
export const MessageBar = styled.div`
  margin-top:10px;
  margin-left:auto;
  margin-right:auto;
  border-radius: 50px;    
  display: flex;
  align-items: center;
  width: 90%;
  background-color: #5E3826;
  padding: 10px;
  box-sizing: border-box;
`;

