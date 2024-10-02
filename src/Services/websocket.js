
import { Client } from '@stomp/stompjs';

let stompClient = null;

export const connectWebSocket = (conversationId, onMessageReceived) => {
    if (stompClient) return;

    stompClient = new Client({
        brokerURL: 'ws://localhost:9090/ws',
        onConnect: (frame) => {
            console.log('Connecté: ' + frame);
            stompClient.subscribe(`/topic/messages/${conversationId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                console.log("Message reçu :", receivedMessage);
                onMessageReceived(receivedMessage);
            });
        },
        onStompError: (frame) => {
            console.error('Erreur STOMP: ', frame);
        },
        onWebSocketClose: (event) => {
            console.error('WebSocket est fermé. Code:', event.code, 'Raison:', event.reason);
        }
    });

    stompClient.activate();
};

export const sendMessage = (conversationId, chatMessage) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: `/app/chat/${conversationId}`,
            body: JSON.stringify(chatMessage),
        });
    } else {
        console.warn("STOMP client not connected.");
    }
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
    }
};
