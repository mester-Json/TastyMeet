import { MessageBar, Avatar, MessageContent } from '../Messaging/CartMessaging.style.jsx';
import { Link } from 'react-router-dom';

const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
        return payload.id; // Assurez-vous que l'ID est dans le payload
    }
    return null;
};

export const CartMessaging = ({ conversation }) => {
    const currentUserId = getUserIdFromToken(); // ID de l'utilisateur connecté
    const participant = conversation.user1.id === currentUserId ? conversation.user2 : conversation.user1; // Si user1 est l'utilisateur courant, alors le participant est user2, sinon c'est user1
    const { lastMessage } = conversation;

    return (
        <div>
            <Link style={{ textDecoration: 'none' }} to={`/message/${conversation.id}`}>
                <MessageBar>
                    <Avatar>
                        <img
                            src={`https://9e97b2d83d2d0de2cc31eb56f3939262.serveo.net/api/show/${participant.id}/${participant.pictures[0]?.pictureName}`}
                            alt={`Avatar de ${participant.firstName}`}
                        />
                    </Avatar>
                    <MessageContent>
                        <h4>{participant.firstName}</h4>
                        <p>{lastMessage || "Envoyez un message à " + participant.firstName + " en premier"}</p> {/* Afficher un message par défaut s'il n'y a pas de dernier message */}
                    </MessageContent>
                </MessageBar>
            </Link>
        </div>
    );
};