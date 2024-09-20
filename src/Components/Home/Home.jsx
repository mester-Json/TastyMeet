import { useState, useRef, useEffect } from 'react';
import {
    Card,
    Name,
    RightArrow,
    GenderAge,
    LeftArrow,
    Img,
    Container,
    Description,
    DescriptionPersso,
    DivImage,
    DivDescriptionPersso
} from "./Home.style.jsx";
import { faHeart, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';

export const Home = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const currentProfile = profiles[currentIndex] || { pictures: [] };
    const sliderRef = useRef(null);
    const autoPlayRef = useRef(null);


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

    useEffect(() => {

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
                <DivImage>
                    {/* <ImageContainer> */}
                    <Slider ref={sliderRef} {...settings}>
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
                    </Slider>


                    {/* </ImageContainer> */}
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
            <RightArrow onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length)}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </RightArrow>
        </Container>
    );
};
