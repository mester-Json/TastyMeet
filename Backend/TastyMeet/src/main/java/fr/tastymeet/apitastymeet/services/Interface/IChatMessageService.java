package fr.tastymeet.apitastymeet.services.Interface;

import fr.tastymeet.apitastymeet.dto.ChatMessageDto;
import fr.tastymeet.apitastymeet.entities.ChatMessage;

import java.util.Map;

public interface IChatMessageService {
    ChatMessageDto sendMessage(ChatMessage chatMessage, long conversationId);
    Map<String, Object> getMessagesByConversationId(long conversationId);

}
