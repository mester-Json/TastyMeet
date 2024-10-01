import { useEffect, useState } from "react";
import { Nav } from "../Components/Nav/Nav.jsx";
import { Footer } from "../Components/Footer/Footer.jsx";
import { CartMessaging } from '../Components/Messaging/CartMessaging.jsx';
import { CountMessaging } from "../Components/Messaging/CountMessaging.jsx";
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
`;

const Content = styled.div`
    flex: 1; 
    padding: 20px; 
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
        <MainContainer>
            <Nav />
            <CountMessaging />
            <Content>
                {conversations.map((conversation) => (
                    <CartMessaging key={conversation.id} conversation={conversation} />
                ))}
            </Content>
            <Footer />
        </MainContainer>
    );
}

export default Messaging;
