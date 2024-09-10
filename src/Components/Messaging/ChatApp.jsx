import { useState } from 'react';
import { AppContainer, NomConversation, MessagesContainer, MessageContainer, MessageBubble, UserContainer, InputContainer, Input, Button } from './ChatApp.style.jsx';
import { Avatar, MessageContent } from '../Messaging/CartMessaging.style.jsx';

function CountMessaging() {
    //Conversation avec un autre utilisateur
    return (
        <>
            <AppContainer>
                <NomConversation>
                    Nom de la conversation
                </NomConversation>
                <MessagesContainer>
                    <UserContainer sender="user1">
                        <Avatar>
                            <img src="https://www.utopix.com/wp-content/uploads/2024/04/MjdmZjg0ZWMtNjE1OS00ZDQxLThhYzItNTg3YjQwYzc1MzVi_70f1467b-7a37-47d4-b2db-0eb0ce163b0f_profilhomme5-scaled.jpg" alt="Avatar de Jonathan" />
                        </Avatar>
                        <MessageContent>
                            <h4>Jonathan</h4>
                        </MessageContent>
                    </UserContainer>
                    <MessageContainer sender="user1">
                        <MessageBubble sender="user1">Bonjour, comment ça va ?</MessageBubble>
                    </MessageContainer>

                    <UserContainer sender="user2">
                        <Avatar>
                            <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" alt="Avatar de Jonathan" />
                        </Avatar>
                        <MessageContent>
                            <h4>Lea</h4>
                        </MessageContent>
                    </UserContainer>
                    <MessageContainer sender="user2">
                        <MessageBubble sender="user2">Ça va bien, merci ! Et toi ?</MessageBubble>
                    </MessageContainer>

                    <UserContainer sender="user1">
                        <Avatar>
                            <img src="https://www.utopix.com/wp-content/uploads/2024/04/MjdmZjg0ZWMtNjE1OS00ZDQxLThhYzItNTg3YjQwYzc1MzVi_70f1467b-7a37-47d4-b2db-0eb0ce163b0f_profilhomme5-scaled.jpg" alt="Avatar de Jonathan" />
                        </Avatar>
                        <MessageContent>
                            <h4>Jonathan</h4>
                        </MessageContent>
                    </UserContainer>
                    <MessageContainer sender="user1">
                        <MessageBubble sender="user1">Moi aussi ça va bien, merci !</MessageBubble>
                    </MessageContainer>

                    <UserContainer sender="user2">
                        <Avatar>
                            <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" alt="Avatar de Jonathan" />
                        </Avatar>
                        <MessageContent>
                            <h4>Lea</h4>
                        </MessageContent>
                    </UserContainer>
                    <MessageContainer sender="user2">
                        <MessageBubble sender="user2">Super ! On se voit bientôt ?</MessageBubble>
                    </MessageContainer>
                </MessagesContainer>
                <InputContainer>
                    <Input
                        type="text"
                        //onChange="{ }"
                        placeholder="Tapez votre message..."
                    />
                    <Button
                    //onClick={handleSendMessage}
                    >Envoyer</Button>
                </InputContainer>
            </AppContainer>
        </>
    );
}

export default CountMessaging;
