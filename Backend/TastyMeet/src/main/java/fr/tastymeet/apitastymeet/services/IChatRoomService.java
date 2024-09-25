package fr.tastymeet.apitastymeet.services;

import fr.tastymeet.apitastymeet.dto.ChatRoomDto;



import java.util.List;

public interface IChatRoomService {
    // Permet de créer un room lorsque l'on obtient un match entre 2 user (à appeler si match !!!!!!!!)
    void createRoom(long sendId, long recipientId);

    ChatRoomDto getById(long chatRoomId);


    // Permet de retourner l'id de la room en fonction des 2 users pour afficher par la suite la room sur le site
    List<ChatRoomDto> getChatRoom(long senderId);

    /*// Permet d'afficher les messages de la room
    List<ChatMessage> showMessage(long senderId, long recipientId);*/

}
