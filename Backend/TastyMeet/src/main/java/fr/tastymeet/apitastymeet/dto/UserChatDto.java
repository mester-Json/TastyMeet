package fr.tastymeet.apitastymeet.dto;


import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.entities.ChatRoom;
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
public class UserChatDto {
    //Classe Dto user dans la quelle est stocker les messages, les chatRooms et le nom
    //Elle sera utiliser dans tout ce qui concerne les messages

    // l'id de mon UserChatDto
    private long id;
    // Le prénom du User
    private String firstName;
    // La liste des messages
    private List<ChatMessageDto> messages;
    /*// La liste des personne liké
    private Set<UserDto> liked = new HashSet<>();*/


    /*public static class ChatroomDto1{
        private long chatRoomId;
        private UserChatDto senderRoomUser;
        private UserChatDto recipientRoomUser;
        private List<ChatMessageDto> messages;
    }*/

}
