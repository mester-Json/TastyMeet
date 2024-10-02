// Importation du module axios pour effectuer des requêtes HTTP
import axios from "axios";

// Création d'une instance axios pour les requêtes vers l'API principale
const instance = axios.create({
    baseURL: 'http://localhost:9090/api/', // URL de base pour les requêtes API
    headers: {
        'Content-Type': 'application/json', // Format des données envoyé à l'API
    }
});

instance.interceptors.request.use(
    function (config) {
        // Récupère le token depuis une source (localStorage, state, etc.)
        const token = sessionStorage.getItem('token'); // ou une autre méthode pour obtenir le token
        console.log(token);
        if (token) {
            // Ajoute le header Authorization si le token est présent
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Gérer les erreurs avant que la requête ne soit envoyée
        return Promise.reject(error);
    }
);


////////////////////
/////  LOGOUT  /////
////////////////////

// Fonction pour déconnecter l'utilisateur
export const logoutUser = async (navigate) => {
    try {
        // Requête à l'API pour déconnecter l'utilisateur
        await instance.post('/auth/logout');

        // Suppression du token de sessionStorage après déconnexion
        sessionStorage.removeItem('token');
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
};

////////////////////
//// register //////
////////////////////

// Fonction pour inscrire un nouvel utilisateur
export const registerUser = async (formData) => {
    try {
        // Création d'un nouvel objet FormData pour envoyer les données du formulaire
        const userData = new FormData();
        formData.forEach((value, key) => {
            userData.append(key, value);
        });

        // Envoi des données d'inscription à l'API
        const response = await instance.post(`/addUser`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Format des données pour l'upload
            },
        });

        return response.data; // Retourne les données de la réponse
    } catch (error) {
        throw new Error('Erreur lors de l\'inscription: ' + (error.response?.data?.message || error.message));
    }
};

////////////////////
/////  LOGIN   /////
////////////////////

// Fonction pour connecter un utilisateur
export const SignIn = async (email, password) => {
    try {
        // Requête à l'API pour se connecter avec l'email et le mot de passe
        const response = await instance.post(`/auth/login`, { email, password });
        const token = response.data; // Récupère le token de la réponse

        // Si un token est reçu, il est stocké dans sessionStorage
        if (token) {
            sessionStorage.setItem('token', token);
        }

        return token; // Retourne le token
    } catch (error) {
        throw error;
    }
};

//////////////////////////
///// HOME CROUNCHER /////
//////////////////////////

// Fonction pour valider le token JWT
const isValidToken = (token) => {
    if (!token || token.split('.').length !== 3) {
        return false; // Le token est invalide s'il ne contient pas trois segments
    }

    try {
        // Décodage de la partie payload du token JWT pour vérifier son expiration
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 > Date.now(); // Vérifie si le token est encore valide
    } catch (error) {
        console.error('Erreur lors de la validation du token:', error);
        return false;
    }
};

// Fonction pour récupérer les données de l'utilisateur connecté
export const UserData = async (token) => {
    if (!isValidToken(token)) {
        console.error('Invalid or no token provided.');
        throw new Error('Authentication token is required and must be valid.');
    }

    try {
        // Requête pour récupérer les données de l'utilisateur
        const response = await instance.get('/display', {
            headers: {
                'Authorization': `Bearer ${token}`, // Envoie le token d'authentification
            },
        });

        console.log('API Response Data:', response.data);

        // Modifie les données des profils pour inclure les URLs complètes des images
        const profilesWithPictures = response.data.map(profile => ({
            ...profile,
            pictures: profile.pictures.map(picture => ({
                pictureName: picture.pictureName,
                imageUrl: `http://localhost:9090/api/show/${picture.pictureName}`,
            })),
        }));

        console.log('Profiles with Pictures:', profilesWithPictures);

        return profilesWithPictures; // Retourne les profils modifiés
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

// Fonction pour liker un profil
export const HandleLike = async (userId, profileId, token) => {
    try {
        // Envoie une requête POST pour liker un profil
        const response = await instance.post(`/${userId}/like/${profileId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`, // Token d'authentification
            },
        });
        return response.data; // Retourne la réponse de l'API
    } catch (error) {
        console.error('Erreur lors du like :', error);
        throw error;
    }
};

// Fonction pour récupérer les données d'un profil spécifique
export const fetchProfileData = async (userId) => {
    try {
        // Requête pour récupérer les données du profil
        const response = await instance.get(`/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw new Error('Erreur lors de la récupération des données.');
    }
};

export const fetchConversationData = async (userId) => {
    try {
        const response = await instance.get(`/conversations/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching conversation data:', error);
        throw new Error('Erreur lors de la récupération des données.');
    }
};

// Fonction pour mettre à jour les données du profil
export const updateProfileData = async (formData) => {
    try {
        // Requête pour mettre à jour le profil avec les données envoyées
        const response = await instance.post(`/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Format des données d'upload
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating profile data:', error);
        throw new Error('Erreur lors de la modification');
    }
};

// Fonction pour changer le mot de passe de l'utilisateur
export const changePassword = async (data) => {
    try {
        // Requête pour vérifier et changer le mot de passe
        const response = await instance.post(`/verifyPassword`, data);
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw new Error(error.response?.data?.message || 'Erreur lors de la modification du mot de passe');
    }
};

// Fonction pour changer l'email de l'utilisateur
export const changeEmail = async (data) => {
    try {
        // Requête pour changer l'email de l'utilisateur
        const response = await instance.post(`/updateEmail`, data);
        return response.data;
    } catch (error) {
        console.error('Error changing email:', error);
        throw new Error(error.response?.data?.message || 'Erreur lors de la modification de l\'email');
    }
};

// Fonction pour supprimer une photo d'un profil
export const deletePhoto = async (photoId) => {
    try {
        // Requête pour supprimer une photo spécifique
        const response = await instance.delete(`/delete/${photoId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting photo:', error);
        throw new Error('Erreur lors de la suppression de la photo');
    }
};

// Fonction pour uploader un fichier pour un utilisateur donné
export const uploadFile = async (id, formData) => {
    try {
        // Requête pour uploader un fichier
        const response = await instance.post(`/upload/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Format multipart pour les fichiers
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error(error.response?.data?.message || 'Erreur lors de l\'upload du fichier');
    }
};

//////////////
/// Message //
//////////////

// Fonction pour récupérer les messages d'une conversation donnée
export const fetchMessagesData = async (conversationId) => {
    try {
        // Requête pour récupérer les messages
        const response = await instance.get(`/conversation/${conversationId}/messages`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des messages');
    }
};