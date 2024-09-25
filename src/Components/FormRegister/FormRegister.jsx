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
import { registerUser } from '../../Axios/Axios.js';

export const FormRegister = () => {
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        age: "",
        phone: "",
        file: "",
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentForm, setCurrentForm] = useState("formularRegister");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [file, setFile] = useState(avatarDefault);
    const [urlFile, setUrlFile] = useState(avatarDefault);
    const [eye, setEye] = useState(eyeClose);

    // useEffect to check age validity
    useEffect(() => {
        if (age) {
            const today = new Date();
            const birthDateObj = new Date(age);
            const agePerson = today.getFullYear() - birthDateObj.getFullYear();

            if (birthDateObj > today) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    age: "La date de naissance ne peut pas être dans le futur.",
                }));
            } else if (agePerson < 18) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    age: "Vous devez être majeur pour vous inscrire.",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    age: "", // Clear age error if valid
                }));
            }
        }
    }, [age]);

    const handleNext = async () => {
        const newErrors = {};

        if (!lastName) newErrors.lastName = "Le nom est requis";
        if (!firstName) newErrors.firstName = "Le prénom est requis";
        if (!email) {
            newErrors.email = "L'email est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "L'email n'est pas valide";
        }
        if (!password) newErrors.password = "Le mot de passe est requis";
        if (!gender) newErrors.gender = "Veuillez choisir un genre";
        if (!age) newErrors.age = "La date de naissance est requise";

        if (Object.keys(newErrors).length === 0) {
            handleFormSwitch("formMoreInfo");
        } else {
            setErrors(newErrors);
            setShowError(true);
        }
    };
    const handleLogin = async () => {
        const newErrors = {};

        // Validate additional fields before submitting
        if (file === avatarDefault) newErrors.file = "L'avatar est requis";
        if (!phone) {
            newErrors.phone = "Le numéro de téléphone est requis";
        } else if (!/^\+?[0-9]{10,15}$/.test(phone)) {
            newErrors.phone = "Le numéro de téléphone n'est pas valide";
        }

        const formatDateForDB = (date) => {
            const formattedDate = new Date(date); // Convert to a Date object
            return formattedDate.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
        };

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("password", password);
        formData.append("gender", gender);
        formData.append("description", description);
        formData.append("email", email);
        formData.append("phone", phone);

        // Format the age before appending
        const formattedAge = formatDateForDB(age); // Pass age to formatDateForDB
        console.log("Formatted age for DB:", formattedAge); // Log the formatted age for debugging
        formData.append("age", formattedAge); // Append formatted age

        formData.append("file", file); // Add the file here

        // If no errors, submit the form
        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                const data = await registerUser(formData); // Call the registration function
                console.log("Inscription réussie:", data);
                // Perform action after successful registration
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(newErrors);
        }
    };



    const handleDateChange = (event) => {
        setAge(event.target.value);
    };

    const handlePictureChange = (e) => {
        const selectedFile = e.target.files[0]; // Select the first file
        if (selectedFile) {
            setFile(selectedFile); // Store the File object in the state
            handlePictureDisplay(e); // Update the display of the selected file
        }
    };

    const handlePictureDisplay = (e) => {
        const file = e.target.files[0]; // Select the first file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUrlFile(reader.result); // Store the image URL in the state
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
        setEye(showPassword ? eyeClose : eyeOpen);
    };

    const handleAutoRedimText = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

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
