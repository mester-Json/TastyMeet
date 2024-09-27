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
    const token = localStorage.getItem('token');
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
                const data = await fetchProfileData(userId);
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

    const handleUpdate = async (event) => {
        event.preventDefault();
        const newErrors = {};
        const formData = new FormData();

        formData.append("id", id);
        formData.append("version", version);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("password", password);
        formData.append("age", age);
        formData.append("description", description);
        formData.append("orientation", orientation);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        if (file) {
            formData.append("file", file);
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
                    <form onSubmit={handleUpdate}>
                        <div style={styles.row}>
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Prénom"
                                style={styles.input}
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Nom"
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.row}>
                            <input
                                type="text"
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Adresse"
                                style={{ ...styles.input, marginTop: '10px' }}
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Téléphone"
                                style={styles.input}
                            />
                        </div>
                        <select
                            name="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            style={styles.select}
                        >
                            <option value="Male">Homme</option>
                            <option value="Female">Femme</option>
                            <option value="Other">Autre</option>
                        </select>

                        <textarea
                            name="description"
                            maxLength="200"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            style={{ ...styles.input, ...styles.textarea, marginTop: '10px' }}
                        ></textarea>

                        <button type="submit" style={styles.buttonModif}>
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
                    </form>
                </div>

                <div style={styles.rightColumn}>
                    <h2 style={styles.photoGalleryHeader}>Galerie de Photos</h2>
                    <div style={styles.photos}>
                        {pictures.slice(0, 4).map((photo, index) => (
                            <img
                                key={index}
                                src={photo.pictureName} // Assuming pictureName holds the URL
                                alt={`Photo ${index + 1}`}
                                style={styles.photo}
                            />
                        ))}
                        {pictures.length < 4 && (
                            <label style={styles.photo}>
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
};
