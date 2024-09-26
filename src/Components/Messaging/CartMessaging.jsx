// CartMessaging.jsx

export const CartMessaging = ({ chatRoom }) => {
    const { chatRoomId, roomUsers, messages } = chatRoom;

    return (
        <div className="chat-room">
            <h2>Room ID: {chatRoomId}</h2>
            <div className="room-users">
                <h3>Users in this room:</h3>
                {roomUsers.length > 0 ? (
                    roomUsers.map(user => (
                        <div key={user.id} className="user">
                            <img 
                                src={`http://localhost:9090/images/${user.picture.pictureName}`} 
                                alt={user.firstName} 
                                width={50} 
                                height={50}
                            />
                            <p>{user.firstName}</p>
                        </div>
                    ))
                ) : (
                    <p>No users in this room</p>
                )}
            </div>
            
            <div className="room-messages">
                <h3>Messages:</h3>
                {messages.length > 0 ? (
                    messages.map(message => (
                        <div key={message.chatId} className="message">
                            <p><strong>User {message.senderUserId}:</strong> {message.content}</p>
                            <p><small>{new Date(message.dateMessage).toLocaleString()}</small></p>
                        </div>
                    ))
                ) : (
                    <p>No messages in this room</p>
                )}
            </div>
        </div>
    );
};
