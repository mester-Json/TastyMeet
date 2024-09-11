/*---------------------------- import ------------------------------------------------*/
import { useState , useEffect } from "react";
import {
    FormularRegister ,
    FormMoreInfo ,
    InputField ,
    InputAvatar ,
    Button ,
    Select ,
    Description ,
    P ,
    LabelError ,
    TitleForm1 ,
    TitleForm2 ,
    ImgAvatar ,
    ImgEye ,
    Div ,
    Div2 ,
    DivError ,
} from "./FormRegister.style.jsx";
import avatarDefault from "../../Resources/Images/avatar.png";
import eyeOpen from "../../Resources/Images/eye.svg";
import eyeClose from "../../Resources/Images/eye-slash.svg";

/*----------------------------------------------------------------------------*/

function FormRegister () {
    /*---------------------------- useState ------------------------------------------------*/
    const [ errors , setErrors ] = useState ( {
        firstName: "" ,
        name: "" ,
        email: "" ,
        password: "" ,
        gender: "" ,
        birthDate: "" ,
    } );
    const [ email , setEmail ] = useState ( "" );
    const [ password , setPassword ] = useState ( "" );
    const [ showPassword , setShowPassword ] = useState ( false );
    const [ showError , setShowError ] = useState ( false );
    const [ firstName , setFirstName ] = useState ( "" );
    const [ name , setName ] = useState ( "" );
    const [ gender , setGender ] = useState ( "" );
    const [ birthDate , setBirthDate ] = useState ( "" );
    const [ isAdult , setIsAdult ] = useState ( null );
    const [ isLoading , setIsLoading ] = useState ( false );
    const [ currentForm , setCurrentForm ] = useState ( "formularRegister" );
    const [ description , setDescription ] = useState ( "" );
    const [ phone , setPhone ] = useState ( null );
    const [ avatar , setAvatar ] = useState ( avatarDefault );
    const [ eye , setEye ] = useState ( eyeClose );
    /*----------------------------------------------------------------------------*/
    /*---------------------------- useEffect ------------------------------------------------*/
    // fonction qui vérifie l'age
    useEffect ( () => {
        if (birthDate) {
            const today = new Date ();
            const birthDateObj = new Date ( birthDate );
            const age = today.getFullYear () - birthDateObj.getFullYear ();

            setIsAdult ( age >= 18 );
        } else {
            setIsAdult ( null );
        }
    } , [ birthDate ] );
    /*----------------------------------------------------------------------------*/
    /*---------------------------- handle... ------------------------------------------------*/
    // Fonction d'inscription
    const handleLogin = async () => {
        const newErrors = {};

        switch (currentForm) {
            case "formularRegister":
                if (! firstName) {
                    newErrors.firstName = "Le nom est requis";
                    setShowError ( true );
                } else {
                    setShowError ( false );
                }
                if (! name) {
                    newErrors.name = "Le prénom est requis";
                    setShowError ( true );
                } else {
                    setShowError ( false );
                }
                if (! email) {
                    newErrors.email = "L'email est requis";
                    setShowError ( true );
                } else if (! /^[^\s@]+@[^\s@]+.[^\s@]+$/.test ( email )) {
                    newErrors.email = "L'email n'est pas valide";
                    setShowError ( true );
                } else {
                    setShowError ( false );
                }
                if (! password) {
                    newErrors.password = "Le mot de passe est requis";
                    setShowError ( true );
                } else {
                    setShowError ( false );
                }
                if (gender === "") {
                    newErrors.gender = "Veuillez choisir un genre";
                    setShowError ( true );
                } else {
                    setShowError ( false );
                }
                if (! birthDate) {
                    newErrors.birthDate = "La date de naissance est requise";
                    setShowError ( true );
                } else {
                    setShowError ( false );
                }
                if (isAdult === false) {
                    newErrors.birthDate = "Vous devez être majeur pour vous inscrire";
                    setShowError ( true );
                } else {
                    setShowError ( false );
                }
                break;
            case "formMoreInfo":
                if (avatar === avatarDefault) {
                    newErrors.avatar = "L'avatar est requis";
                    setShowError ( true );
                } else {
                    setShowError ( false );
                }
                if (phone === null) {
                    newErrors.phone = "Le numéro de téléphone est requis";
                    setShowError ( true );
                } else if (! /^\+?[0-9]{10,15}$/.test ( phone )) {
                    newErrors.phone = "Le numéro de téléphone n'est pas valide";
                } else {
                    setShowError ( false );
                }
                break;
            default:
                console.error ( "Formulaire non reconnu" );
                break;
        }

        // Si pas d'erreurs, soumettre le formulaire
        if (Object.keys ( newErrors ).length === 0) {
            // Si pas d'erreurs, effectuer la requête POST pour soumettre les données
            setIsLoading ( true );
            fetch ( "http://localhost:5173/register" , {
                method: "POST" ,
                headers: {"Content-Type": "application/json"} ,
                body: JSON.stringify ( {
                    firstName ,
                    name ,
                    gender ,
                    email ,
                    password ,
                    birthDate ,
                    phone ,
                    description ,
                    avatar ,
                } ) ,
            } )
                .then ( (response) => {
                    if (! response.ok) {
                        throw new Error ( "Erreur lors de l'inscription" );
                    }
                    return response.json ();
                } )
                .then ( (data) => {
                    console.log ( "Inscription réussie:" , data );
                    // Action après inscription réussie
                } )
                .catch ( (error) => {
                    console.error ( "Erreur:" , error );
                } )
                .finally ( () => {
                    setIsLoading ( false );
                } );
        } else {
            setErrors ( newErrors );
        }
    };

// set la date de naissance
    const handleDateChange = (event) => {
        setBirthDate ( event.target.value );
    };

// Fonction test pour afficher le form2
    const handleNext = async () => {
        handleLogin ();
        handleFormSwitch ( "formMoreInfo" );
    };

// Changement de l'avatar par défaut, par le nouvelle avatar
    const handlePictureChange = (e) => {
        const file = e.target.files[0]; // Sélectionne le premier fichier
        if (file) {
            const reader = new FileReader ();
            reader.onloadend = () => {
                setAvatar ( reader.result ); // Stocke l'URL de l'image dans l'état
            };
            reader.readAsDataURL ( file ); // Lit le fichier comme une URL de données
        }
    };

// Affiche ou non me mot de passe et changer l'oeil
    const handleShowPassword = () => {
        if (showPassword === false) {
            setShowPassword ( ! showPassword );
            setEye ( eyeOpen );
        } else {
            setShowPassword ( ! showPassword );
            setEye ( eyeClose );
        }
    };

// Ajuster dynamiquement la taille du textarea selon le contenu
    const handleAutoRedimText = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

// Changement de formulaire sur la même page
    const handleFormSwitch = (formName) => {
        setCurrentForm ( formName );
    };
    /*----------------------------------------------------------------------------*/

    return (
        <>
            { currentForm === "formularRegister" && (
                <FormularRegister>
                    <TitleForm1>Inscription</TitleForm1>
                    <Div>
                        {/*---------------------------- FIRSTNAME ------------------------------------------------*/ }
                        <DivError visibility={ showError ? 'visible' : 'hidden' }>
                            <LabelError>
                                { errors.firstName }
                            </LabelError>
                        </DivError>
                        <InputField
                            type="text"
                            placeholder="Nom"
                            name="firstName" // Ajout du nom pour identifier le champ
                            value={ firstName }
                            onChange={ (e) => setFirstName ( e.target.value ) }
                        />
                        {/* ----------------------------------------------------------------------------------- */ }
                        {/*---------------------------- GENDER ------------------------------------------------*/ }
                        <DivError visibility={ showError ? 'visible' : 'hidden' }>
                            <LabelError>
                                { errors.gender }
                            </LabelError>
                        </DivError>
                        <Select
                            id="options"
                            value={ gender }
                            onChange={ (e) => setGender ( e.target.value ) }
                        >
                            <option value="">Veuillez Choisir un Genre</option>
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                            <option value="Furry">Furry</option>
                            <option value="NonBinaire">Non Binaire</option>
                        </Select>
                        {/* ----------------------------------------------------------------------------------- */ }
                        {/*---------------------------- EMAIL ------------------------------------------------*/ }
                        <DivError visibility={ showError ? 'visible' : 'hidden' }>
                            <LabelError>
                                { errors.email }
                            </LabelError>
                        </DivError>
                        <InputField
                            type="email"
                            placeholder="Adresse e-mail"
                            value={ email }
                            onChange={ (e) => setEmail ( e.target.value ) }
                        />
                        {/* ----------------------------------------------------------------------------------- */ }
                        {/*---------------------------- NAME ------------------------------------------------*/ }
                    </Div>
                    <Div2>
                        <DivError visibility={ showError ? 'visible' : 'hidden' }>
                            <LabelError>
                                { errors.name }
                            </LabelError>
                        </DivError>
                        <InputField
                            type="text"
                            placeholder="Prénom"
                            name="name"
                            value={ name }
                            onChange={ (e) => setName ( e.target.value ) }
                        />
                        {/* ----------------------------------------------------------------------------------- */ }
                        {/*---------------------------- BIRTHDATE ------------------------------------------------*/ }
                        <DivError visibility={ showError ? 'visible' : 'hidden' }>
                            <LabelError>
                                { errors.birthDate }
                            </LabelError>
                        </DivError>
                        <InputField
                            type="date"
                            value={ birthDate }
                            onChange={ handleDateChange }
                        />
                        {/* ----------------------------------------------------------------------------------- */ }
                        {/*---------------------------- PASSWORD ------------------------------------------------*/ }
                        <DivError visibility={ showError ? 'visible' : 'hidden' }>
                            <LabelError>
                                { errors.password }
                            </LabelError>
                        </DivError>
                        <InputField
                            id="pwd"
                            type={ showPassword ? "text" : "password" }
                            name="password"
                            placeholder="Mot de passe"
                            value={ password }
                            onChange={ (e) => setPassword ( e.target.value ) }
                        />
                        <ImgEye src={ eye } onClick={ handleShowPassword }/>
                        {/* ----------------------------------------------------------------------------------- */ }
                    </Div2>
                    <Button type="button" onClick={ handleLogin } disabled={ isLoading }>
                        { isLoading ? "Validation..." : "Suivant" }
                    </Button>
                </FormularRegister>
            ) }

            { currentForm === "formMoreInfo" && (
                <FormMoreInfo>
                    <TitleForm2>Informations supplémentaires</TitleForm2>
                    <Div>
                        {/*---------------------------- AVATAR ------------------------------------------------*/ }
                        <DivError visibility={ showError ? 'visible' : 'hidden' }>
                            <LabelError>
                                { errors.avatar }
                            </LabelError>
                        </DivError>
                        <ImgAvatar src={ avatar }/>
                        <InputAvatar
                            type="file" // Input de type file
                            name="avatar"
                            accept=".jpg, .jpeg, .png" // extension avatar accepter
                            onChange={ handlePictureChange }
                        />
                        {/* ----------------------------------------------------------------------------------- */ }
                    </Div>
                    <Div2>
                        {/*---------------------------- PHONE ------------------------------------------------*/ }
                        <DivError visibility={ showError ? 'visible' : 'hidden' }>
                            <LabelError>
                                { errors.phone }
                            </LabelError>
                        </DivError>
                        <InputField
                            type="tel"
                            placeholder="Tel"
                            name="phone"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            value={ phone }
                            onChange={ (e) => setPhone ( e.target.value ) }
                        />
                        {/* ----------------------------------------------------------------------------------- */ }
                        {/*---------------------------- DESCRIPTION ------------------------------------------------*/ }
                        <Description
                            name="description"
                            onChange={ (e) => setDescription ( e.target.value ) }
                            onInput={ handleAutoRedimText }
                            maxLength="200" // Nombre de caractères maximum
                            rows="4" // Nombre de lignes visibles par défaut
                            cols="25" // Limiter à 25 caractères par ligne
                            placeholder="Entrez votre description...    "
                            style={ {resize: "none"} } // Empêcher le redimensionnement manuel
                        />
                        <P>{ description.length }/200 caractères utilisés</P>
                    </Div2>
                    <Button type="button" onClick={ handleLogin } disabled={ isLoading }>
                        { isLoading ? "Inscription...." : "S'inscrire" }
                    </Button>
                </FormMoreInfo>
            ) }
        </>
    );
}

export default FormRegister;
