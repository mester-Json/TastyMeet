package fr.tastymeet.apitastymeet.dto;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonFormat;
=======
import fr.tastymeet.apitastymeet.entities.Conversation;
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
import lombok.*;

import java.time.LocalDateTime;

<<<<<<< HEAD
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
=======
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {
    private long id;
    private UserChatDto sender;
    private String content;
    private LocalDateTime dateEnvoie;
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
}
