/*---------------------------- import ------------------------------------------------*/
import { useState, useEffect } from "react";
import {
  Form1,
  Form2,
  InputField,
  InputAvatar,
  Button,
  Select,
  Description,
  P,
  ImgAvatar,
  ImgEye,
  Div,
  Div2,
} from "./FormRegister.style.jsx";
import avatarDefault from "../../Resources/Images/avatar.png";
import eyeOpen from "../../Resources/Images/eye.svg";
import eyeClose from "../../Resources/Images/eye-slash.svg";
/*----------------------------------------------------------------------------*/

function FormRegister() {
  /*---------------------------- useState ------------------------------------------------*/
  const [errors, setErrors] = useState({
    firstName: "",
    name: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isAdult, setIsAdult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentForm, setCurrentForm] = useState("form1");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState(null);
  const [avatar, setAvatar] = useState(avatarDefault);
  const [eye, setEye] = useState(eyeClose);
  /*----------------------------------------------------------------------------*/
  /*---------------------------- useEffect ------------------------------------------------*/
  // fonction qui vérifie l'age
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
  /*----------------------------------------------------------------------------*/
  /*---------------------------- handle... ------------------------------------------------*/
  // Fonction d'inscription
  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5173/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            name,
            gender,
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
        //handleFormSwitch();//Change de formulaire
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  };

  // set la date de naissance
  const handleDateChange = (event) => {
    setBirthDate(event.target.value);
  };

  // Fonction test pour afficher le form2
  const handleNext = async () => {
    handleLogin();
    handleFormSwitch();
  };

  // Changement de l'avatar par défaut, par le nouvelle avatar
  const handlePictureChange = (e) => {
    const file = e.target.files[0]; // Sélectionne le premier fichier
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Stocke l'URL de l'image dans l'état
      };
      reader.readAsDataURL(file); // Lit le fichier comme une URL de données
    }
  };

  // Affiche ou non me mot de passe et changer l'oeil
  const handleShowPassword = () => {
    if (showPassword === false) {
      setShowPassword(!showPassword);
      setEye(eyeOpen);
    } else {
      setShowPassword(!showPassword);
      setEye(eyeClose);
    }
  };

  // Ajuster dynamiquement la taille du textarea selon le contenu
  const handleAutoRedimText = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // Changement de formulaire sur la même page
  const handleFormSwitch = (formName) => {
    setCurrentForm(formName);
  };
  /*----------------------------------------------------------------------------*/
  /*---------------------------- ValidateForm ------------------------------------------------*/
  // Verifi le contenu du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = "Le nom est requis";
    if (!name) newErrors.name = "Le prénom est requis";
    if (!email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      // Utiliser une expression régulière pour vérifier le format de l'email
      newErrors.email = "L'email n'est pas valide";
    }
    if (!password) newErrors.password = "Le mot de passe est requis";
    if (gender === "") newErrors.gender = "Veuillez choisir un genre";
    if (!birthDate) newErrors.birthDate = "La date de naissance est requise";
    if (isAdult === false)
      newErrors.birthDate = "Vous devez être majeur pour vous inscrire";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  /*----------------------------------------------------------------------------*/

  return (
    <>
      {currentForm === "form1" && (
        <Form1>
          <Div>
            {/*---------------------------- FIRSTNAME ------------------------------------------------*/}
            <InputField
              type="text"
              placeholder="Nom"
              name="firstName" // Ajout du nom pour identifier le champ
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p style={{ color: "red" }}>{errors.firstName}</p>
            )}
            {/* ----------------------------------------------------------------------------------- */}
            {/*---------------------------- GENDER ------------------------------------------------*/}
            <Select
              id="options"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Veuillez Choisir un Genre</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Furry">Furry</option>
              <option value="NonBinaire">Non Binaire</option>
            </Select>
            {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
            {/* ----------------------------------------------------------------------------------- */}
            {/*---------------------------- EMAIL ------------------------------------------------*/}
            <InputField
              type="text"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            {/* ----------------------------------------------------------------------------------- */}
            {/*---------------------------- NAME ------------------------------------------------*/}
          </Div>
          <Div2>
            <InputField
              type="text"
              placeholder="Prénom"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            {/* ----------------------------------------------------------------------------------- */}
            {/*---------------------------- BIRTHDATE ------------------------------------------------*/}
            <InputField
              type="date"
              value={birthDate}
              onChange={handleDateChange}
            />
            {errors.birthDate && (
              <p style={{ color: "red" }}>{errors.birthDate}</p>
            )}
            {/* ----------------------------------------------------------------------------------- */}
            {/*---------------------------- PASSWORD ------------------------------------------------*/}
            <InputField
              id="pwd"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ImgEye src={eye} onClick={handleShowPassword} />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
            {/* ----------------------------------------------------------------------------------- */}
          </Div2>
          <Button type="button" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Validation..." : "Suivant"}
          </Button>
        </Form1>
      )}

      {currentForm === "form2" && (
        <Form2>
          <Div>
            <ImgAvatar src={avatar} />
            <InputAvatar
              type="file" // Input de type file
              name="avatar"
              accept=".jpg, .jpeg, .png" // extension avatar accepter
              onChange={handlePictureChange}
            />
          </Div>
          <Div2>
            <InputField
              type="tel"
              placeholder="Tel"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Description
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              onInput={handleAutoRedimText}
              maxLength="200" // Nombre de caractères maximum
              rows="4" // Nombre de lignes visibles par défaut
              cols="25" // Limiter à 25 caractères par ligne
              placeholder="Entrez votre description...    "
              style={{ resize: "none" }} // Empêcher le redimensionnement manuel
            />
            <P>{description.length}/200 caractères utilisés</P>
          </Div2>
        </Form2>
      )}
    </>
  );
}

export default FormRegister;
