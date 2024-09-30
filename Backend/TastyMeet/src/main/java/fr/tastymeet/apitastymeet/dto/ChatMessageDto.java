package fr.tastymeet.apitastymeet.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateMessage = LocalDateTime.now();
    //private ChatRoomDto room; // seulement id du room
    private long roomId; // Pas besoin c'est déjà les message de la room
}
