package fr.tastymeet.apitastymeet.services.Impl;

import fr.tastymeet.apitastymeet.dto.ConversationDto;
import fr.tastymeet.apitastymeet.dto.UserChatDto;
import fr.tastymeet.apitastymeet.entities.Conversation;
import fr.tastymeet.apitastymeet.repositories.ConversationRepository;
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
    private UserServiceImpl userService;

    @Autowired
    private ChatMessageServiceImpl messageService;


    public void createConversation(long userId1, long userId2) {
        Conversation conversation = new Conversation(userId1, userId2);
        conversationRepository.save(conversation);
        System.out.println("Conversation créée entre " + userId1 + " et " + userId2);
    }


    public List<ConversationDto> getConversationsByUserId(Long userId) {
        return conversationRepository.findByUserId1OrUserId2(userId, userId)
                .stream()
                .map(conversation -> convertToDto(conversation, userId))
                .collect(Collectors.toList());
    }


    private ConversationDto convertToDto(Conversation conversation, Long currentUserId) {
        Long participantId = getParticipantId(conversation, currentUserId);
        UserChatDto participant = userService.getUserDetails(participantId);
        String lastMessage = messageService.getLastMessage(conversation.getId());

        // Utiliser DtoTool pour créer le DTO
        ConversationDto dto = DtoTool.convert(conversation, ConversationDto.class);
        dto.setLastMessage(lastMessage);
        dto.setParticipant(participant);

        return dto;
    }
    private Long getParticipantId(Conversation conversation, Long currentUserId) {
        return conversation.getUserId1().equals(currentUserId)
                ? conversation.getUserId2()
                : conversation.getUserId1();
    }

}
