package fr.tastymeet.apitastymeet.repositories;

import fr.tastymeet.apitastymeet.entities.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    ChatMessage findById(long id);

    List<ChatMessage> findBySenderUser_Id(long id);
}
