import { useEffect, useState } from "react";
import { Nav } from "../Components/Nav/Nav.jsx";
import { Footer } from "../Components/Footer/Footer.jsx";
import { CartMessaging } from '../Components/Messaging/CartMessaging.jsx';
import { CountMessaging } from "../Components/Messaging/CountMessaging.jsx";

const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
            return payload.id; // S'assurer que l'ID est dans le payload
        } catch (error) {
            console.error('Erreur lors de la décodage du token:', error);
        }
    }
    return null;
};

export const Messaging = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [loading, setLoading] = useState(true); // Ajout d'un état pour le chargement

    useEffect(() => {
        const senderId = getUserIdFromToken();
        if (!senderId) {
            console.error("Aucun ID utilisateur trouvé dans le token.");
            return;
        }

        fetch(`http://localhost:9090/api/messages/profile/${senderId}`)
            .then(response => response.json())
            .then(data => {
                setChatRooms(data || []); // S'assurer que 'data' est un tableau, même si vide
                setLoading(false); // Fin du chargement
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des conversations:", error);
                setLoading(false); // Fin du chargement même en cas d'erreur
            });
    }, []);

    if (loading) {
        return <p>Chargement des conversations...</p>; // Indiquer que les données sont en cours de chargement
    }

    return (
        <>
            <Nav />
            <CountMessaging />
            {chatRooms.length > 0 ? (
                chatRooms.map((chatRoom) => (
                    <CartMessaging key={chatRoom.chatRoomId} chatRoom={chatRoom} />
                ))
            ) : (
                <p>Aucune conversation disponible.</p>
            )}
            <Footer />
        </>
    );
}
