import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AppContainer,
  NomConversation,
  MessagesContainer,
  MessageContainer,
  MessageBubble,
  UserContainer,
  InputContainer,
  Input,
  Button,
} from "./ChatApp.style.jsx";
import { Avatar, MessageContent } from "../Messaging/CartMessaging.style.jsx";
import { Client } from "@stomp/stompjs"; // Importation du client STOMP

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  }
  return null;
};

export const ChatApp = () => {
  const { chatRoomId } = useParams(); // je récupère l'id de la Room dans le useParams
  const [chatRoomData, setChatRoomData] = useState(null); // État pour stocker les données de la salle de discussion
  const [otherUser, setOtherUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [roomUsers, setRoomUsers] = useState({}); // État pour stocker les utilisateurs
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.id;
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
      }
    }
    return null;
  };
  // Grace a ce fetch je récupere l'intégralité des information se trouvant dans la chatRoom (les UserChatDto et les messages)
  const fetchMessages = () => {
    fetch(`http://localhost:9090/api/messages/chatroom/${chatRoomId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des messages");
        }
        return response.json();
      })
      .then((data) => {
        setChatRoomData(data); // Stockez les données de la salle
        setMessages(data.messages); // Stockez les messages
        setRoomUsers(data.roomUsers); // Stockez les utilisateurs
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des messages :", error);
      });
  };

  useEffect(() => {
    fetchMessages(); // J'appel la méthode pour récupérer les données de la chatRoom
  }, [chatRoomId]);

  // Le user actuel qui est connecté
  const currentUserId = getUserIdFromToken();
  // l'autre user si les donnée RoomUser sont pas null
  /*if(chatRoomData){
        setOtherUser(chatRoomData.roomUsers.find((user) => user.id !== currentUserId));
        setCurrentUser(chatRoomData.roomUsers.find((user) => user.id == currentUserId));
    }*/

  useEffect(() => {
    if (chatRoomData) {
      const user = chatRoomData.roomUsers.find(
        (user) => user.id !== currentUserId
      );
      const currentUser = chatRoomData.roomUsers.find(
        (user) => user.id === currentUserId
      );
      setOtherUser(user || {}); // Si aucun utilisateur trouvé, définir sur un objet vide
      setCurrentUser(currentUser || {}); // Pareil pour le currentUser
    }
  }, [chatRoomData, currentUserId]);

  /*const formatDate = (dateArray) => {
    // Vérifiez si dateArray est bien un tableau et a la longueur attendue

    if (!Array.isArray(dateArray) || dateArray.length !== 7) {
      console.error("dateEnvoie n'est pas un tableau valide:", dateArray);
      return ""; // Retournez une chaîne vide ou un message d'erreur
    }

    // Récupération des éléments du tableau
    const year = dateArray[0]; // Année
    const month = String(dateArray[1]).padStart(2, "0"); // Mois (avec zéro devant si nécessaire)
    const day = String(dateArray[2]).padStart(2, "0"); // Jour (avec zéro devant si nécessaire)
    const hours = String(dateArray[3]).padStart(2, "0"); // Heures (avec zéro devant si nécessaire)
    const minutes = String(dateArray[4]).padStart(2, "0"); // Minutes (avec zéro devant si nécessaire)

    // Retournez la date formatée
    return `${day}-${month}-${year} ${hours}h${minutes}`;
  };*/

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mois est basé sur un index 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const connectWebSocket = () => {
    if (stompClient) return; // Évite les connexions multiples

    const client = new Client({
      brokerURL: "ws://localhost:9090/ws",

      onConnect: (frame) => {
        console.log("Connecté: " + frame);

        // Abonnement au topic
        client.subscribe(`/topic/sendMessage/${chatRoomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);

          // Ajout d'un message
          setMessages((prevMessages) => {
            const alreadyExists = prevMessages.some(
              (msg) =>
                msg.content === receivedMessage.content &&
                msg.dateMessage ===
                receivedMessage.dateMessage
            );

            if (!alreadyExists) {
              console.log("Ajout du message :", receivedMessage);
              return [...prevMessages, receivedMessage];
            }
            console.log(
              "Message déjà existant, pas d'ajout :",
              receivedMessage
            );
            return prevMessages;
          });
        });
      },
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

  // Fonction pour récupérer les informations d'un utilisateur

  useEffect(() => {
    if (!stompClient) {
      console.log("Connexion WebSocket en cours...");
      fetchMessages();
      connectWebSocket();
    } else {
      console.log("WebSocket déjà connecté.");
    }

    return () => {
      if (stompClient) {
        console.log("Déconnexion du WebSocket...");
        stompClient.deactivate(); // Déconnexion propre lors de la désactivation du composant
        setStompClient(null); // Réinitialisez le client STOMP
      }
    };
  }, [stompClient]);

  const handleSendMessage = () => {
    if (stompClient && stompClient.connected && messageContent) {
      const chatMessage = {
        roomId: chatRoomId, // Utiliser directement l'ID de la conversation
        senderUserId: currentUserId, // Assurez-vous que cela retourne bien l'ID de l'utilisateur
        content: messageContent,
        dateMessage: new Date().toISOString().slice(0, 19), // Ajout de la date actuelle
      };

      stompClient.publish({
        destination: `/app/message/${chatRoomId}`, // C'est bien la route du @MessageMapping
        body: JSON.stringify(chatMessage),
      });

      setMessageContent(""); // Réinitialiser le contenu sans ajouter localement le message
    } else {
      console.warn("STOMP client not connected or message content is empty.");
    }
  };

  return (
    <AppContainer>
      <NomConversation>
        {otherUser ? otherUser.firstName : "Utilisateur inconnu"}
      </NomConversation>
      <MessagesContainer>
        {messages.map((msg, index) => {
          const messageSender = chatRoomData.roomUsers.find(
            (user) => user.id === msg.senderUserId
          );
  
          return (
            <MessageContainer
              key={index}
              sender={msg.senderUserId === getUserIdFromToken() ? "user1" : "user2"}
            >
              <Avatar>
                <img
                  src={`http://localhost:9090/api/show/${messageSender.picture.pictureName}`}
                  alt={messageSender.firstName}
                />
              </Avatar>
              <MessageContent>
                <h4>{messageSender.firstName}</h4>
                <MessageBubble
                  sender={msg.senderUserId === getUserIdFromToken() ? "user1" : "user2"}
                >
                  {msg.content}
                </MessageBubble>
                <p className="date">{msg.dateMessage}</p>
              </MessageContent>
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
