import { useState, useEffect } from "react";
import {
  Button,
  Form,
  InputField,
  Div,
  Div2,
  Select,
} from "./FormRegister.style.jsx";

export const FormRegister = () => {
  const [errors, setErrors] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    genre: "",
    birthDate: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [genre, setGenre] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isAdult, setIsAdult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (isAdult === false)
      newErrors.birthDate = "Vous devez être majeur pour vous inscrire";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          body: JSON.stringify({
            nom,
            prenom,
            genre,
            email,
            password,
            birthDate,
          }),
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
      <Div>
        <InputField
          type="text"
          placeholder="Nom"
          name="nom" // Ajout du nom pour identifier le champ
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        {errors.nom && <p style={{ color: "red" }}>{errors.nom}</p>}

        <Select
          id="options"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Veuillez Choisir un Genre</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
          <option value="Furry">Furry</option>
          <option value="NonBinaire">Non Binaire</option>
        </Select>
        {errors.genre && <p style={{ color: "red" }}>{errors.genre}</p>}

        <InputField
          type="text"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </Div>
      <Div2>
        <InputField
          type="text"
          placeholder="Prénom"
          name="prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        {errors.prenom && <p style={{ color: "red" }}>{errors.prenom}</p>}

        <InputField type="date" value={birthDate} onChange={handleDateChange} />
        {errors.birthDate && <p style={{ color: "red" }}>{errors.birthDate}</p>}

        <InputField
          type="text"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </Div2>
      <Button type="button" onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Validation..." : "Suivant"}
      </Button>
    </Form>
  );
}

