import { useState } from 'react';
import { Form, InputField , Button, Inscription , Mdp  } from './FormLogin.style.jsx';
/*import { Inscription , Mdp } from "../Nav/Nav.style.jsx";*/

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/your-api-endpoint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erreur de connexion.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsLoading(false); // Hide loading state
        }
    };

    return (
        <>
        <Form>
            <InputField type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <Button type="button" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Connexion...' : 'Se connecter'} {/* Show loading indicator */}
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
}

export default LoginForm;
