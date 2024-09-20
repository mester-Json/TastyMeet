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
    Div
} from "./Home.style.jsx";
import { faHeart, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';






export const Home = () => {

    const MAX_SWIPE_DISTANCE = 100;
    const MAX_ROTATION_DEGREE = 50;
    const HORIZONTAL_MARGIN = 700;


    const [profiles, setProfiles] = useState([]);
    const sliderRef = useRef(null);






    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0); // Réinitialise le slider
        }
    }, [profiles]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: true,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        pauseOnHover: true,
    };

    // const [id, setId] = useState('');
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [gender, setGender] = useState('');
    // const [age, setAge] = useState('');
    // const [description, setDescription] = useState('');
    // const [pictures, setPictures] = useState([]);


    // useEffect(() => {
    //     // Utilisation du hook useEffect pour charger les données du profil utilisateur au montage du composant
    //     const fetchProfileData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:9090/api/display/MALE/FEMALE');
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 // Mise à jour des états avec les données récupérées
    //                 // setId(data.id);
    //                 setFirstName(data.firstName);
    //                 setLastName(data.lastName);
    //                 setGender(data.gender);
    //                 setAge(data.age);
    //                 setDescription(data.description);
    //                 setPictures(data.pictures);
    //                 // console.log(id, version);
    //                 console.log(firstName)
    //             } else {
    //                 setError('Erreur lors de la récupération des données.');
    //             }
    //         } catch (error) {
    //             console.error('Erreur:', error);
    //             setError('Une erreur est survenue lors de la récupération des données.');
    //         }
    //     };

    //     fetchProfileData(); // Appel de la fonction de récupération des données
    // }, []); // Le tableau vide signifie que cette fonction s'exécute uniquement au montage du composant

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/display/MALE/FEMALE');
                if (response.ok) {
                    const data = await response.json();
                    setProfiles(data); // Mets à jour la liste de profils
                } else {
                    setError('Erreur lors de la récupération des données.');
                }
            } catch (error) {
                console.error('Erreur:', error);
                setError('Une erreur est survenue lors de la récupération des données.');
            }
        };

        fetchProfileData();
    }, []);






    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRef = useRef(null);

    const handleMouseDown = (e) => {
        e.preventDefault();
        cardRef.current.style.cursor = 'grabbing';
        const startX = e.clientX;
        const cardWidth = cardRef.current.offsetWidth;
        const screenWidth = window.innerWidth;

        const handleMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;

            // Limiter le déplacement avec une marge plus grande
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

            let direction;
            if (isSwipeValid) {
                if (deltaX < 0) {
                    direction = 'left';
                } else if (deltaX > 0) {
                    direction = 'right';
                }
            }

            if (direction) {
                cardRef.current.classList.add(`swiped-${direction}`);
            }

            setTimeout(() => {
                if (direction) {
                    setCurrentIndex((prevIndex) => {
                        if (direction === 'left') {
                            return (prevIndex + 1) % profiles.length;
                        } else {
                            return (prevIndex - 1 + profiles.length) % profiles.length;
                        }
                    });
                }
                cardRef.current.classList.remove(`swiped-${direction}`);
                cardRef.current.style.transform = ''; // Réinitialiser la transformation (translation et rotation)
            }, 300);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };


    // const cardData = [
    //     {
    //         name: "John Doe",
    //         gender: "Homme",
    //         age: "25 ans",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //         image: "/path/to/your/image.jpg"
    //     },
    //     {
    //         name: "Jane Smith",
    //         gender: "Femme",
    //         age: "30 ans",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //         image: "/path/to/another/image.jpg"
    //     }
    // ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + profiles.length) % profiles.length);
    };

    const currentProfile = profiles[currentIndex] || {}; // Utilisation d'un profil par défaut s'il n'y a pas de données



    return (
        <Container>
            <LeftArrow onClick={handlePrev}>
                <FontAwesomeIcon icon={faHeart} />
            </LeftArrow>
            <Card ref={cardRef} onMouseDown={handleMouseDown}>
                <ImageContainer>
                    <PictureSlider ref={sliderRef} {...settings}>
                        {currentProfile.pictures && currentProfile.pictures.length > 0 ? (
                            currentProfile.pictures.map((photo, index) => (
                                <Div key={index}>
                                    <img
                                        src={`http://localhost:9090/api/show/${photo.pictureName}`}
                                        alt="Profile"
                                        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                    />

                                </Div>

                            ))
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
            <RightArrow onClick={handleNext}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </RightArrow>
        </Container>
    );
}