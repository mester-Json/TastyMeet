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

    // const getNextRandomIndex = () => {
    //     const availableProfiles = profiles.filter((_, index) => !dislikedProfiles.includes(index));
    //     console.log('Profils disponibles après filtrage :', availableProfiles);

    //     if (availableProfiles.length === 0) {
    //         console.log('Tous les profils ont été rejetés ou likés.');
    //         return null;
    //     }

    //     let nextIndex;
    //     do {
    //         nextIndex = Math.floor(Math.random() * profiles.length);
    //     } while (dislikedProfiles.includes(nextIndex) || nextIndex >= availableProfiles.length);

    //     return availableProfiles[nextIndex] ? profiles.indexOf(availableProfiles[nextIndex]) : null;
    // };

    const getNextRandomIndex = () => {
        const availableProfiles = profiles.filter((_, index) => !dislikedProfiles.includes(index));
        console.log('Profils disponibles après filtrage :', availableProfiles);

        if (availableProfiles.length === 0) {
            console.log('Tous les profils ont été rejetés ou likés.');
            return null; // Retourne null si aucun profil disponible
        }

        // Si des profils sont disponibles, choisissez un index valide
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * availableProfiles.length); // Utilisez la longueur des profils disponibles
        } while (dislikedProfiles.includes(nextIndex) || nextIndex >= availableProfiles.length);

        // Retournez l'index correspondant dans la liste originale
        return profiles.indexOf(availableProfiles[nextIndex]); // Trouvez l'index du profil dans la liste originale
    };



    const handleMouseDown = (e) => {
        e.preventDefault();
        const card = cardRef.current;
        card.style.cursor = 'grabbing';
        const startX = e.clientX;
        const cardWidth = card.offsetWidth;
        const screenWidth = window.innerWidth;

        const handleMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const limitedDeltaX = Math.max(
                Math.min(deltaX, (screenWidth / 2) - HORIZONTAL_MARGIN - (cardWidth / 2)),
                -(screenWidth / 2) + HORIZONTAL_MARGIN + (cardWidth / 2)
            );
            const rotation = Math.min(Math.max(limitedDeltaX / 10, -MAX_ROTATION_DEGREE), MAX_ROTATION_DEGREE);
            card.style.transform = `translateX(${limitedDeltaX}px) rotate(${rotation}deg)`;
        };

        const handleMouseUp = () => {
            card.style.cursor = 'grab';
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);

            const deltaX = e.clientX - startX;
            const isSwipeValid = Math.abs(deltaX) > MAX_SWIPE_DISTANCE;

            if (isSwipeValid) {
                handleDislike(); // Appel ici pour gérer le dislike lors d'un swipe
            }

            card.style.transform = '';
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
        setProfiles((prevProfiles) => {
            const updatedProfiles = prevProfiles.filter((_, index) => index !== currentIndex);
            console.log('Profils mis à jour après un dislike:', updatedProfiles);
            return updatedProfiles;
        });

        // Obtenez le prochain index valide après le dislike
        const nextIndex = getNextRandomIndex();
        if (nextIndex !== null) {
            setCurrentIndex(nextIndex);
        } else {
            console.log("Aucun profil suivant disponible.");
            setCurrentIndex(null); // Réinitialisez l'index si aucun profil n'est disponible
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