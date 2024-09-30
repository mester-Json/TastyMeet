package fr.tastymeet.apitastymeet.repositories;

import fr.tastymeet.apitastymeet.entities.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
<<<<<<< HEAD
    ChatMessage findById(long id);

    List<ChatMessage> findBySenderUser_Id(long id);
=======
    // Obtenir les messages d'une conversation, triés par date
    List<ChatMessage> findByConversationIdOrderByDateEnvoieAsc(Long conversationId);

    // Obtenir le dernier message d'une conversation
    ChatMessage findFirstByConversationIdOrderByDateEnvoieDesc(Long conversationId);

    List<ChatMessage> findByConversationId(Long conversationId);
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
}
