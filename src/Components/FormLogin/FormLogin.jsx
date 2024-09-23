import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, InputField, Button, Inscription, Mdp } from './FormLogin.style.jsx';

export const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour validation e-mail

    const handleLogin = async () => {
        setEmailError(null);
        setPasswordError(null);
        setError(null);
        setShowError(false);

        if (!email || !password) {
            if (!email) setEmailError('L\'adresse e-mail est requise.');
            if (!password) setPasswordError('Le mot de passe est requis.');
            setShowError(true);
            return;
        }

        if (!emailRegex.test(email)) {
            setEmailError('Adresse e-mail invalide.');
            setShowError(true);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:9090/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Ici, on récupère le token comme une chaîne de texte
                const token = await response.text(); // Pas response.json()
                console.log('Login successful, token:', token);

                // Sauvegardez le token (localStorage, cookie, etc.)
                localStorage.setItem('token', token);

                // Redirection après connexion
                navigate('/accueil');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erreur de connexion.');
                setShowError(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Une erreur est survenue. Veuillez réessayer.');
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Form>
                <InputField
                    type="email"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div style={{
                    visibility: emailError ? 'visible' : 'hidden',
                    opacity: emailError ? 1 : 0,
                    height: '10px',
                    color: 'red',
                    textAlign: 'center',
                    transition: 'opacity 0.3s ease-in-out'
                }}>
                    {emailError}
                </div>
                <InputField
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{
                    visibility: passwordError ? 'visible' : 'hidden',
                    opacity: passwordError ? 1 : 0,
                    height: '5px',
                    color: 'red',
                    textAlign: 'center',
                    transition: 'opacity 0.3s ease-in-out'
                }}>
                    {passwordError}
                </div>

                {/* Message d'erreur global */}
                <div style={{
                    visibility: showError ? 'visible' : 'hidden',
                    opacity: showError ? 1 : 0,
                    height: '5px',
                    textAlign: 'center',
                    transition: 'opacity 0.3s ease-in-out'
                }}>
                    <label style={{ color: 'red' }}>
                        {error}
                    </label>
                </div>

                <Button type="button" onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
                <div>
                    <Inscription to={"/register"}>
                        Inscription
                    </Inscription>
                    <Mdp>
                        Mot de passe Oublié
                    </Mdp>
                </div>
            </Form>
        </>
    );
};
