import { MessageBar, Avatar, MessageContent, LinkStyle, Div } from '../Messaging/CartMessaging.style.jsx';

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

        <Div>
            <LinkStyle to={`/message/${conversation.id}`}>
                <MessageBar>
                    <Avatar>
                        <img
                            src={`http://localhost:9090/api/show/${participant.pictures[0]?.pictureName}`}
                            alt={`Avatar de ${participant.firstName}`}
                        />
                    </Avatar>
                    <MessageContent>
                        <h4>{participant.firstName}</h4>
                        <p>{lastMessage || "Envoyez un message à " + participant.firstName + " en premier"}</p> {/* Afficher un message par défaut s'il n'y a pas de dernier message */}
                    </MessageContent>
                </MessageBar>
            </LinkStyle>
        </Div>
    );
};