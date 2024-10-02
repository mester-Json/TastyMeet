import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: rgba(207, 206, 206, 0.5);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 40%;
`;

export const LeftColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column; // Alignement vertical
  align-items: center; // Alignement horizontal
  margin: 10px;
`;

export const RightColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column; // Alignement vertical
  align-items: center; // Alignement horizontal
  margin: 10px;
  background-color: #fff;
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Titre = styled.h2`
  text-align: center;
  color: #333;
  font-size: 1.3vw;
  border-bottom: 2px solid #ddd;
`;

export const DivPicture = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

export const OnePicture = styled.img`
  width: calc(50% - 0.521vw);
  height: 17vh;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
`;

export const ButtonPicture = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(255, 0, 0, 0.7);
    color: '#fff;
    border: 'none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    fontSize: 1.2rem;

`;

export const DivOnePicture = styled.div`
    position: relative;
    width: calc(50% - 15px);
    height: 17vh;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #ddd;
    boxShadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const LabelPicture =styled.label`
    position: relative;
    width: calc(50% - 15px);
    height: 17vh;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #ddd;
    boxShadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const InputFile = styled.input`
    display : none;
`;

export const DivTextPicture = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 17vh;
    border-radius: 10px;
    background-color: #f0f0f0;
    border: 2px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #333;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;
`;

export const FormLeft = styled.form`
  width: 100%;
`;

export const InputInfo = styled.div`
  display: flex;
  justify-content: center; // Centrer horizontalement
  width: 100%; // Utilisez 100% pour occuper la largeur du parent
`;

export const InputField = styled.input`
  width: 40%; // Gardez la largeur souhaitée
  padding: 2%;
  margin: 1% auto; // Centrage horizontal
  font-size: 0.7vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  margin-bottom: 2%;
  &:focus {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    outline: none;
  }
  &::placeholder {
    text-align: center;
  }
`;

export const Info = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

export const TextInfo = styled.p`
  width: 90%;
  font-size: 0.9vw;
  margin: 1%;
`;

export const SelectInput = styled.select`
  width: 90%;
  padding: 2%;
  font-size: 0.7vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  margin: 1% auto; // Centrage horizontal
  margin-bottom: 2%;
`;

export const Description = styled.textarea`
  width: 95%;
  min-height: 10vh;
  height: auto;
  padding: 2%;
  border: 1px solid #ccc;
  font-size: 0.7vw;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  margin: 1% auto; // Centrage horizontal
  margin-bottom: 2%;
`;

export const ButtonLarge = styled.button`
  width: 100%;
  padding: 2%;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.7vw;
  background-color: #2a0800;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
`;
export const ButtonSmall = styled.button`
  width: 49%;
  padding: 2%;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.7vw;
  background-color: #2a0800;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  margin: 2% auto; // Centrage horizontal
`;

export const containerModif = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  backgroundColor: "#775144",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "1200px",
  margin: "40px auto 0 auto",
};

export const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};


export const rowButtons = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

// export const button = {
//   width: "48%",
//   padding: "12px",
//   borderRadius: "5px",
//   border: "1px solid #ccc",
//   boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
//   transition: "border-color 0.3s, box-shadow 0.3s",
//   cursor: "pointer",
//   backgroundColor: "#2a0800",
//   color: "#fff",
// };

// export const buttonModif = {
//   width: "100%",
//   padding: "12px",
//   borderRadius: "5px",
//   border: "1px solid #ccc",
//   boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
//   transition: "border-color 0.3s, box-shadow 0.3s",
//   cursor: "pointer",
//   backgroundColor: "#2a0800",
//   color: "#fff",
//   margin: "10px auto 10px auto",
// };

export const ShowForm = {
  display: "flex",
  padding: "20px",
  backgroundColor: "#775144",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "1200px",
  margin: "10px auto 0 auto",
};

export const ShowInput = {
  marginRight: "20px",
  padding: "12px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
  transition: "border-color 0.3s, box-shadow 0.3s",
};


export const photos = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start', // Pour aligner à gauche
  gap: '5px', // Ajuster l'espacement si nécessaire
  width: '100%', // S'assurer que le conteneur prend toute la largeur
};

export const photo = {
  width: '100%', // Assurez-vous que l'image prend toute la largeur du conteneur
  height: '100%', // Assurez-vous que l'image prend toute la hauteur du conteneur
  objectFit: 'cover', // Conserve le ratio sans déformer
  maxWidth: '100%', // Empêche l'image de dépasser la largeur du conteneur
};

export const deleteButton = {
  position: 'absolute', // Positionnement absolu pour placer le bouton sur l'image
  top: '10px',
  right: '10px',
  backgroundColor: 'rgba(255, 0, 0, 0.7)', // Couleur rouge semi-transparent
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  fontSize: '1.2rem',
};

export const fileInput = {
  display: 'none', // Masquer le champ de fichier
};

export const addPhotoText = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '150px',
  borderRadius: '10px',
  backgroundColor: '#f0f0f0',
  border: '2px solid #ddd',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  color: '#333',
  cursor: 'pointer',
  fontSize: '1rem',
  textAlign: 'center',
};