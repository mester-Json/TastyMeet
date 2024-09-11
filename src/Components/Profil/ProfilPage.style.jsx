import styled from 'styled-components';
export const container = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: 'rgba(207, 206, 206, 0.5)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: '150px auto 0 auto',
};

export const containerModif = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#775144',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: '40px auto 0 auto',
};

export const leftColumn = {
    flex: 1,
    marginRight: '40px',
};

export const rightColumn = {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export const row = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
};

export const input = {
    marginRight: '20px',
    width: '48%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s, box-shadow 0.3s',
};

export const select = {
    ...input,
    width: '80%',
    appearance: 'none', // Supprime la flèche par défaut sur certains navigateurs
    backgroundColor: '#fff',
    paddingRight: '30px',
    //ajoute une petite flèche noire à droite du champ select pour indiquer à l'utilisateur qu'il peut ouvrir le menu déroulant pour voir plus d'options (en SVG) 
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23333' d='M840.4 300.6c-11.8-11.8-30.9-11.8-42.7 0L512 586.3 226.3 300.6c-11.8-11.8-30.9-11.8-42.7 0-11.8 11.8-11.8 30.9 0 42.7l308 308c11.8 11.8 30.9 11.8 42.7 0l308-308c11.8-11.8 11.8-30.9 0-42.7z'/%3E%3C/svg%3E")`,
    backgroundPosition: 'right 10px center',
    backgroundRepeat: 'no-repeat',
};

export const textarea = {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    resize: 'none',
    height: '80px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
};

export const photoGalleryHeader = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '1.5rem',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
};

export const photos = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
};

export const photo = {
    width: 'calc(50% - 10px)', // Ajuste la largeur en fonction du gap
    height: '150px',
    borderRadius: '10px',
    objectFit: 'cover',
    border: '2px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
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

export const rowButtons = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
};

export const button = {
    width: '48%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    backgroundColor: '#2a0800',
    color: '#fff',

};

export const buttonModif = {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    backgroundColor: '#2a0800',
    color: '#fff',
    margin: '10px auto 10px auto',
};



export const ShowForm = {
    display: 'flex',
    padding: '20px',
    backgroundColor: '#775144',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: '10px auto 0 auto',
};

export const ShowInput = {
    marginRight: '20px',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s, box-shadow 0.3s',
};

