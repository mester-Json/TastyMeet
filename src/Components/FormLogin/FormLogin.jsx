import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Div, Form, InputField, Button, Inscription, Mdp } from './FormLogin.style.jsx';
import { SignIn } from '../../Axios/Axios.js';

export const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            navigate('/accueil');
        }
    }, [navigate]);


    const handleLogin = async (e) => {
        e.preventDefault();

        setEmailError(null);
        setPasswordError(null);
        setError(null);
        setShowError(false);


        let hasError = false;


        if (!email || !password) {
            if (!email) setEmailError('L\'adresse e-mail est requise.');
            if (!password) setPasswordError('Le mot de passe est requis.');
            hasError(true);
            return;
        }

        if (!emailRegex.test(email)) {
            setEmailError('Adresse e-mail invalide.');
            hasError(true);
            return;
        }


        if (hasError) {
            setShowError(true);
            return;
        }




        setIsLoading(true);


        try {
            const token = await SignIn(email, password);
            sessionStorage.setItem('token', token);
            setIsAuthenticated(true);
            navigate('/accueil');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Erreur lors de la connexion.');
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (isAuthenticated) {
        return null;
    }



    return (
        <Div>
            <Form onSubmit={handleLogin}>
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

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>

                <div>
                    <Inscription to="/register">
                        Inscription
                    </Inscription>
                    <Mdp>
                        Mot de passe Oublié
                    </Mdp>
                </div>
            </Form>
        </Div>
    );
};
