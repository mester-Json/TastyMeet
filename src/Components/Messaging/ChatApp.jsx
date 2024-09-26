import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContainer, NomConversation, MessagesContainer, MessageContainer, MessageBubble, UserContainer, InputContainer, Input, Button } from './ChatApp.style.jsx';
import { Avatar, MessageContent } from '../Messaging/CartMessaging.style.jsx';
import { Client } from '@stomp/stompjs'; // Importation du client STOMP

const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    }
    return null;
};



export const ChatApp = () => {
    const formatDate = (dateArray) => {
        // Vérifiez si dateArray est bien un tableau et a la longueur attendue

        if (!Array.isArray(dateArray) || dateArray.length !== 7) {
            console.error('dateEnvoie n\'est pas un tableau valide:', dateArray);
            return ''; // Retournez une chaîne vide ou un message d'erreur
        }

        // Récupération des éléments du tableau
        const year = dateArray[0]; // Année
        const month = String(dateArray[1]).padStart(2, '0'); // Mois (avec zéro devant si nécessaire)
        const day = String(dateArray[2]).padStart(2, '0'); // Jour (avec zéro devant si nécessaire)
        const hours = String(dateArray[3]).padStart(2, '0'); // Heures (avec zéro devant si nécessaire)
        const minutes = String(dateArray[4]).padStart(2, '0'); // Minutes (avec zéro devant si nécessaire)

        // Retournez la date formatée
        return `${day}-${month}-${year} ${hours}h${minutes}`;
    };





    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState({}); // État pour stocker les utilisateurs
    const [stompClient, setStompClient] = useState(null);
    const { conversationId } = useParams();


    const fetchMessages = () => {
        fetch(`http://localhost:9090/conversation/${conversationId}/messages`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des messages');
                }
                return response.json();
            })
            .then(data => {
                setMessages(data.messages); // Stockez les messages
                setUsers(data.users); // Stockez les utilisateurs
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des messages :', error);
            });
    };

    const connectWebSocket = () => {
        if (stompClient) return; // Évite les connexions multiples

        const client = new Client({
            brokerURL: 'ws://localhost:9090/ws',

            onConnect: (frame) => {
                console.log('Connecté: ' + frame);

                // Abonnement au topic
                client.subscribe(`/topic/messages/${conversationId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log("Message reçu :", receivedMessage);



                    // Ajout d'un message
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

    // Fonction pour récupérer les informations d'un utilisateur



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
                stompClient.deactivate(); // Déconnexion propre lors de la désactivation du composant
                setStompClient(null); // Réinitialisez le client STOMP
            }
        };
    }, [stompClient]);


    const handleSendMessage = () => {
        if (stompClient && stompClient.connected && messageContent) {
            const chatMessage = {
                conversation: { id: conversationId },
                senderId: getUserIdFromToken(),
                content: messageContent,
            };

            console.log("Envoi du message :", chatMessage); // Log du message avant envoi

            stompClient.publish({
                destination: `/app/chat/${conversationId}`,
                body: JSON.stringify(chatMessage),
            });

            setMessageContent(''); // Réinitialiser le contenu sans ajouter localement le message
        } else {
            console.warn("STOMP client not connected or message content is empty.");
        }
    };


    return (
        <AppContainer>
            <NomConversation>Nom de la conversation</NomConversation>
            <MessagesContainer>
                {messages.map((msg, index) => {
                    const user = users[msg.senderId]; // Récupérez l'utilisateur à partir de l'objet users

                    return (
                        <MessageContainer key={index} sender={msg.senderId === getUserIdFromToken() ? "user1" : "user2"}>
                            <UserContainer sender={msg.senderId === getUserIdFromToken() ? "user1" : "user2"}>
                                <Avatar>
                                    {/* Vérifiez si l'utilisateur existe et a des images */}
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
                            <MessageBubble sender={msg.senderId === getUserIdFromToken() ? "user1" : "user2"}>
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
