package fr.tastymeet.apitastymeet.repositories;

import fr.tastymeet.apitastymeet.entities.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ChatRoomRepository  extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByRoomUsers_Id(long id);
    ChatRoom findByChatRoomId(long chatRoomId);

}