import { MessageBar, Avatar, MessageContent } from '../Messaging/CartMessaging.style.jsx';

// const getUserIdFromToken = () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
//         return payload.id; // Assurez-vous que l'ID est dans le payload
//     }
//     return null;
// };
export const CartMessaging = ({ conversation }) => {
    const { participant, lastMessage } = conversation;

    return (
        <div>
            <a style={{ textDecoration: 'none' }} href={`http://localhost:5173/Message`}>
                <MessageBar>
                    <Avatar>
                        <img src={`http://localhost:9090/api/show/${participant.pictures[0].pictureName}`} alt={`Avatar de ${participant.firstName}`} />
                    </Avatar>
                    <MessageContent>
                        <h4>{participant.firstName}</h4>
                        <p>{lastMessage}</p>
                    </MessageContent>
                </MessageBar>
            </a>
        </div>
    );
};