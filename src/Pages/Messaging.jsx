import { useEffect, useState } from "react";
import { Nav } from "../Components/Nav/Nav.jsx";
import { Footer } from "../Components/Footer/Footer.jsx";
import { CartMessaging } from '../Components/Messaging/CartMessaging.jsx';
import { CountMessaging } from "../Components/Messaging/CountMessaging.jsx";
import {
    fetchConversationData,
} from '../Axios/Axios.js';



import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100%;
    min-width: 60%;
`;

const Content = styled.div`
    flex: 1;
    padding: 20px;
`;

const MessageContainer = styled.div`
    max-height: 400px; 
    overflow-y: auto; 
    margin: 20px 0; 
`;

const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
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

    return (
        <MainContainer>
            <CountMessaging />
            <Content>
                <MessageContainer>
                    {conversations.map((conversation) => (
                        <CartMessaging key={conversation.id} conversation={conversation} />
                    ))}
                </MessageContainer>
            </Content>
        </MainContainer>
    );
}

export default Messaging;
