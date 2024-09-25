/*---------------------------- import ------------------------------------------------*/
import { useState, useEffect } from "react";
import {
    FormularRegister,
    FormMoreInfo,
    InputField,
    InputAvatar,
    Button,
    Select,
    Description,
    P,
    LabelError,
    TitleForm1,
    TitleForm2,
    ImgAvatar,
    ImgEye,
    Div,
    Div2,
    DivError,
} from "./FormRegister.style.jsx";
import avatarDefault from "../../Resources/Images/avatar.png";
import eyeOpen from "../../Resources/Images/eye.svg";
import eyeClose from "../../Resources/Images/eye-slash.svg";

/*----------------------------------------------------------------------------*/

export const FormRegister = () => {
    /*---------------------------- useState ------------------------------------------------*/
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        age: "",
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [isAdult, setIsAdult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentForm, setCurrentForm] = useState("formularRegister");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState(null);
    const [file, setFile] = useState(avatarDefault);
    const [urlFile, setUrlFile] = useState(avatarDefault);
    const [eye, setEye] = useState(eyeClose);
    /*----------------------------------------------------------------------------*/
    /*---------------------------- useEffect ------------------------------------------------*/
    // fonction qui vérifie l'age
    useEffect(() => {
        if (age) {
            const today = new Date();
            const birthDateObj = new Date(age);
            const agePerson = today.getFullYear() - birthDateObj.getFullYear();

            setIsAdult(agePerson >= 18);
        } else {
            setIsAdult(null);
        }
    }, [age]);
    /*----------------------------------------------------------------------------*/

    // const ReverseDateTime = () => {
    //     console.log(age);
    //     // Convert the date string (YYYY-MM-DD) into a Date object
    //     const date = new Date(age);

    //     // Extract day, month, and year from the date object
    //     const day = date.getDate().toString().padStart(2, '0');
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    //     const year = date.getFullYear();

    //     // Format the date as DD-MM-YYYY
    //     setAge(`${day}-${month}-${year}`);

    // }; 




    /*********************** handleNext************************/
    // Fonction test pour afficher le form2
    const handleNext = async () => {
        const newErrors = {};
        switch (currentForm) {
            case "formularRegister":
                if (!lastName) {
                    newErrors.lastName = "Le nom est requis";
                    setShowError(true);
                } else {
                    setShowError(false);
                }
                if (!firstName) {
                    newErrors.firstName = "Le prénom est requis";
                    setShowError(true);
                } else {
                    setShowError(false);
                }
                if (!email) {
                    newErrors.email = "L'email est requis";
                    setShowError(true);
                } else if (! /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
                    newErrors.email = "L'email n'est pas valide";
                    setShowError(true);
                } else {
                    setShowError(false);
                }
                if (!password) {
                    newErrors.password = "Le mot de passe est requis";
                    setShowError(true);
                } else {
                    setShowError(false);
                }
                if (gender === "") {
                    newErrors.gender = "Veuillez choisir un genre";
                    setShowError(true);
                } else {
                    setShowError(false);
                }
                if (!age) {
                    newErrors.age = "La date de naissance est requise";
                    setShowError(true);
                } else {
                    setShowError(false);
                }
                if (isAdult === false) {
                    newErrors.age = "Vous devez être majeur pour vous inscrire";
                    setShowError(true);
                } else {
                    setShowError(false);
                }
                break;
            default:
                console.error("Formulaire non reconnu");
                break;
        }
        // Si pas d'erreurs, soumettre le formulaire
        if (Object.keys(newErrors).length === 0) {

            handleFormSwitch("formMoreInfo");
        } else {
            setErrors(newErrors);
        }

    };

    /*****************************************************************************/
    /*****************************handleLogin**********************************/
    // Fonction d'inscription
    const handleLogin = async () => {
        console.log(age);
        const newErrors = {};

        switch (currentForm) {
            case "formMoreInfo":
                if (file === avatarDefault) {
                    newErrors.file = "L'avatar est requis";
                    setShowError(true);
                } else {
                    setShowError(false);
                }
                if (phone === null) {
                    newErrors.phone = "Le numéro de téléphone est requis";
                    setShowError(true);
                } else if (! /^\+?[0-9]{10,15}$/.test(phone)) {
                    newErrors.phone = "Le numéro de téléphone n'est pas valide";
                } else {
                    setShowError(false);
                }
                break;
            default:
                console.error("Formulaire non reconnu");
                break;
        }

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("age", age);
        formData.append("password", password);
        formData.append("description", description);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        formData.append("file", file); // fichier ajouté ici


        // Si pas d'erreurs, soumettre le formulaire
        if (Object.keys(newErrors).length === 0) {
            // Si pas d'erreurs, effectuer la requête POST pour soumettre les données
            setIsLoading(true);

            fetch("http://localhost:9090/api/addUser", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erreur lors de l'inscription");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Inscription réussie:", data);
                    // Action après inscription réussie
                })
                .catch((error) => {
                    console.error("Erreur:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setErrors(newErrors);
        }
    };
    // set la date de naissance
    const handleDateChange = (event) => {
        setAge(event.target.value);
    };

    // Fonction test pour afficher le form2


    const handlePictureChange = (e) => {
        const selectedFile = e.target.files[0]; // Sélectionne le premier fichier
        if (selectedFile) {
            setFile(selectedFile); // Stocke l'objet File dans l'état
        }
        handlePictureDisplay(e);
    };

    // Changement de l'file par défaut, par le nouvelle file
    const handlePictureDisplay = (e) => {
        const file = e.target.files[0]; // Sélectionne le premier fichier
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUrlFile(reader.result); // Stocke l'URL de l'image dans l'état
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

    return (
        <>
            {currentForm === "formularRegister" && (
                <FormularRegister method="post" encType="multipart/form-data">
                    <TitleForm1>Inscription</TitleForm1>
                    <Div>
                        {/*---------------------------- lastName ------------------------------------------------*/}
                        <DivError visibility={showError ? 'visible' : 'hidden'}>
                            <LabelError>
                                {errors.lastName}
                            </LabelError>
                        </DivError>
                        <InputField
                            type="text"
                            placeholder="Nom"
                            name="lastName" // Ajout du nom pour identifier le champ
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {/* ----------------------------------------------------------------------------------- */}
                        {/*---------------------------- GENDER ------------------------------------------------*/}
                        <DivError visibility={showError ? 'visible' : 'hidden'}>
                            <LabelError>
                                {errors.gender}
                            </LabelError>
                        </DivError>
                        <Select
                            id="options"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Veuillez Choisir un Genre</option>
                            <option value="MALE">Homme</option>
                            <option value="FEMALE">Femme</option>
                            <option value="TRANS">Trans</option>
                            <option value="NONBINAIRE">Non Binaire</option>
                        </Select>
                        {/* ----------------------------------------------------------------------------------- */}
                        {/*---------------------------- EMAIL ------------------------------------------------*/}
                        <DivError visibility={showError ? 'visible' : 'hidden'}>
                            <LabelError>
                                {errors.email}
                            </LabelError>
                        </DivError>
                        <InputField
                            type="email"
                            placeholder="Adresse e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* ----------------------------------------------------------------------------------- */}
                        {/*---------------------------- FirstNAME ------------------------------------------------*/}
                    </Div>
                    <Div2>
                        <DivError visibility={showError ? 'visible' : 'hidden'}>
                            <LabelError>
                                {errors.firstName}
                            </LabelError>
                        </DivError>
                        <InputField
                            type="text"
                            placeholder="Prénom"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {/* ----------------------------------------------------------------------------------- */}
                        {/*---------------------------- age ------------------------------------------------*/}
                        <DivError visibility={showError ? 'visible' : 'hidden'}>
                            <LabelError>
                                {errors.age}
                            </LabelError>
                        </DivError>
                        <InputField
                            type="date"
                            value={age}
                            onChange={handleDateChange}
                        />
                        {/* ----------------------------------------------------------------------------------- */}
                        {/*---------------------------- PASSWORD ------------------------------------------------*/}
                        <DivError visibility={showError ? 'visible' : 'hidden'}>
                            <LabelError>
                                {errors.password}
                            </LabelError>
                        </DivError>
                        <InputField
                            id="pwd"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ImgEye src={eye} onClick={handleShowPassword} />
                        {/* ----------------------------------------------------------------------------------- */}
                    </Div2>
                    <Button type="button" onClick={handleNext} disabled={isLoading}>
                        {isLoading ? "Validation..." : "Suivant"}
                    </Button>
                </FormularRegister>
            )}

            {currentForm === "formMoreInfo" && (
                <FormMoreInfo method="post" encType="multipart/form-data">
                    <TitleForm2>Informations supplémentaires</TitleForm2>
                    <Div>
                        {/*---------------------------- file ------------------------------------------------*/}
                        <DivError visibility={showError ? 'visible' : 'hidden'}>
                            <LabelError>
                                {errors.file}
                            </LabelError>
                        </DivError>
                        <ImgAvatar src={urlFile} />
                        <InputAvatar
                            type="file" // Input de type file
                            name="file"
                            accept=".jpg, .jpeg, .png" // extension file accepter
                            onChange={handlePictureChange}
                        />
                        {/* ----------------------------------------------------------------------------------- */}
                    </Div>
                    <Div2>
                        {/*---------------------------- PHONE ------------------------------------------------*/}
                        <DivError visibility={showError ? 'visible' : 'hidden'}>
                            <LabelError>
                                {errors.phone}
                            </LabelError>
                        </DivError>
                        <InputField
                            type="tel"
                            placeholder="Tel"
                            name="phone"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {/* ----------------------------------------------------------------------------------- */}
                        {/*---------------------------- DESCRIPTION ------------------------------------------------*/}
                        <Description
                            type="text"
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
                    <Button type="button" onClick={handleLogin} disabled={isLoading}>
                        {isLoading ? "Inscription...." : "S'inscrire"}
                    </Button>
                </FormMoreInfo>
            )}
        </>
    );
}
