package fr.tastymeet.apitastymeet.services.Interface;

import fr.tastymeet.apitastymeet.dto.ConversationDto;

import java.util.List;

public interface IConversationService {
    List<ConversationDto> getConversationsByUserId(Long userId);
    void createConversation(long userId1, long userId2);
}
