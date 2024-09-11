import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, InputField, Button, Inscription, Mdp } from './FormLogin.style.jsx';

export const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            setShowError(true);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/java', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                navigate('/');
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
                <InputField type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />

                {/* Message d'erreur avec visibilité mais espace réservé */}
                <div style={{ height: '20px',textAlign: "center" , visibility: showError ? 'visible' : 'hidden' }}>
                    <label style={{ color: 'red'  }}>
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
