import axios from "axios";



const instance = axios.create({
    baseURL: 'http://localhost:9090/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

////////////////////
/////  LOGOUT  /////
////////////////////

export const logoutUser = async (navigate) => {
    try {
        await instance.post('/auth/logout');

        localStorage.removeItem('token');

    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
};

////////////////////
//// register //////
////////////////////

export const registerUser = async (formData) => {
    try {
        const userData = new FormData();
        formData.forEach((value, key) => {
            userData.append(key, value);
        });

        const response = await instance.post(`/addUser`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Erreur lors de l\'inscription: ' + (error.response?.data?.message || error.message));
    }
};

////////////////////
/////  LOGIN   /////
////////////////////

export const SignIn = async (email, password) => {
    try {
        const response = await instance.post(`/auth/login`, { email, password });

        return response.data.token;
    } catch (error) {
        throw error;
    }
};

//////////////////////////
///// HOME CROUNCHER /////
//////////////////////////

const isValidToken = (token) => {
    if (!token || token.split('.').length !== 3) {
        return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
};

export const UserData = async (token) => {
    if (!isValidToken(token)) {
        console.error('Invalid or no token provided.');
        throw new Error('Authentication token is required and must be valid.');
    }

    try {
        const response = await instance.get('/display', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const profilesWithPictures = response.data.map(profile => ({
            ...profile,
            pictures: profile.pictures.map(picture => ({
                pictureName: picture.pictureName,
                imageUrl: `http://localhost:9090/api/show/${picture.pictureName}`,
            })),
        }));

        return profilesWithPictures;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

// Fonction pour gérer le "like"
export const HandleLike = async (userId, profileId, token) => {
    try {
        const response = await instance.post(`/${userId}/like/${profileId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors du like :', error);
        throw error;
    }
};

export const CheckMatch = async (userId, token) => {
    try {
        const response = await instance.get(`/${userId}/matches`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des matches :', error);
        throw error;
    }
};


////////////////////
/// Profiles ///////
////////////////////

export const fetchProfileData = async (userId) => {
    try {
        const response = await instance.get(`/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw new Error('Erreur lors de la récupération des données.');
    }
};

export const updateProfileData = async (formData) => {
    try {
        const response = await instance.post(`/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating profile data:', error);
        throw new Error('Erreur lors de la modification');
    }
};

export const changePassword = async (data) => {
    try {
        const response = await instance.post(`/verifyPassword`, data);
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw new Error(error.response?.data?.message || 'Erreur lors de la modification du mot de passe');
    }
};

export const changeEmail = async (data) => {
    try {
        const response = await instance.post(`/updateEmail`, data);
        return response.data;
    } catch (error) {
        console.error('Error changing email:', error);
        throw new Error(error.response?.data?.message || 'Erreur lors de la modification de l\'email');
    }
};

export const deletePhoto = async (photoId) => {
    try {
        const response = await instance.delete(`/delete/${photoId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting photo:', error);
        throw new Error('Erreur lors de la suppression de la photo');
    }
};

export const uploadFile = async (id, formData) => {
    try {
        const response = await instance.post(`/upload/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error(error.response?.data?.message || 'Erreur lors de l\'upload du fichier');
    }
};