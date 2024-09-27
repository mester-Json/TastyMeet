import { useEffect, useState } from 'react';
import * as styles from './Profil.style.jsx';
import {
    fetchProfileData,
    updateProfileData,
    changePassword,
    changeEmail,
    deletePhoto,
    uploadFile,
} from '../../Axios/Axios.js';

const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    }
    return null;
};

export const Profil = () => {
    const [email, setEmail] = useState('');
    const [version, setVersion] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [orientation, setOrientation] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [file, setFile] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [error, setError] = useState(null);

    // Form management
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = getUserIdFromToken();
                console.log("Fetching profile for user ID:", userId);
                const data = await fetchProfileData(userId);
                console.log("Profile data received:", data);
                setId(data.id);
                setVersion(data.version);
                setEmail(data.email);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setGender(data.gender);
                setAge(data.age);
                setOrientation(data.orientation || '');
                setDescription(data.description);
                setPhone(data.phone);
                setLocation(data.location || '');
                setCity(data.city || '');
                setPictures(data.pictures);
            } catch (error) {
                console.error('Erreur:', error);
                setError('Une erreur est survenue lors de la récupération des données.');
            }
        };

        fetchProfile();
    }, []);

    const validatePassword = (password) => {
        const regex = /(?=.*[!@#$%^&*])/; // Un caractère spécial
        return password.length >= 6 && password.length <= 15 && regex.test(password);
    };




    const handleUpdate = async (event) => {
        event.preventDefault();
        const newErrors = {};
        const formData = new FormData();

        setError({});


        if (!firstName.trim() || !lastName.trim() || !location.trim() || !phone() || !gender.trim() || !description.trim()) {
            if (!firstName.trim()) {
                newErrors.firstName = 'Prénom Requis'
            }
            if (!lastName.trim()) {
                newErrors.lastName = 'Nom Requis'
            }
            if (!location.trim()) {
                newErrors.location = 'Adress Requis'
            }
            if (!phone.trim()) {
                newErrors.phone = ' Téléphone Requis'
            }
            if (!gender.trim()) {
                newErrors.gender = 'Tu est de quel Genre'

            }
            if (!description.trim()) {
                newErrors.description = 'Tu veux Pecho alors ecris'
            }
            if (password && !validatePassword(password)) {
                newErrors.password = ' tu veux te faire pirater'
            }

        }

        formData.append("id", id);
        formData.append("version", version);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("age", age);
        formData.append("description", description);
        formData.append("orientation", orientation);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        if (file) {
            formData.append("file", file);
        }

        if (password && password.this() !== '') {
            formData.append("password", password);
        }

        if (Object.keys(newErrors).length === 0) {
            try {
                await updateProfileData(formData);
                console.log("Modification utilisateur réussie");
            } catch (error) {
                console.error("Erreur:", error);
            }
        } else {
            setError(newErrors);
        }
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        setError(null);

        if (newPassword !== confirmNewPassword) {
            setError('Les nouveaux mots de passe ne correspondent pas.');
            return;
        }

        if (!validatePassword(newPassword)) {
            setError('Le nouveau mot de passe doit contenir entre 6 et 15 caractères, y compris un caractère spécial.');
            return;
        }

        if (Object.keys(newErrors).length === 0) {
            try {
                console.log("Données à envoyer:", formData);
                await updateProfileData(formData);
                console.log("Modification utilisateur réussie");
            } catch (error) {
                console.error("Erreur lors de la mise à jour:", error);
                setError('Une erreur est survenue lors de la mise à jour.');
            }
        } else {
            setError(newErrors);
        }



        try {
            await changePassword({
                id: id,
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmNewPassword: confirmNewPassword,
            });
            alert('Mot de passe modifié avec succès.');
            setShowPasswordForm(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            setError(error.message);
            console.log("Erreur capturée:", error);
        }
    };

    const handleEmailChange = async (event) => {
        event.preventDefault();
        setError(null);

        if (newEmail !== confirmNewEmail) {
            setError('Les nouveaux emails ne correspondent pas.');
            return;
        }

        try {
            await changeEmail({
                id: id,
                currentEmail: currentEmail,
                newEmail: newEmail,
                confirmNewEmail: confirmNewEmail,
            });
            alert('Email modifié avec succès.');
            setShowEmailForm(false);
            setCurrentEmail('');
            setNewEmail('');
            setConfirmNewEmail('');
        } catch (error) {
            setError(error.message);
            console.log("Erreur capturée:", error);
        }
    };

    const handleDeletePhoto = async (photoId) => {
        const updatedPictures = pictures.filter(photo => photo.id !== photoId);
        setPictures(updatedPictures);

        try {
            await deletePhoto(photoId);
            console.log("Photo supprimée avec succès");
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const handleFileUpload = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        const formData = new FormData();
        selectedFiles.forEach(file => formData.append('file', file));

        try {
            await uploadFile(id, formData);
            const newPicture = {
                pictureName: selectedFiles[0].name
            };
            setPictures(prevPictures => [...prevPictures, newPicture]);
            alert('Une image a été ajoutée');
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const togglePasswordForm = (event) => {
        event.preventDefault();
        setShowPasswordForm(!showPasswordForm);
    };

    const toggleEmailForm = (event) => {
        event.preventDefault();
        setShowEmailForm(!showEmailForm);
    };


    return (
        <>
            <div style={styles.container}>
                <div style={styles.leftColumn}>
                    <form>
                        <div style={styles.row}>
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                placeholder="Prénom"
                                onChange={(e) => setFirstName(e.target.value)}
                                style={styles.input}

                            />
                            {error?.firstName && <label style={{ color: 'red' }}>{error.firstName}</label>}

                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                placeholder="Nom"
                                onChange={(e) => setLastName(e.target.value)}
                                style={styles.input}
                            />
                            {error?.lastName && <label style={{ color: 'red' }}>{error.lastName}</label>}

                        </div>
                        <div style={styles.row}>
                            <input
                                type="text"
                                name="location"
                                value={location}
                                placeholder="Adresse"
                                onChange={(e) => setLocation(e.target.value)}
                                style={{ ...styles.input, marginTop: '10px' }}
                            />
                            {error?.location && <label style={{ color: 'red' }}>{error.location}</label>}

                            <input
                                type="tel"
                                name="phone"
                                value={phone}
                                placeholder="Téléphone"
                                onChange={(e) => setPhone(e.target.value)}
                                style={styles.input}
                            />
                            {error?.phone && <label style={{ color: 'red' }}>{error.phone}</label>}

                        </div>

                        <div style={styles.row}>
                            <div style={{ width: '100%' }}>
                                <p>Genre :</p>
                                <select
                                    name="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    style={styles.select}
                                >
                                    <option value="MALE">Homme</option>
                                    <option value="FEMALE">Femme</option>
                                    <option value="TRANS">trans</option>
                                    <option value="NONBINAIRE">Non binaire</option>
                                </select>
                                {error?.gender && <label style={{ color: 'red' }}>{error.gender}</label>}

                            </div>
                            <div style={{ width: '100%' }}>
                                <p>Orientation :</p>
                                <select
                                    name="orientation"
                                    value={orientation}
                                    onChange={(e) => setOrientation(e.target.value)}
                                    style={styles.select}
                                >
                                    <option value="MALE">Homme</option>
                                    <option value="FEMALE">Femme</option>
                                    <option value="TRANS">trans</option>
                                    <option value="NONBINAIRE">Non binaire</option>
                                </select>
                                {error?.orientation && <label style={{ color: 'red' }}>{error.orientation}</label>}

                            </div>
                        </div>
                        <div style={styles.row}>
                            <textarea
                                name="description"
                                value={description}
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                                style={styles.textArea}
                            />
                            {error?.description && <label style={{ color: 'red' }}>{error.description}</label>}
                        </div>
                        <div>
                            <button onClick={handleUpdate} style={styles.buttonModif}>
                                Accepter les modifications
                            </button>

                            <div style={styles.rowButtons}>
                                <button style={styles.button} onClick={togglePasswordForm}>
                                    {showPasswordForm ? 'Annuler' : 'Modifier le mot de passe'}
                                </button>
                                <button style={styles.button} onClick={toggleEmailForm}>
                                    {showEmailForm ? 'Annuler' : "Modifier l'email"}
                                </button>
                            </div>
                            {error && (
                                <div style={styles.rowButtons}>
                                    <label style={{ color: 'red' }}>{error}</label>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div style={styles.rightColumn}>
                    <h2 style={styles.photoGalleryHeader}>Galerie de Photos</h2>
                    <div style={styles.photos}>
                        {pictures.slice(0, 4).map((photo, index) => (
                            <div key={index} style={styles.photoContainer}>
                                <img
                                    src={`http://localhost:9090/api/show/${photo.pictureName}`}
                                    alt={`Photo ${index + 1}`}
                                    style={styles.photo}
                                />
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => handleDeletePhoto(photo.id)}
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        {pictures.length < 4 && (
                            <label style={styles.photoContainer}>
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    style={styles.fileInput}
                                />
                                <div style={styles.addPhotoText}>Ajouter une photo</div>
                            </label>
                        )}
                    </div>
                </div>
            </div>

            {showPasswordForm && (
                <form onSubmit={handlePasswordChange} style={styles.ShowForm}>
                    <div style={styles.row}>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Mot de passe actuel"
                            style={styles.ShowInput}
                        />
                    </div>
                    <div style={styles.row}>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nouveau mot de passe"
                            style={styles.ShowInput}
                        />
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            placeholder="Confirmer le nouveau mot de passe"
                            style={styles.ShowInput}
                        />
                        <button type="submit" style={styles.button}>Changer le mot de passe</button>
                    </div>
                </form>
            )}

            {showEmailForm && (
                <form onSubmit={handleEmailChange} style={styles.ShowForm}>
                    <div style={styles.row}>
                        <input
                            type="email"
                            value={currentEmail}
                            onChange={(e) => setCurrentEmail(e.target.value)}
                            placeholder="Email actuel"
                            style={styles.ShowInput}
                        />
                    </div>
                    <div style={styles.row}>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Nouvel email"
                            style={styles.ShowInput}
                        />
                        <input
                            type="email"
                            value={confirmNewEmail}
                            onChange={(e) => setConfirmNewEmail(e.target.value)}
                            placeholder="Confirmer le nouvel email"
                            style={styles.ShowInput}
                        />
                        <button type="submit" style={styles.button}>Changer l'email</button>
                    </div>
                </form>
            )}
        </>
    );
};