import { useEffect, useState } from "react";
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
            <Footer />
        </>
    );
}
