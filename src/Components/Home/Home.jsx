import { useState, useRef } from 'react';
import {
    Card,
    Name,
    RightArrow,
    GenderAge,
    LeftArrow,
    ImageContainer,
    Container,
    Description,
    DescriptionPersso
} from "./Home.style.jsx";
import { faHeart, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MAX_SWIPE_DISTANCE = 100;
const MAX_ROTATION_DEGREE = 50;
const HORIZONTAL_MARGIN = 700;

export const Home = () => {
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
                            return (prevIndex + 1) % cardData.length;
                        } else {
                            return (prevIndex - 1 + cardData.length) % cardData.length;
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


    const cardData = [
        {
            name: "John Doe",
            gender: "Homme",
            age: "25 ans",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/path/to/your/image.jpg"
        },
        {
            name: "Jane Smith",
            gender: "Femme",
            age: "30 ans",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/path/to/another/image.jpg"
        }
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
    };

    return (
        <Container>
            <LeftArrow onClick={handlePrev}   >
                <FontAwesomeIcon icon={faHeart} />
            </LeftArrow>
            <Card ref={cardRef} onMouseDown={handleMouseDown}>
                <ImageContainer>
                    {/* Image */}
                    <img src={cardData[currentIndex].image} alt="Profile" style={{ width: '80%', height: '80%', borderRadius: '50%' }} />
                </ImageContainer>
                <DescriptionPersso>
                    <Name>{cardData[currentIndex].name}</Name>
                    <GenderAge>
                        <span>{cardData[currentIndex].gender}</span>
                        <span>{cardData[currentIndex].age}</span>
                    </GenderAge>

                    <Description>{cardData[currentIndex].description}</Description>
                </DescriptionPersso>
            </Card>

            <RightArrow onClick={handleNext} >
                <FontAwesomeIcon icon={faCircleXmark} />
            </RightArrow>
        </Container>
    );
};