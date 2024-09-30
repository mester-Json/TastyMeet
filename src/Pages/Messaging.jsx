import { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom"; // Importer useParams pour capturer le paramètre de l'URL
=======
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
import { Nav } from "../Components/Nav/Nav.jsx";
import { Footer } from "../Components/Footer/Footer.jsx";
import { CartMessaging } from '../Components/Messaging/CartMessaging.jsx';
import { CountMessaging } from "../Components/Messaging/CountMessaging.jsx";

const getUserIdFromToken = () => {
<<<<<<< HEAD
    const token = localStorage.getItem('token');
=======
    const token = sessionStorage.getItem('token');
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
        return payload.id; // Assurez-vous que l'ID est dans le payload
    }
    return null;
};
<<<<<<< HEAD

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

=======

function Messaging() {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const userId = getUserIdFromToken();
        fetch(`http://localhost:9090/api/conversations/${userId}`)
            .then(response => response.json())
            .then(data => {
                setConversations(data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des conversations:", error);
            });
    }, []);

    return (
        <>
            <Nav />
            <CountMessaging />
            {conversations.map((conversation) => (
                <CartMessaging key={conversation.id} conversation={conversation} />
            ))}
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
            <Footer />
        </>
    );
}
<<<<<<< HEAD
=======
export default Messaging
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
