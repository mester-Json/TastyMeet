package fr.tastymeet.apitastymeet.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatMessageDto {
    private Long senderId;
    private String content;
    private UserChatDto sender;
    private LocalDateTime dateEnvoie;
}
