package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.ConversationDto;
import fr.tastymeet.apitastymeet.entities.Conversation;
import fr.tastymeet.apitastymeet.services.ConversationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    @Autowired
    private ConversationServiceImpl conversationService;



    // Endpoint pour récupérer les conversations d'un utilisateur
    @GetMapping("/{userId}")
    public ResponseEntity<List<ConversationDto>> getConversations(@PathVariable Long userId) {
        List<ConversationDto> conversations = conversationService.getConversationsByUserId(userId);
        return ResponseEntity.ok(conversations);
    }
}
