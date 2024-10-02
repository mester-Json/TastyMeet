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
    InputFieldAge
} from "./FormRegister.style.jsx";
import avatarDefault from "../../Resources/Images/avatar.png";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../../Axios/Axios.js';

export const FormRegister = () => {
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        orientation: "",
        age: "",
        phone: "",
        file: "",
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [orientation, setOrientation] = useState("");

    const [age, setAge] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentForm, setCurrentForm] = useState("formularRegister");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [file, setFile] = useState(avatarDefault);
    const [urlFile, setUrlFile] = useState(avatarDefault);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    // const [eye, setEye] = useState(eyeClose);


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
                    age: "",
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
        if (!password) {
            newErrors.password = "Le mot de passe est requis";
        } else if (password.length < 6 || password.length > 15) {
            newErrors.password = "Le mot de passe doit avoir entre 6 et 15 caractères";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins une majuscule";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins un caractère spécial";
        } else if (!confirmPassword) {
            newErrors.confirmPassword = "Veuillez confirmer le mot de passe";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }



        if (!gender) newErrors.gender = "Veuillez choisir Sexe";
        if (!gender) newErrors.orientation = "Veuillez choisir Préférence ";

        if (!age) newErrors.age = "La date de naissance est requise";

        if (Object.keys(newErrors).length === 0) {
            handleFormSwitch("formMoreInfo");
        } else {
            setErrors(newErrors);
            setShowError(true);
        }
    };

    const handleLogin = async () => {
        event.preventDefault();

        const newErrors = {};

        if (file === avatarDefault) newErrors.file = "L'avatar est requis";
        if (!phone) {
            newErrors.phone = "Le numéro de téléphone est requis";
        } else if (!/^\+?[0-9]{10,15}$/.test(phone)) {
            newErrors.phone = "Le numéro de téléphone n'est pas valide";
        }

        const formatDateForDB = (date) => {
            const formattedDate = new Date(date);
            return formattedDate.toISOString().split('T')[0];
        };

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("password", password);
        formData.append("gender", gender);
        formData.append("orientation", orientation)
        formData.append("description", description);
        formData.append("email", email);
        formData.append("phone", phone);

        const formattedAge = formatDateForDB(age);
        formData.append("age", formattedAge);
        formData.append("file", file);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                const token = await registerUser(formData);
                sessionStorage.setItem('token', token);
                navigate('/');
            } catch (err) {
                console.error(err);
                setErrors(err.response?.data?.message || 'Erreur lors de l\'inscription.');
                setShowError(true);
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(newErrors);
            setShowError(true);
        }
    };

    const handleDateChange = (event) => {
        setAge(event.target.value);
    };

    const handlePictureChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            handlePictureDisplay(e);
        }
    };

    const handlePictureDisplay = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUrlFile(reader.result);
            };
            reader.readAsDataURL(file);
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
        <><div>
            {currentForm === "formularRegister" && (
                <>
                    <TitleForm1>Inscription</TitleForm1>

                    <FormularRegister encType="multipart/form-data">

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
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {/*---------------------------- GENDER ------------------------------------------------*/}
                            <DivError visibility={showError ? 'visible' : 'hidden'}>
                                <LabelError>
                                    {errors.gender}
                                </LabelError>
                            </DivError>
                            <Select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Veuillez Choisir Votre Sexe </option>
                                <option value="MALE">Homme</option>
                                <option value="FEMALE">Femme</option>
                                <option value="TRANS">Trans</option>
                                <option value="NONBINAIRE">Non Binaire</option>
                            </Select>
                            {/*---------------------------- age ------------------------------------------------*/}
                            <DivError visibility={showError ? 'visible' : 'hidden'}>
                                <LabelError>
                                    {errors.age}
                                </LabelError>
                            </DivError>
                            <InputFieldAge
                                type="date"
                                value={age}
                                onChange={handleDateChange}
                            />
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
                            {/*---------------------------- Orientation ------------------------------------------------*/}
                            <DivError visibility={showError ? 'visible' : 'hidden'}>
                                <LabelError>
                                    {errors.orientation}
                                </LabelError>
                            </DivError>
                            <Select
                                value={orientation}
                                onChange={(e) => setOrientation(e.target.value)}
                            >
                                <option value="">Veuillez Choisir Votre Préférence</option>
                                <option value="MALE">Homme</option>
                                <option value="FEMALE">Femme</option>
                                <option value="TRANS">Trans</option>
                                <option value="NONBINAIRE">Non Binaire</option>
                            </Select>
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
                            {/*---------------------------- CONFIRM PASSWORD ------------------------------------------------*/}
                            <DivError visibility={showError ? 'visible' : 'hidden'}>
                                <LabelError>
                                    {errors.confirmPassword}
                                </LabelError>
                            </DivError>
                            <InputField
                                id="confirmPwd"
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirmez le mot de passe"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {/* ----------------------------------------------------------------------------------- */}
                        </Div2>
                        <Button type="button" onClick={handleNext} disabled={isLoading}>
                            {isLoading ? "Validation..." : "Suivant"}
                        </Button>
                    </FormularRegister>
                </>
            )}
            {currentForm === "formMoreInfo" && (
                <>
                    <TitleForm1>Inscription</TitleForm1>

                    <FormMoreInfo method="POST" encType="multipart/form-data">
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
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
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
                </>
            )}</div>
        </>
    );
}
