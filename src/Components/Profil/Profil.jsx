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
    const [orientation, setOrientation] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [file, setFile] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [error, setError] = useState({});

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
                console.log(data);
                if (data) {
                    setId(data.id || '');
                    setVersion(data.version || '');
                    setEmail(data.email || '');
                    setFirstName(data.firstName || '');
                    setLastName(data.lastName || '');
                    setGender(data.gender || '');
                    setOrientation(data.orientation || '');
                    setDescription(data.description || '');
                    setPhone(data.phone || '');
                    setLocation(data.location || '');
                    setCity(data.city || '');
                    setPictures(data.pictures || []);
                } else {
                    setError({ fetch: 'Une erreur est survenue lors de la récupération des données.' });
                }
            } catch (error) {
                setError({ fetch: 'Une erreur est survenue lors de la récupération des données.' });
            }
        };

        fetchProfile();
    }, []);

    const validatePassword = (password) => {
        const regex = /(?=.*[!@#$%^&*])/; // Require at least one special character
        return password.length >= 6 && password.length <= 15 && regex.test(password);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setError({});
        console.log("Début de la mise à jour du profil");

        // Check for empty fields
        const fieldsToCheck = {
            firstName,
            lastName,
            location,
            phone,
            gender,
            description,
        };
        const newErrors = {};
        Object.keys(fieldsToCheck).forEach((field) => {
            if (!fieldsToCheck[field]) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} est requis`;
            }
        });

        if (password && !validatePassword(password)) {
            newErrors.password = 'Le mot de passe doit être entre 6 et 15 caractères, incluant un caractère spécial.';
        }

        if (Object.keys(newErrors).length) {
            setError(newErrors);
            console.log("Erreurs de validation:", newErrors);
            return;
        }

        const formData = new FormData();
        formData.append("id", id);
        formData.append("firstName", firstName);
        formData.append("location", location);
        formData.append("lastName", lastName);
        formData.append("version", version);
        formData.append("description", description);
        formData.append("orientation", orientation);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        if (file) {
            formData.append("file", file);
        }
        if (password) {
            formData.append("password", password);
        }

        try {
            console.log("Envoi des données:", formData);
            await updateProfileData(formData);
            alert("Modification utilisateur réussie");
        } catch (error) {
            setError({ update: 'Une erreur est survenue lors de la mise à jour.' });
            console.error("Erreur lors de la mise à jour du profil:", error);
        }
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        setError(null);

        if (newPassword !== confirmNewPassword) {
            setError({ password: 'Les nouveaux mots de passe ne correspondent pas.' });
            return;
        }

        if (!validatePassword(newPassword)) {
            setError({ password: 'Le nouveau mot de passe doit contenir entre 6 et 15 caractères, y compris un caractère spécial.' });
            return;
        }

        try {
            await changePassword({
                id,
                currentPassword,
                newPassword,
                confirmNewPassword,
            });
            alert('Mot de passe modifié avec succès.');
            setShowPasswordForm(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            setError({ password: error.message });
        }
    };
    const handleEmailChange = async (event) => {
        event.preventDefault();
        setError({}); // Clear previous errors

        if (newEmail !== confirmNewEmail) {
            setError({ email: 'Les nouveaux emails ne correspondent pas.' });
            return;
        }

        if (!newEmail || !currentEmail) {
            setError({ email: 'Tous les champs doivent être remplis.' });
            return;
        }

        try {
            await changeEmail({
                id,
                currentEmail,
                newEmail,
                confirmNewEmail,
            });
            alert('Email modifié avec succès.');
            setShowEmailForm(false);
            setCurrentEmail('');
            setNewEmail('');
            setConfirmNewEmail('');
        } catch (error) {
            setError({ email: 'Une erreur est survenue lors de la modification de l\'email.' });
            console.error('Error changing email:', error);
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
                            {error.firstName && <div style={styles.error}>{error.firstName}</div>}

                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                placeholder="Nom"
                                onChange={(e) => setLastName(e.target.value)}
                                style={styles.input}
                            />
                            {error.lastName && <div style={styles.error}>{error.lastName}</div>}

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
                            {error.location && <div style={styles.error}>{error.location}</div>}

                            <input
                                type="tel"
                                name="phone"
                                value={phone}
                                placeholder="Téléphone"
                                onChange={(e) => setPhone(e.target.value)}
                                style={styles.input}
                            />
                            {error.phone && <div style={styles.error}>{error.phone}</div>}

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
                            </div>
                        </div>
                        <textarea
                            name="description"
                            maxLength="200"
                            value={description}
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ ...styles.input, ...styles.textarea, marginTop: '10px' }}
                        />
                        {error.description && <div style={styles.error}>{error.description}</div>}

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
                        {error.password && <div style={styles.error}>{error.password}</div>}

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
                        {error.email && <div style={styles.error}>{error.email}</div>}

                        <button type="submit" style={styles.button}>Changer l'email</button>
                    </div>
                </form>
            )}
        </>
    );
};

