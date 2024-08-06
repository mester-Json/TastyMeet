import {Form , InputField } from './FormRegister.style.jsx' ;
import { useEffect , useState } from "react";


function FormRegister() {
    const [ email , setEmail ] = useState ();
    const [ password , setPassword ] = useState ();
    const [ nom , setNom ] = useState ();
    const [ prenom , setPrenom ] = useState ();
    const [ genre , setGenre ] = useState ();
    const [ birthDate , setBirthDate ] = useState ();
    const [ age , setAge ] = useState ( null );


    useEffect ( () => {
        const today = new Date ();
        const birthDateObj = new Date ( birthDate );
        const ageDiffMs = today - birthDateObj;
        const ageDate = new Date ( ageDiffMs );
        const calculatedAge = Math.abs ( ageDate.getUTCFullYear () - 1965 );
        setAge ( calculatedAge );

        if (calculatedAge >= 18) {
            console.log ( "L'utilisateur a 18 ans ou plus." );
        } else if (calculatedAge === null) {

            setAge(null);

        } else {
            console.log ( "L'utilisateur n'a pas encore 18 ans." );
    }
    }, [ birthDate ]);



    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5173/register"  , {
    methode: 'POST',
                headers: {
        'content-type': 'application/json',
                },
                body: JSON.stringify({ nom, prenom, age, genre, email, password })
        });
            if (response.ok) {
                throw new Error("Error ");
            }
            const data = await response.json();
            console.log('Login successful:', data);

    }catch(e){
            console.error('Error:', e);
        }

    }

/*
    const handleLogin = () => {
        console.log("Login boutton clicked");

    };

    const handleGenre = (e) => {
            if (genre != null) {
                setGenre(e.target.value );
            }
    }


    const handleBirthDate = () => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let ageNow = today.getFullYear() - birthDateObj.getFullYear(); // donne le nombre d'année
        console.log("Voici age now après la soustraction  : "+ ageNow.toString());
    };
*/


    return (
        <>
            <Form>
                <InputField type="text" placeholder="Nom" value={ nom } onChange={ (e) => setNom ( e.target.value ) }/>
                <InputField type="text" placeholder="Prénom" value={ prenom }
                            onChange={ (e) => setPrenom ( e.target.value ) }/>
                <InputField type="date" value={ birthDate } />
                <label htmlFor="options">Genre :</label>
                <select id="options" value={ genre } >
                    <option value="">Veuillez Choisir un genre</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                    <option value="Furry">Furry</option>
                    <option value="NonBinaire">Non Binaire</option>
                </select>
                <InputField type="text" placeholder="Adresse e-mail" value={ email }
                            onChange={ (e) => setEmail ( e.target.value ) }/>
                <InputField type="text" placeholder="Mot de passe" value={ password }
                            onChange={ (e) => setPassword ( e.target.value ) }/>
                <InputField type="button" value="Se connecter" onClick={ handleLogin }/>
            </Form>
        </>
    )
}

export default FormRegister;
