import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    AppContainer,
    NomConversation,
    MessagesContainer,
    MessageContainer,
    MessageBubble,
    InputContainer,
    Input,
    Icon,
} from "./ChatApp.style.jsx";
import { Avatar, MessageContent } from "../Messaging/CartMessaging.style.jsx";
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { Client } from "@stomp/stompjs"; // Importation du client STOMP
import {
    fetchMessagesData,
    fetchProfileData,
} from '../../Axios/Axios.js';

const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.id;
    }
    return null;
};

export const ChatApp = () => {
    const formatDate = (dateArray) => {
        // Vérifier si c'est un tableau et s'il a la bonne longueur
        if (!Array.isArray(dateArray) || dateArray.length < 5) {
            console.error("dateEnvoie n'est pas un tableau valide:", dateArray);
            return ""; // Retournez une chaîne vide ou un message d'erreur
        }
        const hours = String(dateArray[3]).padStart(2, "0");
        const minutes = String(dateArray[4]).padStart(2, "0");

        return `${hours}h${minutes}`; // Format souhaité
    };

    const [messageContent, setMessageContent] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState({}); // Objet contenant les utilisateurs
    const [stompClient, setStompClient] = useState(null);
    const { conversationId } = useParams();

    // Récupération des messages et des utilisateurs


    // Connexion WebSocket avec STOMP
    const connectWebSocket = () => {
        if (stompClient) return; // Évite les connexions multiples

        const client = new Client({
            brokerURL: "ws://localhost:9090/ws",
            onConnect: (frame) => {
                client.subscribe(`/topic/messages/${conversationId}`, async (message) => {
                    const receivedMessage = JSON.parse(message.body);

                    // Récupérer l'ID de l'expéditeur
                    const senderId = receivedMessage.sender?.id; // Utiliser l'opérateur de chaîne facultatif pour éviter les erreurs

                    if (senderId > 0) {
                        // Assurez-vous que l'ID est valide
                        if (!users[senderId]) {
                            try {
                                const userData = await fetchProfileData(senderId); // Récupérer les données de l'utilisateur
                                setUsers((prevUsers) => ({
                                    ...prevUsers,
                                    [senderId]: userData,
                                }));
                            } catch (error) {
                                console.error("Erreur lors de la récupération de l'utilisateur:", error);
                            }
                        }
                    } else {
                        console.warn("L'ID de l'expéditeur est invalide :", senderId);
                    }

                    setMessages((prevMessages) => {
                        const alreadyExists = prevMessages.some(
                            (msg) =>
                                msg.content === receivedMessage.content &&
                                msg.dateEnvoie &&
                                msg.dateEnvoie[0] === receivedMessage.dateEnvoie[0]
                        );

                        // Ajoutez le message même si l'utilisateur n'est pas encore dans l'état
                        const newMessage = {
                            ...receivedMessage,
                            user: users[senderId] || { firstName: "Utilisateur Inconnu", pictures: [] }, // Ajouter des valeurs par défaut si l'utilisateur n'est pas encore chargé
                        };

                        if (!alreadyExists) {
                            return [...prevMessages, newMessage]; // Assurez-vous de renvoyer le nouveau message
                        }
                        return prevMessages;
                    });
                });
            }
            ,
            onStompError: (frame) => {
                console.error("Erreur STOMP: ", frame);
            },
            onWebSocketClose: (event) => {
                console.error(
                    "WebSocket est fermé. Code:",
                    event.code,
                    "Raison:",
                    event.reason
                );
            },
        });

        client.activate();
        setStompClient(client);
    };

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const data = await fetchMessagesData(conversationId);
                setMessages(data.messages || []); // Assurez-vous d'initialiser avec un tableau vide si undefined
                setUsers(data.users || {}); // Initialiser les utilisateurs

            } catch (error) {
                console.error('Erreur lors de la récupération des messages :', error);
            }
        };

        loadMessages();
        connectWebSocket();

        return () => {
            if (stompClient) {
                stompClient.deactivate();
                setStompClient(null); // Réinitialiser le client STOMP
            }
        };
    }, [conversationId, stompClient]);


    const handleSendMessage = () => {
        const senderId = getUserIdFromToken(); // Récupère l'ID de l'expéditeur

        if (stompClient && stompClient.connected && messageContent) {
            const chatMessage = {
                conversation: { id: conversationId },
                sender: { id: senderId }, // Assurez-vous que l'ID est correctement passé ici
                content: messageContent,
                dateEnvoie: null,
            };

            stompClient.publish({
                destination: `/app/chat/${conversationId}`,
                body: JSON.stringify(chatMessage),
            });

            setMessageContent(""); // Réinitialiser le contenu
        } else {
            console.warn("STOMP client not connected or message content is empty.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div style={{ minWidth: '90%' }}>
            <AppContainer>
                <NomConversation>Nom de la conversation</NomConversation>
                <MessagesContainer>
                    {messages.map((msg, index) => {
                        const senderId = msg.sender.id; // Récupère l'ID de l'expéditeur
                        const user = users[senderId]; // Récupérez l'utilisateur à partir de l'objet users

                        return (
                            <MessageContainer
                                key={index}
                                sender={senderId === getUserIdFromToken() ? "user1" : "user2"}
                            >
                                <Avatar>
                                    {user && user.pictures && user.pictures.length > 0 ? (
                                        <img
                                            src={`http://localhost:9090/api/show/${user.id}/${user.pictures[0].pictureName}`}
                                            alt="Avatar"
                                        />
                                    ) : (
                                        <img src="default-avatar.png" alt="Default Avatar" />
                                    )}
                                </Avatar>
                                <MessageContent>
                                    <h4>{user ? user.firstName : "Utilisateur Inconnu"}</h4>

                                    <MessageBubble
                                        sender={senderId === getUserIdFromToken() ? "user1" : "user2"}
                                    >
                                        {msg.content}
                                    </MessageBubble>
                                    <span>{formatDate(msg.dateEnvoie)}</span>
                                </MessageContent>
                            </MessageContainer>
                        );
                    })}
                </MessagesContainer>
                <InputContainer>
                    <Input
                        type="text"
                        maxLength="200"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tapez votre message..."
                    />
                    <Icon icon={faLocationArrow} onClick={handleSendMessage} />
                </InputContainer>
            </AppContainer>
        </div>
    );
};