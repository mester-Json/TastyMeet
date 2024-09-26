package fr.tastymeet.apitastymeet.dto;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class ChatMessageDto {
    private long chatId;
    //private UserChatDto senderUser; // seulement id du user sender
    private long senderUserId;
    private String content;
    private LocalDateTime dateMessage = LocalDateTime.now();
    //private ChatRoomDto room; // seulement id du room
    private long roomId; // Pas besoin c'est déjà les message de la room
}
