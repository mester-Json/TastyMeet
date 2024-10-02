import { useEffect, useState } from "react";
import { Nav } from "../Components/Nav/Nav.jsx";
import { Footer } from "../Components/Footer/Footer.jsx";
import { CartMessaging } from '../Components/Messaging/CartMessaging.jsx';
import { CountMessaging } from "../Components/Messaging/CountMessaging.jsx";

import {
    fetchConversationData,
} from '../Axios/Axios.js';

const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
        return payload.id; // Assurez-vous que l'ID est dans le payload
    }
    return null;
};

function Messaging() {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const userId = getUserIdFromToken();
                const data = await fetchConversationData(userId);
                if (data) {
                    setConversations(data);
                } else {
                    setError({ fetch: 'Une erreur est survenue lors de la récupération des données.' });
                }
            } catch (error) {
                setError({ fetch: 'Une erreur est survenue lors de la récupération des données.' });
            }

        };

        fetchConversation();
    }, []);


    // useEffect(() => {
    //     const userId = getUserIdFromToken();
    //     fetch(`http://localhost:9090/api/conversations/${userId}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setConversations(data);
    //         })
    //         .catch(error => {
    //             console.error("Erreur lors de la récupération des conversations:", error);
    //         });
    // }, []);

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
export default Messaging