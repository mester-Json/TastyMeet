package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.ChatMessageDto;
import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.services.Interface.IChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    private IChatMessageService chatMessageService;


    @MessageMapping("/chat/{conversationId}")
    @SendTo("/topic/messages/{conversationId}")
    public ChatMessageDto sendMessage(@Payload ChatMessage chatMessage) {
        long conversationId = chatMessage.getConversation().getId();

        // Appeler le service pour traiter l'envoi du message
        ChatMessageDto chatMessageDto = chatMessageService.sendMessage(chatMessage, conversationId);
        messagingTemplate.convertAndSend("/topic/messages/" + conversationId, chatMessageDto);

        // Retourner le DTO
        return chatMessageDto;
    }

    @GetMapping("/conversation/{conversationId}/messages")
    public ResponseEntity<Map<String, Object>> getMessages(@PathVariable long conversationId) {
        // Récupérer les messages et les utilisateurs par ID de conversation
        Map<String, Object> response = chatMessageService.getMessagesByConversationId(conversationId);
        return ResponseEntity.ok(response);
    }
}