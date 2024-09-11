import { useState } from 'react';
import * as styles from './ProfilPage.style.jsx';

const ProfilPage = () => {
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        orientation: 'Male',
        email: 'john.doe@example.com',
        phone: '0655321347',
        address: '123 Route de turin, Nice, France',
        description: 'Ceci est ma description',
        photos: [
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://swello.com/fr/blog/wp-content/uploads/2018/07/profil-personnel.jpg',
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        ],
    });

    //gère les modif des champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };
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
                                value={profile.firstName}
                                onChange={handleChange}
                                placeholder="Prénom"
                                style={styles.input}
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleChange}
                                placeholder="Nom"
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.row}>
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                placeholder="Adresse"
                                style={{ ...styles.input, marginTop: '10px' }}
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                placeholder="Téléphone"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.row}>
                            <div style={{ width: '100%' }}>
                                <p>Genre :</p>
                                <select
                                    name="gender"
                                    value={profile.gender}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="Male">Homme</option>
                                    <option value="Female">Femme</option>
                                    <option value="Other">Autre</option>
                                </select>
                            </div>
                            <div style={{ width: '100%' }}>
                                <p>Orientation :</p>
                                <select
                                    name="orientation"
                                    value={profile.orientation}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="Male">Homme</option>
                                    <option value="Female">Femme</option>
                                    <option value="Other">Autre</option>
                                </select>

                            </div>
                        </div>
                        <textarea
                            name="description"
                            maxLength="200"
                            value={profile.description}
                            onChange={handleChange}
                            placeholder="Description"
                            style={{ ...styles.input, ...styles.textarea, marginTop: '10px' }}
                        ></textarea>

                        <button style={styles.buttonModif} onClick={handleChange}>
                            Accepter les modifications
                        </button>
                        <div style={styles.rowButtons}>
                            <button style={styles.button} onClick={togglePasswordForm}>
                                {showPasswordForm ? 'Annuler' : 'Modifier le mot de passe'}
                            </button>
                            <button style={styles.button} type="submit" onClick={toggleEmailForm}>
                                {showEmailForm ? 'Annuler' : "Modifier l'email"}
                            </button>
                        </div>
                        <div style={styles.rowButtons}>
                            {error && <label style={{ color: 'red' }}>{error}</label>} {/* Display error message */}
                        </div>
                    </form>
                </div>


                <div style={styles.rightColumn}>
                    <h2 style={styles.photoGalleryHeader}>Galerie de Photos</h2>
                    <div style={styles.photos}>
                        {profile.photos.slice(0, 4).map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`Photo ${index + 1}`}
                                style={styles.photo}
                            />
                        ))}
                        {profile.photos.length < 4 && (
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
                            placeholder="email actuel"
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

export default ProfilPage;