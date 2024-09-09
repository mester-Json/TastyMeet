import  { useState, useEffect } from "react";
import { Form, InputField } from "./FormRegister.style.jsx";

function FormRegister() {

    const [errors, setErrors] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        genre: "",
        birthDate: "",
    })

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [genre, setGenre] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [isAdult, setIsAdult] = useState(null);

    useEffect(() => {
        if (birthDate) {
            const today = new Date();
            const birthDateObj = new Date(birthDate);
            const age = today.getFullYear() - birthDateObj.getFullYear();

            setIsAdult(age >= 18);
        } else {
            setIsAdult(null);
        }
    }, [birthDate]);

    const validateForm = () => {
        const newErrors = {};

        if (!nom) newErrors.nom = "Le nom est requis";
        if (!prenom) newErrors.prenom = "Le prénom est requis";
        if (!email) newErrors.email = "L'email est requis";
        if (!password) newErrors.password = "Le mot de passe est requis";
        if (genre === "") newErrors.genre = "Veuillez choisir un genre";
        if (!birthDate) newErrors.birthDate = "La date de naissance est requise";
        if (isAdult === false) newErrors.birthDate = "Vous devez être majeur pour vous inscrire";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "nom":
                setNom ( value );
                break;
            case "prenom":
                setPrenom ( value );
                break;
                // Ajoute des autre Input
        }
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "nom":
            case "prenom":
                if (!value) error = "Ce champ est requis";
                break;
            case "email":
                if (!value) error = "L'email est requis";
                else if (!/\S+@\S+\.\S+/.test(value)) error = "L'email est invalide";
                break;
            case "password":
                if (!value) error = "Le mot de passe est requis";
                break;
            case "genre":
                if (value === "") error = "Veuillez choisir un genre";
                break;
            case "birthDate":
                if (!value) error = "La date de naissance est requise";
                else if (isAdult === false) error = "Vous devez être majeur pour vous inscrire";
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleDateChange = (event) => {
        setBirthDate(event.target.value);
    };

    const handleLogin = async () => {
        if (validateForm()) {
            try {
                const response = await fetch("http://localhost:5173/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nom, prenom, genre, email, password, birthDate }),
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de l'inscription");
                }

                const data = await response.json();
                console.log("Inscription réussie:", data);
            } catch (error) {
                console.error("Erreur:", error);
            }
        }
    };

    return (
        <Form>
            <InputField
                type="text"
                placeholder="Nom"
                name="nom" // Ajout du nom pour identifier le champ
                value={nom}
                onChange={handleInputChange}
            />
            {errors.nom && <p style={{ color: "red" }}>{errors.nom}</p>}
                        onChange={ (e) => setPrenom ( e.target.value ) }
            <label htmlFor="options">Genre :</label>
            <select id="options" value={ genre } >
                <option value="">Veuillez Choisir un genre</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Furry">Furry</option>
                <option value="NonBinaire">Non Binaire</option>
            </select>            <InputField type="date" value={birthDate} onChange={handleDateChange} />
            {errors.birthDate && <p style={{ color: "red" }}>{errors.birthDate}</p>}

            <InputField type="text" placeholder="Adresse e-mail" value={ email }
                        onChange={ (e) => setEmail ( e.target.value ) }/>
            <InputField type="text" placeholder="Mot de passe" value={ password }
                        onChange={ (e) => setPassword ( e.target.value ) }/>
            <InputField type="button" value="Se connecter" onClick={ handleLogin }/>
        </Form>
    );
}


export default FormRegister;
