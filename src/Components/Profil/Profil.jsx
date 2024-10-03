import { useEffect, useState } from 'react';
import * as styles from './Profil.style.jsx';
import {
    ErrorDivDescription,
    ErrorDiv,
    Div,
    Container,
    LeftColumn,
    FormLeft,
    InputInfo,
    InputField,
    Info,
    TextInfo,
    SelectInput,
    Description,
    RightColumn,
    ButtonLarge,
    ButtonSmall,
    Titre,
} from "./Profil.style.jsx";
import {
    fetchProfileData,
    updateProfileData,
    changePassword,
    changeEmail,
    deletePhoto,
    uploadFile,
    logoutUser,
} from '../../Axios/Axios.js';

const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id;
        } catch (error) {
            console.error('Erreur lors du parsing du token:', error);
            return null;
        }
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
    const [localisation, setLocalisation] = useState('');
    const [file, setFile] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [error, setError] = useState({});

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = getUserIdFromToken();
                const data = await fetchProfileData(userId);

                if (data) {
                    setId(data.id || '');
                    setVersion(parseInt(data.version) || 0);
                    setEmail(data.email || '');
                    setFirstName(data.firstName || '');
                    setLastName(data.lastName || '');
                    setGender(data.gender || '');
                    setOrientation(data.orientation || '');
                    setDescription(data.description || '');
                    setPhone(data.phone || '');
                    setLocalisation(data.localisation || '');
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

        // Check for empty fields
        const fieldsToCheck = {
            firstName,
            lastName,
            localisation,
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
            return;
        }

        const formData = new FormData();
        formData.append("id", id);
        formData.append("version", version);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("localisation", localisation);
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
            await updateProfileData(formData);
            alert("Modification utilisateur réussie");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            setError({ update: 'Une erreur est survenue lors de la mise à jour.' });
        }
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        setError({});

        if (newPassword !== confirmNewPassword) {
            setError({ password: 'Les nouveaux mots de passe ne correspondent pas.' });
            return;
        }

        if (!newPassword || !currentPassword) {
            setError({ password: 'Tous les champs doivent être remplis.' });
            return;
        }

        try {
            await changePassword({
                id,
                currentPassword,
                newPassword,
            });
            alert('Mot de passe modifié.');
            setShowPasswordForm(false);
        } catch (error) {
            setError({ password: 'Une erreur est survenue lors de la modification du mot de passe.' });
            console.error('Erreur lors du changement de mot de passe:', error);
        }
    };
    const handleLogout = async (e) => {
        try {
            await logoutUser();
            sessionStorage.removeItem('token');  // S'assurer que le token est bien supprimé
            window.location.href = '/login';  // Redirection explicite après déconnexion
        } catch (error) {
            console.error('Erreur lors de la déconnexion', error);
        }
    };
    const handleEmailChange = async (event) => {
        event.preventDefault();
        setError({});

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
            });
            alert('Email modifié avec succès.');
            await handleLogout();

            // Rediriger vers la page de connexion ou une autre page
            window.location.href = '/';
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
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const togglePasswordForm = (event) => {
        event.preventDefault();
        if (showEmailForm) {
            setShowEmailForm(false);
        }
        setShowPasswordForm(!showPasswordForm);
    };

    const toggleEmailForm = (event) => {
        event.preventDefault();
        if (showPasswordForm) {
            setShowPasswordForm(false);
        }
        setShowEmailForm(!showEmailForm);
    };

    return (
        <>
            <div style={{ minWidth: '80%' }}>
                <Container>
                    <LeftColumn>
                        <FormLeft>
                            <InputInfo>
                                <InputField
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    placeholder="Prénom"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />

                                <InputField
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    placeholder="Nom"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </InputInfo>
                            <InputInfo>
                                <ErrorDiv>
                                    {error.firstName && (
                                        <Div style={styles.error}>{error.firstName}</Div>
                                    )}
                                </ErrorDiv>
                                <ErrorDiv>
                                    {error.lastName && (
                                        <Div style={styles.error}>{error.lastName}</Div>
                                    )}
                                </ErrorDiv>
                            </InputInfo>
                            <InputInfo>
                                <InputField
                                    type="text"
                                    name="localisation"
                                    value={localisation}
                                    placeholder="Adresse"
                                    onChange={(e) => setLocalisation(e.target.value)}
                                />

                                <InputField
                                    type="tel"
                                    name="phone"
                                    value={phone}
                                    placeholder="Téléphone"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </InputInfo>

                            <InputInfo>
                                <ErrorDiv>
                                    {error.localisation && (
                                        <Div style={styles.error}>{error.localisation}</Div>
                                    )}
                                </ErrorDiv>
                                <ErrorDiv>
                                    {error.phone && <Div style={styles.error}>{error.phone}</Div>}
                                </ErrorDiv>

                            </InputInfo>

                            <InputInfo>
                                <Info>
                                    <TextInfo>Genre :</TextInfo>
                                    <SelectInput
                                        name="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="HOMME">Homme</option>
                                        <option value="FEMME">Femme</option>
                                        <option value="TRANS">trans</option>
                                        <option value="NONBINAIRE">Non binaire</option>
                                    </SelectInput>
                                </Info>
                                <Info>
                                    <TextInfo>Orientation :</TextInfo>
                                    <SelectInput
                                        name="orientation"
                                        value={orientation}
                                        onChange={(e) => setOrientation(e.target.value)}
                                    >
                                        <option value="HOMME">Homme</option>
                                        <option value="FEMME">Femme</option>
                                        <option value="TRANS">trans</option>
                                        <option value="NONBINAIRE">Non binaire</option>
                                    </SelectInput>
                                </Info>
                            </InputInfo>
                            <Description
                                name="description"
                                maxLength="200"
                                value={description}
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <ErrorDivDescription>
                                {error.description && (
                                    <Div style={styles.error}>{error.description}</Div>
                                )}
                            </ErrorDivDescription>
                            <ButtonLarge onClick={handleUpdate}>
                                Accepter les modifications
                            </ButtonLarge>
                            <InputInfo>
                                <ButtonSmall onClick={togglePasswordForm}>
                                    {showPasswordForm ? "Annuler" : "Modifier le mot de passe"}
                                </ButtonSmall>
                                <ButtonSmall onClick={toggleEmailForm}>
                                    {showEmailForm ? "Annuler" : "Modifier l'email"}
                                </ButtonSmall>
                            </InputInfo>
                        </FormLeft>
                    </LeftColumn>

                    <RightColumn>
                        <Titre>Galerie de Photos</Titre>
                        <div style={styles.photos}>
                            {pictures.slice(0, 4).map((photo, index) => (
                                <div key={index} style={styles.photoContainer}>
                                    <img
                                        src={`https://9e97b2d83d2d0de2cc31eb56f3939262.serveo.net/api/show/${id}/${photo.pictureName}`}
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
                    </RightColumn>
                </Container>

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
                            <ErrorDiv>
                                {error.password && <Div style={styles.error}>{error.password}</Div>}
                            </ErrorDiv>
                            <button type="submit" style={styles.button} >Changer le mot de passe</button>
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
                            <ErrorDiv>
                                {error.email && <Div style={styles.error}>{error.email}</Div>}
                            </ErrorDiv>
                            <button type="submit" style={styles.button} >Changer l'email</button>
                        </div>

                    </form>
                )}
            </div>
        </>
    );
};