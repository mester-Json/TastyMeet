package fr.tastymeet.apitastymeet.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data // Génère des getters, setters, toString, equals, et hashCode
public class ConversationDto {
    private long id;
    private UserChatDto user1;
    private UserChatDto user2;
    private String lastMessage; // Dernier message
    private LocalDateTime dateLastMessage; // Date du dernier message
}