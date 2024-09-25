package fr.tastymeet.apitastymeet.dto;

import fr.tastymeet.apitastymeet.entities.User;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class ChatRoomDto {
    private long chatRoomId;
    private Set<UserChatDto> roomUsers = new HashSet<>();
    private List<ChatMessageDto> messages;
}
