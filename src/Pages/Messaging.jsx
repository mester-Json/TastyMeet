import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importer useParams pour capturer le paramètre de l'URL
import { Nav } from "../Components/Nav/Nav.jsx";
import { Footer } from "../Components/Footer/Footer.jsx";
import { CartMessaging } from '../Components/Messaging/CartMessaging.jsx';
import { CountMessaging } from "../Components/Messaging/CountMessaging.jsx";

const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
        return payload.id; // Assurez-vous que l'ID est dans le payload
    }
    return null;
};

export const Messaging = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null); // État pour la chatRoom sélectionnée
    const { chatRoomId } = useParams(); // Capture le chatRoomId à partir de l'URL

    useEffect(() => {
        const senderId = getUserIdFromToken();
        // Appeler l'API pour obtenir toutes les chatrooms pour l'utilisateur connecté
        fetch(`http://localhost:9090/api/messages/profile/${senderId}`)
            .then(response => response.json())
            .then(data => {
                setChatRooms(data);
                
                // Si l'URL contient un chatRoomId, sélectionner cette chatRoom
                if (chatRoomId) {
                    const selectedRoom = data.find(room => room.chatRoomId === parseInt(chatRoomId));
                    setSelectedChatRoom(selectedRoom);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des conversations:", error);
            });
    }, [chatRoomId]); // Recharger les données si le chatRoomId change

    return (
        <>
            <Nav />
            <CountMessaging chatRoom={chatRooms} />
            
            {/* Si une chatRoom est sélectionnée, afficher uniquement celle-ci */}
            {selectedChatRoom ? (
                <CartMessaging key={selectedChatRoom.chatRoomId} chatRoom={selectedChatRoom} />
            ) : (
                // Sinon, afficher toutes les chatRooms
                chatRooms.map((chatRoom) => (
                    <CartMessaging key={chatRoom.chatRoomId} chatRoom={chatRoom} />
                ))
            )}

            <Footer />
        </>
    );
}
