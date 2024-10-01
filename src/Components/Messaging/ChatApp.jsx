import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
    AppContainer, NomConversation, MessagesContainer, MessageContainer, MessageBubble,
    UserContainer, InputContainer, Input, Button, Div
} from './ChatApp.style.jsx';
import { Avatar, MessageContent } from '../Messaging/CartMessaging.style.jsx';
import { connectWebSocket, sendMessage, disconnectWebSocket } from '../../Services/websocket.js';
import { fetchMessages } from '../../Axios/Axios.js';

const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    }
    return null;
};

export const ChatApp = () => {
    const formatDate = (dateArray) => {
        if (!Array.isArray(dateArray) || dateArray.length !== 7) {
            console.error('dateEnvoie n\'est pas un tableau valide:', dateArray);
            return '';
        }

        const year = dateArray[0];
        const month = String(dateArray[1]).padStart(2, '0');
        const day = String(dateArray[2]).padStart(2, '0');
        const hours = String(dateArray[3]).padStart(2, '0');
        const minutes = String(dateArray[4]).padStart(2, '0');

        return `${hours}h${minutes}`;
    };

    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState({});
    const { conversationId } = useParams();

    const handleMessageReceived = useCallback((message) => {
        const senderId = message.sender.id;
        const currentUserId = getUserIdFromToken();

        if (senderId !== currentUserId) {
            setMessages((prevMessages) => {
                const alreadyExists = prevMessages.some((msg) =>
                    msg.content === message.content &&
                    msg.dateEnvoie[0] === message.dateEnvoie[0]
                );

                if (!alreadyExists) {
                    console.log("Ajout du message :", message);
                    return [...prevMessages, message];
                }
                console.log("Message déjà existant, pas d'ajout :", message);
                return prevMessages;
            });
        }
    }, []);

    useEffect(() => {
        connectWebSocket(conversationId, handleMessageReceived);

        return () => {
            disconnectWebSocket();
        };
    }, [conversationId, handleMessageReceived]);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const data = await fetchMessages(conversationId);
                setMessages(data.messages);
                setUsers(data.users);
            } catch (error) {
                console.error('Erreur lors de la récupération des messages :', error);
            }
        };
        loadMessages();
    }, [conversationId]);

    const handleSendMessage = () => {
        const senderId = getUserIdFromToken();
        if (messageContent) {
            const chatMessage = {
                conversation: { id: conversationId },
                sender: { id: senderId },
                content: messageContent,
                dateEnvoie: null,
            };

            setMessages((prevMessages) => [...prevMessages, chatMessage]);

            console.log("Envoi du message :", chatMessage);
            sendMessage(conversationId, chatMessage);
            setMessageContent('');
        } else {
            console.warn("Le contenu du message est vide.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Div>
            <AppContainer>
                <NomConversation>Nom de la conversation</NomConversation>
                <MessagesContainer>
                    {messages.map((msg, index) => {
                        const senderId = msg.sender.id;
                        const user = users[senderId];

                        return (
                            <MessageContainer key={index} sender={senderId === getUserIdFromToken() ? "user1" : "user2"}>
                                <UserContainer sender={senderId === getUserIdFromToken() ? "user1" : "user2"}>
                                    <Avatar>
                                        {user && user.pictures && user.pictures.length > 0 ? (
                                            <img src={`http://localhost:9090/api/show/${user.pictures[0].pictureName}`} alt="Avatar" />
                                        ) : (
                                            <img src="default-avatar.png" alt="Default Avatar" />
                                        )}
                                    </Avatar>
                                    <MessageContent>
                                        <h4>{user ? user.firstName : 'Utilisateur Inconnu'}</h4>
                                        <span>{formatDate(msg.dateEnvoie)}</span>
                                    </MessageContent>
                                </UserContainer>
                                <MessageBubble sender={senderId === getUserIdFromToken() ? "user1" : "user2"}>
                                    {msg.content}
                                </MessageBubble>
                            </MessageContainer>
                        );
                    })}
                </MessagesContainer>
                <InputContainer>
                    <Input
                        type="text"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tapez votre message..."
                    />
                    <Button onClick={handleSendMessage}>Envoyer</Button>
                </InputContainer>
            </AppContainer>
        </Div>
    );
};
