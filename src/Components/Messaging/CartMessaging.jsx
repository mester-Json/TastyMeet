import {
    MessageBar,
    Avatar,
    MessageContent,
  } from "../Messaging/CartMessaging.style.jsx";
  import { Link } from "react-router-dom";
  
  export const CartMessaging = ({ chatRoom }) => {
    const { roomUsers, messages } = chatRoom;
  
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
  
    const currentUserId = getUserIdFromToken();
    const otherUser = roomUsers.find((user) => user.id !== currentUserId);
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  
    return (
      <div>
        {/* Le Link doit inclure l'ID de la chatRoom dans l'URL */}
        <Link style={{ textDecoration: "none" }} to={`/message/${chatRoom.chatRoomId}`}>
          <MessageBar>
            <Avatar>
              <img
                src={`http://localhost:9090/api/show/${otherUser.picture.pictureName}`}
              />
            </Avatar>
            <MessageContent>
              <h4>{otherUser.firstName}</h4>
              {lastMessage ? (
                <div className="message">
                  <p>{lastMessage.content}</p>
                  <p>
                    <small>{new Date(lastMessage.dateMessage).toLocaleString()}</small>
                  </p>
                </div>
              ) : (
                <p>No messages in this room</p>
              )}
            </MessageContent>
          </MessageBar>
        </Link>
      </div>
    );
  };
  