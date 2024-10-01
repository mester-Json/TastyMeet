package fr.tastymeet.apitastymeet.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {
    private long id;
    private UserChatDto sender;
    private String content;
    private LocalDateTime dateEnvoie;
}
