package fr.tastymeet.apitastymeet.services.Impl;

import fr.tastymeet.apitastymeet.dto.ConversationDto;
import fr.tastymeet.apitastymeet.dto.UserChatDto;
import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.entities.Conversation;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.ConversationRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.services.Interface.IConversationService;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationServiceImpl implements IConversationService {


    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatMessageServiceImpl messageService;


    public void createConversation(long userId1, long userId2) {
        User user1 = userRepository.findById(userId1).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec ID: " + userId1));
        User user2 = userRepository.findById(userId2).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec ID: " + userId2));
        Conversation conversation = new Conversation(user1, user2);
        conversationRepository.save(conversation);
        System.out.println("Conversation créée entre " + userId1 + " et " + userId2);
    }

    public List<ConversationDto> getConversationsByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec ID: " + userId));
        return conversationRepository.findByUser1OrUser2(user, user)
                .stream()
                .map(conversation -> {
                    ConversationDto dto = DtoTool.convert(conversation, ConversationDto.class);
                    ChatMessage lastMessage = conversation.getLastMessage();
                    dto.setLastMessage(lastMessage != null ? lastMessage.getContent() : null); // Assurez-vous que getContent() retourne le texte du message
                    return dto;
                })
                .collect(Collectors.toList());
    }

}
