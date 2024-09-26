package fr.tastymeet.apitastymeet.services.Interface;

import fr.tastymeet.apitastymeet.dto.ChatMessageDto;
import fr.tastymeet.apitastymeet.entities.ChatMessage;

import java.util.Map;

public interface IChatMessageService {
    ChatMessageDto sendMessage(ChatMessage chatMessage);
    Map<String, Object> getMessagesByConversationId(Long conversationId);
    String getLastMessage(Long conversationId);
}
