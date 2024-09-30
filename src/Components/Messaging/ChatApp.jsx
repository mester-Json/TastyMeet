import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    AppContainer, NomConversation, MessagesContainer, MessageContainer, MessageBubble,
    UserContainer, InputContainer, Input, Button
} from './ChatApp.style.jsx';
import { Avatar, MessageContent } from '../Messaging/CartMessaging.style.jsx';
import { Client } from '@stomp/stompjs'; // Importation du client STOMP

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
            return ''; // Retournez une chaîne vide ou un message d'erreur
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
    const [users, setUsers] = useState({}); // Objet contenant les utilisateurs
    const [stompClient, setStompClient] = useState(null);
    const { conversationId } = useParams();

    // Récupération des messages et des utilisateurs
    const fetchMessages = () => {
        fetch(`http://localhost:9090/conversation/${conversationId}/messages`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des messages');
                }
                return response.json();
            })
            .then(data => {
                setMessages(data.messages); // Stocker les messages
                setUsers(data.users); // Stocker les utilisateurs dans l'état
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des messages :', error);
            });
    };

    // Connexion WebSocket avec STOMP
    const connectWebSocket = () => {
        if (stompClient) return; // Évite les connexions multiples

        const client = new Client({
            brokerURL: 'ws://localhost:9090/ws',
            onConnect: (frame) => {
                console.log('Connecté: ' + frame);
                client.subscribe(`/topic/messages/${conversationId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log("Message reçu :", receivedMessage);

                    // Récupérer l'ID de l'expéditeur
                    const senderId = receivedMessage.sender?.id; // Utiliser l'opérateur de chaîne facultatif pour éviter les erreurs
                    console.log("Sender ID récupéré :", senderId); // Log de l'ID pour débogage



                    // Récupérer l'ID de l'expéditeur
                    if (senderId > 0) { // Assurez-vous que l'ID est valide
                        if (!users[senderId]) {
                            fetch(`http://localhost:9090/api/profile/${senderId}`)
                                .then(response => response.json())
                                .then(userData => {
                                    setUsers(prevUsers => ({
                                        ...prevUsers,
                                        [senderId]: userData,
                                    }));
                                })
                                .catch(error => console.error('Erreur lors de la récupération de l\'utilisateur:', error));
                        }
                    } else {
                        console.warn("L'ID de l'expéditeur est invalide :", senderId);
                    }

                    setMessages((prevMessages) => {
                        const alreadyExists = prevMessages.some((msg) =>
                            msg.content === receivedMessage.content &&
                            msg.dateEnvoie &&
                            msg.dateEnvoie[0] === receivedMessage.dateEnvoie[0]
                        );

                        if (!alreadyExists) {
                            console.log("Ajout du message :", receivedMessage);
                            return [...prevMessages, receivedMessage];
                        }
                        console.log("Message déjà existant, pas d'ajout :", receivedMessage);
                        return prevMessages;
                    });
                });
            },
            onStompError: (frame) => {
                console.error('Erreur STOMP: ', frame);
            },
            onWebSocketClose: (event) => {
                console.error('WebSocket est fermé. Code:', event.code, 'Raison:', event.reason);
            }
        });

        client.activate();
        setStompClient(client);
    };

    useEffect(() => {
        if (!stompClient) {
            console.log('Connexion WebSocket en cours...');
            fetchMessages();
            connectWebSocket();
        } else {
            console.log('WebSocket déjà connecté.');
        }

        return () => {
            if (stompClient) {
                console.log('Déconnexion du WebSocket...');
                stompClient.deactivate();
                setStompClient(null); // Réinitialiser le client STOMP
            }
        };
    }, [stompClient, conversationId]);

    const handleSendMessage = () => {
        const senderId = getUserIdFromToken(); // Récupère l'ID de l'expéditeur
        console.log("ID de l'expéditeur :", senderId); // Log de l'ID pour débogage

        if (stompClient && stompClient.connected && messageContent) {
            const chatMessage = {
                conversation: { id: conversationId },
                sender: { id: senderId }, // Assurez-vous que l'ID est correctement passé ici
                content: messageContent,
                dateEnvoie: null,
            };

            console.log("Envoi du message :", chatMessage); // Log du message avant envoi

            stompClient.publish({
                destination: `/app/chat/${conversationId}`,
                body: JSON.stringify(chatMessage),
            });

            setMessageContent(''); // Réinitialiser le contenu
        } else {
            console.warn("STOMP client not connected or message content is empty.");
        }
    };




    return (
        <AppContainer>
            <NomConversation>Nom de la conversation</NomConversation>
            <MessagesContainer>
                {messages.map((msg, index) => {
                    const senderId = msg.sender.id; // Récupère l'ID de l'expéditeur
                    const user = users[senderId]; // Récupérez l'utilisateur à partir de l'objet users

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
                    placeholder="Tapez votre message..."
                />
                <Button onClick={handleSendMessage}>Envoyer</Button>
            </InputContainer>
        </AppContainer>
    );
};