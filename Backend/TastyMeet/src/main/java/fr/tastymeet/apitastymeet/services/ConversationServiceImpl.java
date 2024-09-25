package fr.tastymeet.apitastymeet.services;

import fr.tastymeet.apitastymeet.dto.ConversationDto;
import fr.tastymeet.apitastymeet.dto.UserChatDto;
import fr.tastymeet.apitastymeet.entities.Conversation;
import fr.tastymeet.apitastymeet.repositories.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ConversationServiceImpl {


    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserServiceImpl userService; // Service pour obtenir les détails des utilisateurs

    @Autowired
    private ChatMessageService messageService; // Service pour obtenir les messages d'une conversation

    // Crée une nouvelle conversation entre deux utilisateurs
    public void createConversation(long userId1, long userId2) {
        Conversation conversation = new Conversation(userId1, userId2);
        conversationRepository.save(conversation);
        System.out.println("Conversation créée entre " + userId1 + " et " + userId2);
    }

    // Récupère toutes les conversations pour un utilisateur donné et les convertit en DTO
    public List<ConversationDto> getConversationsByUserId(Long userId) {
        List<Conversation> conversations = conversationRepository.findByUserId1OrUserId2(userId, userId);

        // Passer le currentUserId dans la méthode map
        return conversations.stream()
                .map(conversation -> convertToDto(conversation, userId)) // Correction ici
                .collect(Collectors.toList());
    }

    // Convertit une entité Conversation en ConversationDto
    private ConversationDto convertToDto(Conversation conversation, Long currentUserId) {
        // Obtenir l'autre participant
        Long participantId = conversation.getUserId1().equals(currentUserId)
                ? conversation.getUserId2()
                : conversation.getUserId1();

        // Obtenir les détails du participant
        UserChatDto participant = userService.getUserDetails(participantId);

        // Obtenir le dernier message (cette méthode doit être implémentée dans MessageService)
        String lastMessage = messageService.getLastMessage(conversation.getId());

        // Créer le DTO
        ConversationDto dto = new ConversationDto();
        dto.setId(conversation.getId());
        dto.setUserId1(conversation.getUserId1());
        dto.setUserId2(conversation.getUserId2());
        dto.setLastMessage(lastMessage);
        dto.setParticipant(participant);

        return dto;
    }


}
