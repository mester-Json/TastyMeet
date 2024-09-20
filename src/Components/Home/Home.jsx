import { useState, useRef, useEffect } from 'react';
import {
    Card,
    Name,
    RightArrow,
    GenderAge,
    LeftArrow,
    ImageContainer,
    Container,
    Description,
    DescriptionPersso,
    PictureSlider,
} from "./Home.style.jsx";
import { faHeart, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';

export const Home = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentProfile = profiles[currentIndex] || { pictures: [] };
    const sliderRef = useRef(null);
    const [imageIndex, setImageIndex] = useState(0);


    const settings = {
        dots: false,
        infinite: false, // Pour permettre un défilement infini
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true, // Retire les boutons de navigation
        autoplay: true, // Active le défilement automatique
        autoplaySpeed: 100,
        beforeChange: (current, next) => setImageIndex(next),
    };


    const MAX_SWIPE_DISTANCE = 100;
    const MAX_ROTATION_DEGREE = 50;
    const HORIZONTAL_MARGIN = 700;

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/display/MALE/FEMALE');
                if (response.ok) {
                    const data = await response.json();
                    const profilesWithSlides = data.map(profile => ({
                        ...profile,
                        pictures: profile.pictures.map(picture => ({
                            pictureName: picture.pictureName,
                            imageUrl: `http://localhost:9090/api/show/${picture.pictureName}`
                        }))
                    }));
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
                setCurrentIndex((prevIndex) => (deltaX < 0 ? (prevIndex + 1) % profiles.length : (prevIndex - 1 + profiles.length) % profiles.length));
            }
            cardRef.current.style.transform = '';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    console.log(currentProfile)


    return (
        <Container>
            <LeftArrow onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + profiles.length) % profiles.length)}>
                <FontAwesomeIcon icon={faHeart} />
            </LeftArrow>
            <Card ref={cardRef} onMouseDown={handleMouseDown}>
                <ImageContainer>

                    <PictureSlider ref={sliderRef} {...settings}>
                        {currentProfile.pictures.length > 0 ? (

                            <div key={imageIndex}>

                                <img
                                    src={currentProfile.pictures[imageIndex].imageUrl}
                                    alt="Profile"
                                    style={{ width: '100%', height: 'auto', borderRadius: '90%' }}
                                />

                            </div>

                        ) : (
                            <p>Aucune image disponible</p>
                        )}
                    </PictureSlider>




                </ImageContainer>
                <DescriptionPersso>
                    <Name>{currentProfile.firstName}</Name>
                    <GenderAge>
                        <span>{currentProfile.gender}</span>
                        <span>{currentProfile.age}</span>
                    </GenderAge>
                    <Description>{currentProfile.description}</Description>
                </DescriptionPersso>
            </Card>
            <RightArrow onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length)}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </RightArrow>
        </Container>
    );
};
