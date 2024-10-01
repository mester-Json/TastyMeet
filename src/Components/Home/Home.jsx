import { useState, useRef, useEffect } from 'react';
import {
    Card,
    Name,
    RightArrow,
    GenderAge,
    LeftArrow,
    Img,
    SliderStyle,
    Container,
    Description,
    DescriptionPersso,
    DivImage,
    DivDescriptionPersso
} from "./Home.style.jsx";
import { faHeart, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserData, HandleLike } from '../../Axios/Axios.js';

export const Home = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [dislikedProfiles, setDislikedProfiles] = useState([]);
    const currentProfile = profiles.length > 0 && currentIndex !== null ? profiles[currentIndex] : null;
    const sliderRef = useRef(null);
    const autoPlayRef = useRef(null);
    const cardRef = useRef(null);

    const formatDateOfBirth = (dateArray) => {

        // Assurez-vous que dateArray est bien un tableau et qu'il a la bonne longueur
        if (!Array.isArray(dateArray) || dateArray.length !== 3) {
            return dateArray; // Retournez la valeur d'origine si elle n'est pas valide
        }

        const year = dateArray[0]; // L'année est le premier élément
        const month = String(dateArray[1]).padStart(2, '0'); // Le mois est le deuxième élément
        const day = String(dateArray[2]).padStart(2, '0'); // Le jour est le troisième élément

        // Retourner la date au format YYYY-MM-DD
        return `${year}-${month}-${day}`;
    };

    const getUserIdFromToken = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id;
        }
        return null;
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };

    const MAX_SWIPE_DISTANCE = 100;
    const MAX_ROTATION_DEGREE = 50;
    const HORIZONTAL_MARGIN = 700;

    //A chaque fois que l'on change de profil, on affiche la première image de ce profil
    useEffect(() => {
        if (currentIndex !== null) {
            setImageIndex(0);
        }
    }, [currentIndex]);

    //AutoPlay des images
    useEffect(() => {
        if (!currentProfile || !currentProfile.pictures || currentProfile.pictures.length === 0) {
            return;
        }

        autoPlayRef.current = setInterval(() => {
            setImageIndex((prev) => (prev + 1 < currentProfile.pictures.length ? prev + 1 : 0));
        }, 10000);

        return () => clearInterval(autoPlayRef.current);
    }, [currentProfile]);



    const getNextRandomIndex = () => {
        const availableProfiles = profiles.filter((_, index) => !dislikedProfiles.includes(index));

        if (availableProfiles.length === 0) {
            return null; // Retourne null si aucun profil disponible
        }

        // Utilisez la longueur des profils disponibles pour choisir un index valide
        const nextIndex = Math.floor(Math.random() * availableProfiles.length);
        return profiles.indexOf(availableProfiles[nextIndex]); // Trouver l'index dans la liste originale
    };


    const handleMouseDown = (e) => {
        e.preventDefault();
        cardRef.current.style.cursor = 'grabbing';

        const startX = e.clientX;
        const cardWidth = cardRef.current.offsetWidth;
        const screenWidth = window.innerWidth;

        const handleMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const limitedDeltaX = Math.max(
                Math.min(deltaX, (screenWidth / 2) - HORIZONTAL_MARGIN - (cardWidth / 2)),
                -(screenWidth / 2) + HORIZONTAL_MARGIN + (cardWidth / 2)
            );
            const rotation = Math.min(Math.max(limitedDeltaX / 10, -MAX_ROTATION_DEGREE), MAX_ROTATION_DEGREE);
            cardRef.current.style.transform = `translateX(${limitedDeltaX}px) rotate(${rotation}deg)`;
        };

        const handleMouseUp = (upEvent) => {
            cardRef.current.style.cursor = 'grab';
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            const deltaX = upEvent.clientX - startX;
            const absDeltaX = Math.abs(deltaX);
            const isSwipeValid = absDeltaX > MAX_SWIPE_DISTANCE;

            if (isSwipeValid) {
                const nextIndex = getNextRandomIndex();
                if (nextIndex !== null) {
                    setCurrentIndex(nextIndex);
                    handleLike();  // Envoyer le like seulement si un swipe valide
                }
            }
            cardRef.current.style.transform = '';  // Réinitialiser la transformation
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    //Récupère les informations des utilisateurs 
    const fetchProfileData = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found.');
            return;
        }

        try {
            const profilesData = await UserData(token);

            if (profilesData.length > 0) {
                setProfiles(profilesData);

            }
        } catch (error) {
            console.error('Erreur lors de la récupération des profils :', error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleLike = async () => {
        const userId = getUserIdFromToken();
        const token = sessionStorage.getItem('token');

        if (!userId || !currentProfile) return;

        try {
            await HandleLike(userId, currentProfile.id, token);

            setProfiles((prevProfiles) => {
                const updatedProfiles = prevProfiles.filter(profile => profile.id !== currentProfile.id);
                return updatedProfiles;
            });

            const nextIndex = getNextRandomIndex(); // Obtenez le prochain index valide après un like
            if (nextIndex !== null) {
                setCurrentIndex(nextIndex);
            } else {
                setCurrentIndex(null); // Réinitialisez l'index si aucun profil n'est disponible
            }
        } catch (error) {
            console.error('Erreur lors du like:', error);
        }
    };

    const handleDislike = () => {
        // Ajouter l'index actuel à la liste des profils rejetés
        setDislikedProfiles((prev) => [...prev, currentIndex]);

        // Mettre à jour la liste des profils après un dislike
        const updatedProfiles = profiles.filter((_, index) => index !== currentIndex);

        if (updatedProfiles.length === 0) {
            setProfiles(updatedProfiles); // Mettre à jour la liste des profils
            setCurrentIndex(null); // Réinitialiser à null si aucun profil n'est disponible
        } else {
            setProfiles(updatedProfiles); // Mettre à jour la liste des profils
            const nextIndex = Math.floor(Math.random() * updatedProfiles.length); // Obtenez un index valide parmi les profils restants
            setCurrentIndex(nextIndex);
        }
    };



    useEffect(() => {
        if (currentIndex !== null && currentIndex >= 0 && currentIndex < profiles.length) {
        } else {
            // Si l'index n'est pas valide, essayez d'en obtenir un nouveau
            const nextIndex = getNextRandomIndex();
            if (nextIndex !== null) {
                setCurrentIndex(nextIndex);
            } else {
                setCurrentIndex(null); // Réinitialiser à null si aucun profil suivant
            }
        }
    }, [currentIndex, profiles]);



    return (
        <Container>
            {profiles.length === 0 ? (  // Vérifiez si les profils sont disponibles
                <p>Plus aucun utilisateur disponible pour le moment.</p>
            ) : (
                <>
                    <LeftArrow onClick={handleLike}>
                        <FontAwesomeIcon icon={faHeart} />
                    </LeftArrow>
                    <Card ref={cardRef} onMouseDown={handleMouseDown}>
                        <DivImage>
                            <SliderStyle
                                ref={sliderRef}
                                {...settings}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => e.preventDefault()}
                            >
                                {currentProfile && currentProfile.pictures && currentProfile.pictures.length > 0 ? (
                                    <div key={imageIndex}>
                                        <Img
                                            src={currentProfile.pictures[imageIndex]?.imageUrl}
                                            alt="Profile"
                                        />
                                    </div>
                                ) : (
                                    <p>Aucune image disponible</p>
                                )}
                            </SliderStyle>
                        </DivImage>
                        {currentProfile && Object.keys(currentProfile).length > 0 && (
                            <DivDescriptionPersso>
                                <DescriptionPersso>
                                    <Name>{currentProfile.firstName}</Name>
                                    <GenderAge>
                                        <span>{currentProfile.gender}</span>
                                        <span>{formatDateOfBirth(currentProfile.age)}</span>
                                    </GenderAge>
                                    <Description>{currentProfile.description}</Description>
                                </DescriptionPersso>
                            </DivDescriptionPersso>
                        )}
                    </Card>
                    <RightArrow onClick={handleDislike}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </RightArrow>
                </>
            )
            }
        </Container >
    );
};