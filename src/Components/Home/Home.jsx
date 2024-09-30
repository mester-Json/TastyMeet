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
import Slider from 'react-slick';
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

    useEffect(() => {
        console.log('Changement d\'index de profil :', currentIndex);
        if (currentIndex !== null) {
            setImageIndex(0);
        }
    }, [currentIndex]);

    useEffect(() => {
        if (!currentProfile || !currentProfile.pictures || currentProfile.pictures.length === 0) {
            console.log('No profile or pictures available');
            return;
        }

        console.log('Profil actuel :', currentProfile);
        autoPlayRef.current = setInterval(() => {
            setImageIndex((prev) => (prev + 1 < currentProfile.pictures.length ? prev + 1 : 0));
        }, 10000);

        return () => clearInterval(autoPlayRef.current);
    }, [currentProfile]);

    useEffect(() => {
        if (profiles.length > 0 && currentIndex === null) {
            console.log('Initialisation du premier profil');
            setCurrentIndex(0);
        }
    }, [profiles]);

    const getNextRandomIndex = () => {
        const availableProfiles = profiles.filter((_, index) => !dislikedProfiles.includes(index));
        console.log('Profils disponibles après filtrage :', availableProfiles);

        if (availableProfiles.length === 0) {
            console.log('Tous les profils ont été rejetés ou likés.');
            return null; // Retourne null si aucun profil disponible
        }

        // Utilisez la longueur des profils disponibles pour choisir un index valide
        const nextIndex = Math.floor(Math.random() * availableProfiles.length);
        return profiles.indexOf(availableProfiles[nextIndex]); // Trouver l'index dans la liste originale
    };


    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
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
                } else {
                    console.log("Il n'y a plus de profils disponibles.");
                }
            }

            cardRef.current.style.transform = '';  // Réinitialiser la transformation
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };


    const fetchProfileData = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found.');
            return;
        }

        try {
            const profilesData = await UserData(token);
            console.log('Données de profils récupérées :', profilesData);

            if (profilesData.length > 0) {
                setProfiles(profilesData);
                setCurrentIndex(0); // Afficher le premier profil après récupération
            } else {
                console.log('Aucun profil disponible.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des profils :', error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    // const handleLike = async () => {
    //     const userId = getUserIdFromToken();
    //     const token = sessionStorage.getItem('token');

    //     if (!userId || !currentProfile) return;

    //     try {
    //         console.log('Envoi du like pour le profil :', currentProfile.id);
    //         await HandleLike(userId, currentProfile.id, token);

    //         setProfiles((prevProfiles) => {
    //             const updatedProfiles = prevProfiles.filter(profile => profile.id !== currentProfile.id);
    //             console.log('Profils mis à jour après le like :', updatedProfiles);
    //             return updatedProfiles;
    //         });

    //         // Obtenez le nouvel index après un like
    //         const nextIndex = getNextRandomIndex();
    //         if (nextIndex !== null) {
    //             setCurrentIndex(nextIndex);
    //             console.log('Index mis à jour après like :', nextIndex);
    //         } else {
    //             console.log("Aucun profil suivant trouvé.");
    //             setCurrentIndex(null); // Réinitialiser à null si aucun profil suivant
    //         }
    //     } catch (error) {
    //         console.error('Erreur lors du like :', error);
    //     }
    // };

    const handleLike = async () => {
        const userId = getUserIdFromToken();
        const token = sessionStorage.getItem('token');

        if (!userId || !currentProfile) return;

        try {
            console.log('Envoi du like pour le profil:', currentProfile.id);
            await HandleLike(userId, currentProfile.id, token);

            setProfiles((prevProfiles) => {
                const updatedProfiles = prevProfiles.filter(profile => profile.id !== currentProfile.id);
                console.log('Profils mis à jour après le like:', updatedProfiles);
                return updatedProfiles;
            });

            const nextIndex = getNextRandomIndex(); // Obtenez le prochain index valide après un like
            if (nextIndex !== null) {
                setCurrentIndex(nextIndex);
                console.log('Index mis à jour après like:', nextIndex);
            } else {
                console.log("Aucun profil suivant trouvé.");
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
        console.log('Profils mis à jour après un dislike:', updatedProfiles);

        if (updatedProfiles.length === 0) {
            console.log("Aucun profil suivant disponible.");
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
            console.log('Changement d\'index de profil :', currentIndex);
            console.log('Profil actuel :', profiles[currentIndex]);
        } else {
            console.log('Index courant non valide ou aucun profil trouvé');
            // Si l'index n'est pas valide, essayez d'en obtenir un nouveau
            const nextIndex = getNextRandomIndex();
            if (nextIndex !== null) {
                setCurrentIndex(nextIndex);
            } else {
                console.log("Aucun profil suivant disponible.");
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
                                        <span>{currentProfile.age}</span>
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
            )}
        </Container>
    );
};