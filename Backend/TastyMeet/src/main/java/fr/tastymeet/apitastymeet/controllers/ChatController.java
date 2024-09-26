package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.ChatMessageDto;
import fr.tastymeet.apitastymeet.dto.UserChatDto;
import fr.tastymeet.apitastymeet.dto.UserDto;
import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.services.Interface.IChatMessageService;
import fr.tastymeet.apitastymeet.services.Interface.IPictureService;
import fr.tastymeet.apitastymeet.services.Interface.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    private IChatMessageService chatMessageService;
    @Autowired
    private IUserService userService;

    @Autowired
    private IPictureService pictureService;


    @MessageMapping("/chat/{conversationId}")
    @SendTo("/topic/messages/{conversationId}")
    public ChatMessageDto sendMessage(@Payload ChatMessage chatMessage) {

        Long conversationId = chatMessage.getConversation().getId();

        // Initialiser la date d'envoi si elle est nulle
        if (chatMessage.getDateEnvoie() == null) {
            chatMessage.setDateEnvoie(LocalDateTime.now());
        }

        // Formatage de la date (facultatif)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        String formattedDate = chatMessage.getDateEnvoie().format(formatter);
        System.out.println("Date formatée : " + formattedDate);

        // Récupérer l'utilisateur en fonction de senderId
        UserDto user = userService.getById(chatMessage.getSenderId());
        UserChatDto userChatDto = new UserChatDto();
        userChatDto.setFirstName(user.getFirstName());
        userChatDto.setPictures(pictureService.getPictureByUserId(user.getId())); // ou une méthode pour obtenir les images

        // Créer un DTO de message avec l'utilisateur
        ChatMessageDto chatMessageDto = new ChatMessageDto();
        chatMessageDto.setSenderId(chatMessage.getSenderId());
        chatMessageDto.setContent(chatMessage.getContent());
        chatMessageDto.setSender(userChatDto);
        chatMessageDto.setDateEnvoie(chatMessage.getDateEnvoie());

        // Appeler le service pour envoyer le message et obtenir le DTO
        chatMessageService.sendMessage(chatMessage);

        // Envoyer le message au topic
        messagingTemplate.convertAndSend("/topic/messages/" + conversationId, chatMessageDto);

        // Retourner le DTO
        return chatMessageDto;
    }

    @PostMapping("/testChat")
    public ResponseEntity<String> testChat(@RequestBody ChatMessage chatMessage) {
        sendMessage(chatMessage); // Appel direct de la méthode pour test
        return ResponseEntity.ok("Message sent");
    }
    @GetMapping("/conversation/{conversationId}/messages")
    public ResponseEntity<Map<String, Object>> getMessages(@PathVariable Long conversationId) {
        // Récupérer les messages et les utilisateurs par ID de conversation
        Map<String, Object> response = chatMessageService.getMessagesByConversationId(conversationId);
        return ResponseEntity.ok(response);
    }
}