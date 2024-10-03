package fr.tastymeet.apitastymeet.services.Impl;

import fr.tastymeet.apitastymeet.dto.ConversationDto;
import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.entities.Conversation;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.ConversationRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.services.Interface.IConversationService;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationServiceImpl implements IConversationService {


    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserRepository userRepository;

    public void createConversation(long userId1, long userId2) {
        User user1 = userRepository.findById(userId1).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec ID: " + userId1));
        User user2 = userRepository.findById(userId2).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec ID: " + userId2));
        Conversation conversation = new Conversation(user1, user2);
        conversationRepository.save(conversation);
    }

    public List<ConversationDto> getConversationsByUserId(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec ID: " + userId));

        // Récupérer les conversations
        List<Conversation> conversations = conversationRepository.findByUser1OrUser2(user, user);

        // Mapper les conversations vers des ConversationDto et récupérer le dernier message
        List<ConversationDto> conversationDtos = conversations.stream()
                .map(conversation -> {
                    ConversationDto dto = DtoTool.convert(conversation, ConversationDto.class);
                    ChatMessage lastMessage = conversation.getLastMessage();
                    dto.setLastMessage(lastMessage != null ? lastMessage.getContent() : null); // Contenu du dernier message
                    dto.setDateLastMessage(lastMessage != null ? lastMessage.getDateEnvoie() : null); // Date du dernier message
                    return dto;
                })
                .collect(Collectors.toList());

        // Trier les ConversationDto par date d'envoi des derniers messages, du plus récent au plus ancien
        return conversationDtos.stream()
                .sorted(Comparator.comparing(ConversationDto::getDateLastMessage, Comparator.nullsLast(Comparator.reverseOrder()))) // Comparator.nullsLast peremet de gérer les valeurs null
                .collect(Collectors.toList());
    }

}
