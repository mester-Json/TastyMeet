import { useState, useEffect } from 'react';
import * as styles from './Profil.style.jsx';

export const Profil = () => {
    // Déclaration des états pour les données du profil utilisateur
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

    // Gestion de l'affichage des formulaires de modification de mot de passe et d'email
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');

    useEffect(() => {
        // Utilisation du hook useEffect pour charger les données du profil utilisateur au montage du composant
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/profile/22');
                if (response.ok) {
                    const data = await response.json();
                    // Mise à jour des états avec les données récupérées
                    setId(data.id);
                    setVersion(data.version);
                    setEmail(data.email);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setPassword(data.lastName);
                    setGender(data.gender);
                    setAge(data.age);
                    setOrientation(data.orientation || '');
                    setDescription(data.description);
                    setPhone(data.phone);
                    setLocation(data.location || '');
                    setCity(data.city || '');
                    setPictures(data.pictures);
                    console.log(id, version);
                } else {
                    setError('Erreur lors de la récupération des données.');
                }
            } catch (error) {
                console.error('Erreur:', error);
                setError('Une erreur est survenue lors de la récupération des données.');
            }
        };

        fetchProfileData(); // Appel de la fonction de récupération des données
    }, []); // Le tableau vide signifie que cette fonction s'exécute uniquement au montage du composant

    const [error, setError] = useState(null);


    // Fonction pour soumettre les modifications du profil utilisateur
    const handleUpdate = async () => {

        const newErrors = {};

        const formData = new FormData();
        formData.append("id", id);
        formData.append("version", version);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("password", password);
        formData.append("age", age);
        formData.append("description", description);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        if (file) {
            formData.append("file", file); // Ajout du fichier si présent
        }

        console.log(formData);

        // Si pas d'erreurs, soumettre le formulaire
        if (Object.keys(newErrors).length === 0) {
            event.preventDefault();
            // Si pas d'erreurs, effectuer la requête POST pour soumettre les données

            fetch("http://localhost:9090/api/update", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erreur lors de la modification");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Modification user reussi", data);
                    // Action après inscription réussie
                })
                .catch((error) => {
                    console.error("Erreur:", error);
                })
                .finally(() => {
                });
        } else {
            setErrors(newErrors);
        }
    };

    // Affichage ou masquage du formulaire de modification du mot de passe
    const togglePasswordForm = () => {
        event.preventDefault();
        const newErrors = {};
        setError(null);
        setShowEmailForm(false); // Masquer le formulaire de modification d'email
        if (!showEmailForm) {
            setShowPasswordForm(!showPasswordForm); // Inverser l'affichage du formulaire de mot de passe

        }

    };

    // Vérification et soumission du changement de mot de passe
    const handlePasswordChange = async (event) => {
        event.preventDefault();
        setError(null); // Réinitialiser les erreurs avant de commencer

        // Vérifiez que les nouveaux emails sont identiques
        if (newPassword !== confirmNewPassword) {
            setError('Les nouveaux passwords ne correspondent pas.');
            return;
        }

        try {
            const response = await fetch('http://localhost:9090/api/verifyPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 22,
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword,
                }),
            });

            if (response.ok) {
                const data = await response.text();
                alert('Mot de passe modifié avec succès.');
                setShowPasswordForm(false); // Masquer le formulaire après le changement
                setCurrentPassword(''); // Réinitialiser les champs
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                // Lire le texte de la réponse pour le message d'erreur
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            setError('Erreur lors de la mise à jour du mot de passe.');
            console.log("Erreur capturée:", error);
        }
    };

    // Affichage ou masquage du formulaire de modification d'email
    const toggleEmailForm = () => {
        event.preventDefault();
        setError(null);
        setShowPasswordForm(false);// Masquer le formulaire de modification de mot de passe
        if (!showPasswordForm) {
            setShowEmailForm(!showEmailForm); // Inverser l'affichage du formulaire d'email

        }
    };

    // Vérification et soumission du changement d'email
    const handleEmailChange = async (event) => {
        event.preventDefault();
        setError(null); // Réinitialiser les erreurs avant de commencer

        // Vérifiez que les nouveaux emails sont identiques
        if (newEmail !== confirmNewEmail) {
            setError('Les nouveaux emails ne correspondent pas.');
            return;
        }

        try {
            const response = await fetch('http://localhost:9090/api/updateEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 22,
                    currentEmail: currentEmail,
                    newEmail: newEmail,
                    confirmNewEmail: confirmNewEmail,
                }),
            });

            if (response.ok) {
                const data = await response.text();
                alert('Email modifié avec succès.');
                setShowEmailForm(false); // Masquer le formulaire après le changement
                setCurrentEmail(''); // Réinitialiser les champs
                setNewEmail('');
                setConfirmNewEmail('');
            } else {
                // Lire le texte de la réponse pour le message d'erreur
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            setError('Erreur lors de la mise à jour de l\'email.');
            console.log("Erreur capturée:", error);
        }
    };


    // Suppression d'une photo
    const handleDeletePhoto = (photoId) => {
        // Logique pour supprimer la photo
        const updatedPictures = pictures.filter(photo => photo.id !== photoId);
        setPictures(updatedPictures); // Mise à jour de l'état local des photos

        // Suppression de la photo de la BDD via son ID
        fetch(`http://localhost:9090/api/delete/${photoId}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression de la photo");
                }
                console.log("Photo supprimée avec succès");
            })
            .catch(error => {
                console.error("Erreur:", error);
            });
    };



    // Téléchargement de fichiers
    const handleFileUpload = async (e) => {
        const selectedFiles = Array.from(e.target.files); // Récupération des fichiers sélectionnés
        const formData = new FormData();
        selectedFiles.forEach(file => formData.append('file', file));

        try {
            const response = await fetch(`http://localhost:9090/api/upload/${id}`, {
                method: 'POST',
                body: formData,
            });

            // Traitez la réponse comme du texte
            const text = await response.text();
            if (response.ok) {
                console.log("Réponse du serveur:", text);
                const newPicture = {
                    pictureName: selectedFiles[0].name // Ajout du nouveau fichier à la galerie
                };
                setPictures(prevPictures => [...prevPictures, newPicture]);
            } else {
                console.error('Erreur lors de l\'upload:', text);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
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
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                placeholder="Nom"
                                onChange={(e) => setLastName(e.target.value)}
                                style={styles.input}
                            />
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
                            <input
                                type="tel"
                                name="phone"
                                value={phone}
                                placeholder="Téléphone"
                                onChange={(e) => setPhone(e.target.value)}
                                style={styles.input}
                            />
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
                        ></textarea>

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
                                <label style={{ color: 'red' }}>{error}</label> {/* Affiche le message d'erreur */}
                            </div>
                        )}
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
