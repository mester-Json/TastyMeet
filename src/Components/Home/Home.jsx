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

const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
        return payload.id; // Assurez-vous que l'ID est dans le payload
    }
    return null;
};

export const Home = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [fetchingProfiles, setFetchingProfiles] = useState(false); // Nouvel état pour gérer la récupération
    const sliderRef = useRef(null);
    const autoPlayRef = useRef(null);
    const [dislikedProfiles, setDislikedProfiles] = useState([]);

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

    const fetchProfileData = async () => {
        // Vérifiez si une récupération est déjà en cours
        if (fetchingProfiles) return;

        setFetchingProfiles(true); // Début de la récupération
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:9090/api/display', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const profilesWithSlides = data.map(profile => ({
                    ...profile,
                    pictures: profile.pictures.map(picture => ({
                        pictureName: picture.pictureName,
                        imageUrl: `http://localhost:9090/api/show/${picture.pictureName}`,
                    }))
                }));
                setProfiles(profilesWithSlides);
                if (profilesWithSlides.length > 0) {
                    setCurrentIndex(0);
                } else {
                    setCurrentIndex(null); // Pas de profils disponibles
                }
            } else {
                console.error('Erreur lors de la récupération des données.');
            }

        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setFetchingProfiles(false); // Fin de la récupération
        }
    };

    useEffect(() => {
        fetchProfileData(); // Appel initial pour charger les profils
    }, []);

    useEffect(() => {
        console.log('Changement d\'index de profil :', currentIndex);
        setImageIndex(0);
    }, [currentIndex]);

    useEffect(() => {
        autoPlayRef.current = setInterval(() => {
            if (!isProcessing && currentIndex !== null) {
                setImageIndex((prev) => {
                    if (prev + 1 < profiles[currentIndex]?.pictures.length) {
                        return prev + 1;
                    } else {
                        return 0;
                    }
                });
            }
        }, 10000);

        return () => {
            clearInterval(autoPlayRef.current);
        };
    }, [currentIndex, profiles, isProcessing]);

    const cardRef = useRef(null);

    const getNextRandomIndex = () => {
        const availableProfiles = profiles.filter((_, index) => !dislikedProfiles.includes(index));
        if (availableProfiles.length === 0) {
            console.log('Tous les profils ont été rejetés.');
            return null; // Tous les profils ont été rejetés
        }
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * profiles.length);
        } while (dislikedProfiles.includes(nextIndex));
        return nextIndex;
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

        const handleMouseUp = async (upEvent) => {
            cardRef.current.style.cursor = 'grab';
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);

            const deltaX = upEvent.clientX - startX;
            const absDeltaX = Math.abs(deltaX);
            const isSwipeValid = absDeltaX > MAX_SWIPE_DISTANCE;

            if (isSwipeValid) {
                setIsProcessing(true);
                await handleLike(); // Appelle la fonction de like ou dislike directement
            }
            cardRef.current.style.transform = '';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleDislike = async () => {
        setDislikedProfiles((prev) => [...prev, currentIndex]);
        const nextIndex = getNextRandomIndex();
        if (nextIndex !== null) {
            setCurrentIndex(nextIndex);
        } else {
            console.log("Il n'y a plus de profils disponibles.");
            setCurrentIndex(null); // Aucune profil disponible
        }
        setIsProcessing(false);
    };

    const handleLike = async () => {
        const userId = getUserIdFromToken();
        const token = localStorage.getItem('token');

        const likeResponse = await fetch(`http://localhost:9090/api/${userId}/like/${currentProfile.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!likeResponse.ok) {
            console.error("Erreur lors du like.");
            setIsProcessing(false);
            return;
        }



        // Appel à fetchProfileData après un like
        await fetchProfileData(); // Rafraîchit la liste des profils après le like
    };

    // const matchResponse = await fetch(`http://localhost:9090/api/${userId}/matches`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //     }
    // });

    // if (matchResponse.ok) {
    //     const matches = await matchResponse.json();
    //     console.log("Matches reçus :", matches);

    //     const matched = matches.find(match => match.likedUserId === currentProfile.id);
    //     if (matched) {
    //         alert(`Vous avez un match avec ${currentProfile.firstName} !`);
    //     } else {
    //         console.log("Pas de match trouvé avec ce profil.");
    //     }
    // } else {
    //     console.error("Erreur lors de la récupération des matches.");
    // }

    const currentProfile = currentIndex !== null && profiles.length > 0
        ? profiles[currentIndex]
        : { pictures: [] }; // Assurez-vous que pictures est toujours défini comme un tableau

    return (
        <Container>
            {profiles.length === 0 ? (
                <Card ref={cardRef} onMouseDown={handleMouseDown} style={{ pointerEvents: isProcessing ? 'none' : 'auto' }}>
                    <DivImage>
                        <SliderStyle>
                            <Img
                                src=""
                                alt="Profile"
                            />
                        </SliderStyle>
                    </DivImage>
                    <DivDescriptionPersso>
                        <DescriptionPersso>
                            <Name>Plus aucun utilisateur est disponible</Name>
                            <GenderAge>
                                <span></span>
                                <span></span>
                            </GenderAge>
                            <Description></Description>
                        </DescriptionPersso>
                    </DivDescriptionPersso>
                </Card> // Affiche un message lorsque la liste est vide
            ) : (
                <>
                    <LeftArrow onClick={handleLike} disabled={isProcessing}>
                        <FontAwesomeIcon icon={faHeart} />
                    </LeftArrow>
                    <Card ref={cardRef} onMouseDown={handleMouseDown} style={{ pointerEvents: isProcessing ? 'none' : 'auto' }}>
                        <DivImage>
                            <SliderStyle
                                ref={sliderRef}
                                {...settings}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => e.preventDefault()}
                            >
                                {currentProfile.pictures.length > 0 ? (
                                    <div key={imageIndex}>
                                        <Img
                                            src={currentProfile.pictures[imageIndex].imageUrl}
                                            alt="Profile"
                                        />
                                    </div>
                                ) : (
                                    <p>Aucune image disponible</p>
                                )}
                            </SliderStyle>
                        </DivImage>
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
                    </Card>
                    <RightArrow onClick={handleDislike} disabled={isProcessing}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </RightArrow>
                </>
            )}
        </Container>
    );
};
