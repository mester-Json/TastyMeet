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
    const [userId, setUserId] = useState([]);
    const [likedUserId, setLikedUserId] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const currentProfile = profiles[currentIndex] || { pictures: [] };
    const sliderRef = useRef(null);
    const autoPlayRef = useRef(null);
    const [dislikedProfiles, setDislikedProfiles] = useState([]);


    const settings = {
        dots: false,
        infinite: false, // Pour permettre un défilement infini
        speed: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Retire les boutons de navigation
        autoplay: true, // Active le défilement automatique
    };


    const MAX_SWIPE_DISTANCE = 100;
    const MAX_ROTATION_DEGREE = 50;
    const HORIZONTAL_MARGIN = 700;

    useEffect(() => {
        const fetchProfileData = async () => {
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
                    //http://localhost:9090/api/like/${profile.id}/${currentProfile.id}/1
                    //LikeUrl: `http://localhost:9090/api/like/${profile.id}/${currentProfile.id}/1`
                    setProfiles(profilesWithSlides);
                } else {
                    console.error('Erreur lors de la récupération des données.');
                }

            } catch (error) {
                console.error('Erreur:', error);
            }
        };
        fetchProfileData();
    }, []);

    useEffect(() => {
        console.log('Changement d\'index de profil :', currentIndex);
        console.log('Profil actuel :', currentProfile);
        setImageIndex(0);
    }, [currentIndex]);



    useEffect(() => {
        autoPlayRef.current = setInterval(() => {
            setImageIndex((prev) => {
                if (prev + 1 < currentProfile.pictures.length) {
                    return prev + 1;
                } else {
                    return 0;
                }
            });
        }, 10000);

        return () => {
            clearInterval(autoPlayRef.current);
        };
    }, [currentProfile.pictures.length]);



    const cardRef = useRef(null);

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
                setCurrentIndex((prevIndex) => {
                    let nextIndex = deltaX < 0 ? (prevIndex + 1) % profiles.length : (prevIndex + 1 + profiles.length) % profiles.length;

                    // Cherche un profil qui n'est pas dans les profils rejetés
                    while (dislikedProfiles.includes(nextIndex)) {
                        nextIndex = (nextIndex + (deltaX < 0 ? 1 : +1) + profiles.length) % profiles.length;
                    }
                    return nextIndex;
                });
            }

            cardRef.current.style.transform = '';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleDislike = () => {
        setDislikedProfiles((prev) => [...prev, currentIndex]);
        setCurrentIndex((prevIndex) => {
            let nextIndex = (prevIndex + 1) % profiles.length;
            while (dislikedProfiles.includes(nextIndex)) {
                nextIndex = (nextIndex + 1) % profiles.length;
            }
            return nextIndex;
        });
    };

    const handleLike = async () => {

        const userId = getUserIdFromToken();
        const token = localStorage.getItem('token'); // Assure-toi de récupérer correctement le token JWT

        // Effectuer la requête POST pour le like
        const likeResponse = await fetch(`http://localhost:9090/api/like/${userId}/${currentProfile.id}/1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!likeResponse.ok) {
            console.error("Erreur lors du like.");
            return;
        }

        // Vérification du match après le like
        const matchResponse = await fetch(`http://localhost:9090/api/matches/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (matchResponse.ok) {
            const matches = await matchResponse.json();

            // Vérifie si le profil actuel fait partie des matches
            const matched = matches.find(match => match.likedUser.id === currentProfile.id);

            if (matched) {
                alert(`Vous avez un match avec ${currentProfile.firstName} !`);
            } else {
                console.log("Pas de match trouvé avec ce profil.");
            }
        } else {
            console.error("Erreur lors de la récupération des matches.");
        }
        const nextIndex = (currentIndex + 1 + profiles.length) % profiles.length;
        setCurrentIndex(dislikedProfiles.includes(nextIndex) ? currentIndex : nextIndex);
    };



    //const nextIndex = (currentIndex + 1 + profiles.length) % profiles.length;
    //setCurrentIndex(dislikedProfiles.includes(nextIndex) ? currentIndex : nextIndex);
    return (
        <Container>

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
            <RightArrow onClick={handleDislike}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </RightArrow>
        </Container>
    );
};