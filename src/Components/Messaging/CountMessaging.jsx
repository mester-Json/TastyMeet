import { useState } from 'react';
import { CountText } from './CountMessaging.style.jsx';

function CountMessaging() {

    //Nombre de nouveau message reçu

    return (
        <>
            <div>
                <CountText>
                    26 Nouveaux messages
                </CountText>
            </div>
        </>
    );
}

export default CountMessaging;
