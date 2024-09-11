import { useState } from 'react';
import { MessageBar, Avatar, MessageContent } from '../Messaging/CartMessaging.style.jsx';

function CartMessaging() {

    //Message reçu avec l'image de la personne, prenom et une partie du message reçu 
    return (
        <>
            <div>
                <a style={{ textDecoration: 'none' }} href="http://localhost:5173/Message"><MessageBar>
                    <Avatar>
                        <img src="https://www.utopix.com/wp-content/uploads/2024/04/MjdmZjg0ZWMtNjE1OS00ZDQxLThhYzItNTg3YjQwYzc1MzVi_70f1467b-7a37-47d4-b2db-0eb0ce163b0f_profilhomme5-scaled.jpg" alt="Avatar de Jonathan" />
                    </Avatar>
                    <MessageContent>
                        <h4>Jonathan</h4>
                        <p>Salut je t'ai envoyé un message, ouvre le ....</p>
                    </MessageContent>
                </MessageBar>
                </a>
            </div>
        </>
    );
}

export default CartMessaging;
