import { useState } from 'react';
import { CountText } from './CountMessaging.style.jsx';

export const CountMessaging = ({ chatRoom }) => {
    // Vérifiez que `chatRoom` est bien un tableau ou une liste d'objets
    const roomCount = chatRoom ? chatRoom.length : 0; // Si `chatRoom` est null ou undefined, mettez 0

    return (
        <div>
            <CountText>
                {roomCount} Conversation{roomCount > 1 ? 's' : ''} {/* Afficher un pluriel si nécessaire */}
            </CountText>
        </div>
    );
};

