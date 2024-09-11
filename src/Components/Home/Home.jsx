import { useState, useRef } from 'react';
import { Card, Name, Image, Container, Description } from "./Home.style.jsx";

const MAX_SWIPE_DISTANCE = 100;
<<<<<<< HEAD
const MAX_ROTATION_DEGREE = 50;
const HORIZONTAL_MARGIN = 700;
=======
const MAX_ROTATION_DEGREE = 50; // Rotation maximale
>>>>>>> jonathan

export const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRef = useRef(null);

    const handleMouseDown = (e) => {
        e.preventDefault();
        cardRef.current.style.cursor = 'grabbing';
        const startX = e.clientX;
<<<<<<< HEAD
        const cardWidth = cardRef.current.offsetWidth;
        const screenWidth = window.innerWidth;
=======
>>>>>>> jonathan

        const handleMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;

<<<<<<< HEAD
            // Limiter le déplacement avec une marge plus grande
            const limitedDeltaX = Math.max(
                Math.min(deltaX, (screenWidth / 2) - HORIZONTAL_MARGIN - (cardWidth / 2)),
                -(screenWidth / 2) + HORIZONTAL_MARGIN + (cardWidth / 2)
            );

            const rotation = Math.min(Math.max(limitedDeltaX / 10, -MAX_ROTATION_DEGREE), MAX_ROTATION_DEGREE);

            cardRef.current.style.transform = `translateX(${limitedDeltaX}px) rotate(${rotation}deg)`;
=======
            const rotation = Math.min(Math.max(deltaX / 10, -MAX_ROTATION_DEGREE), MAX_ROTATION_DEGREE);

            cardRef.current.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
>>>>>>> jonathan
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
            description: "Lorem ipsum dolor sit amet...",
            image: "path/to/your/image.jpg"
        },
        {
            name: "Jane Smith",
            description: "Lorem ipsum dolor sit amet...",
            image: "path/to/another/image.jpg"
        },
    ];

    return (
<<<<<<< HEAD
        <>
            <div>
                <Container>
                    <Card ref={cardRef} onMouseDown={handleMouseDown}>
                        <Image style={{ backgroundImage: `url(${cardData[currentIndex].image})` }} />
                        <Name>{cardData[currentIndex].name}</Name>
                        <Description>{cardData[currentIndex].description}</Description>
                    </Card>
                </Container>
            </div>
        </>
=======
        <Container>
            <Card ref={cardRef} onMouseDown={handleMouseDown}>
                <Image style={{ backgroundImage: `url(${cardData[currentIndex].image})` }} />
                <Name>{cardData[currentIndex].name}</Name>
                <Description>{cardData[currentIndex].description}</Description>
            </Card>
        </Container>
>>>>>>> jonathan
    );
};
