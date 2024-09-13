import { useState, useEffect } from 'react';
import * as styles from './Profil.style.jsx';

export const Profil = () => {
    const [email, setEmail] = useState('');
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
    const [pictures, setPictures] = useState([]);


    useEffect(() => {
        // Chargement des données du profil utilisateur
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/profile/22');
                if (response.ok) {
                    const data = await response.json();
                    // Mettez à jour les états avec les données récupérées
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
                } else {
                    setError('Erreur lors de la récupération des données.');
                }
            } catch (error) {
                console.error('Erreur:', error);
                setError('Une erreur est survenue lors de la récupération des données.');
            }
        };

        fetchProfileData();
    }, []);
    //gère les modif des champs du formulaire
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setProfile({
    //         ...profile,
    //         [name]: value,
    //     });
    // };
    const [error, setError] = useState(null);

    // composant qui s'affiche ou se désafiche lorsque l'on clique sur "Modifier mdp"
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // composant qui s'affiche ou se désafiche lorsque l'on clique sur "Modifier email"
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');

    // afficher (ou désafficher) le composant pour modifier le mdp
    const togglePasswordForm = () => {
        event.preventDefault();
        setError(null);
        setShowEmailForm(false);
        if (!showEmailForm) {
            setShowPasswordForm(!showPasswordForm);

        }

    };

    // Verifie si le nouveau mdp et le confirmer le nouveau mdp sont identitique, si ils le sont alors le composant se désafiche
    const handlePasswordChange = (e) => {
        if (newPassword !== confirmNewPassword) {
            event.preventDefault();
            setError('Les mdp ne sont pas identique');
            return;
        } else {
            alert('Mot de passe modifié avec succès.');
            setShowPasswordForm(false);
            setError(null);
        }
    };

    // afficher (ou désafficher) le composant pour modifier l'email'
    const toggleEmailForm = () => {
        event.preventDefault();
        setError(null);
        setShowPasswordForm(false);
        if (!showPasswordForm) {
            setShowEmailForm(!showEmailForm);

        }


    };


    // Verifie si le nouvel email et le confirmer le nouvel email sont identitique, si ils le sont alors le composant se désafiche
    const handleEmailChange = (e) => {
        if (newEmail !== confirmNewEmail) {
            event.preventDefault();
            setError('les adresses emails ne correspondent pas.');
            return;
        }
        alert("l'email modifié avec succès.");
        setShowEmailForm(false);
        setError(null);
    };


    const handleFileUpload = () => {
        alert('Une image a été ajouté');
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

                        <button style={styles.buttonModif}>
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
                            <img
                                key={index}
                                src={`http://localhost:9090/api/show/${photo.pictureName}`}
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

        </>
    );
};
