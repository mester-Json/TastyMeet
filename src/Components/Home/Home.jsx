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
import { UserData, HandleLike, CheckMatch } from '../../Axios/Axios.js';




export const Home = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const currentProfile = currentIndex !== null ? profiles[currentIndex] : { pictures: [] };
    const sliderRef = useRef(null);
    const autoPlayRef = useRef(null);
    const [dislikedProfiles, setDislikedProfiles] = useState([]);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id;
        }
        return null;
    };


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
    const getNextRandomIndex = () => {
        const availableProfiles = profiles.filter((_, index) => !dislikedProfiles.includes(index));
        if (availableProfiles.length === 0) {
            console.log('Tous les profils ont été rejetés.');
            return null;
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
                } else {
                    console.log("Il n'y a plus de profils disponibles.");
                }
            }
            cardRef.current.style.transform = '';
            handleLike();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const fetchProfileData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found. User might not be logged in.');
            return;
        }
        try {
            const profilesData = await UserData(token);
            console.log('Fetched profiles:', profilesData); // Log fetched data for debugging
            setProfiles(profilesData);
            if (profilesData.length > 0) {
                setCurrentIndex(0);
            }
        } catch (error) {
            console.error('Error fetching profiles:', error); // Log errors for debugging
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleLike = async () => {
        const userId = getUserIdFromToken();
        const token = localStorage.getItem('token');

        if (!userId || !currentProfile) return;

        try {
            await HandleLike(userId, currentProfile.id, token);

            const matches = await CheckMatch(userId, token);
            const matched = matches.find(match => match.likedUserId === currentProfile.id);

            if (matched) {
                alert(`Vous avez un match avec ${currentProfile.firstName} !`);
            } else {
                console.log('Pas de match trouvé avec ce profil.');
            }

            const nextIndex = getNextRandomIndex();
            setCurrentIndex(nextIndex);
        } catch (error) {
            console.error('Erreur lors du like ou de la récupération des matches :', error);
        }
    };
    const handleDislike = () => {
        setDislikedProfiles((prev) => [...prev, currentIndex]);
        const nextIndex = getNextRandomIndex();
        if (nextIndex !== null) {
            setCurrentIndex(nextIndex);
        } else {
            console.log("Il n'y a plus de profils disponibles.");
        }
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
                        {currentProfile.pictures.length > 0 ? ( // Only render if pictures exist
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
                {/* Conditionally render profile details only if `currentProfile` has data */}
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
        </Container>
    );
};