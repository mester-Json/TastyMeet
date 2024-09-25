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
    private UserChatDto senderUser;
    private String content;
    private LocalDateTime dateMessage = LocalDateTime.now();
    private ChatRoomDto room;
}
