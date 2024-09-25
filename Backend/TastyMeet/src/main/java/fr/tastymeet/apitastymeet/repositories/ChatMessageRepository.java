package fr.tastymeet.apitastymeet.repositories;

import fr.tastymeet.apitastymeet.entities.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    // Obtenir les messages d'une conversation, triés par date
    List<ChatMessage> findByConversationIdOrderByDateEnvoieAsc(Long conversationId);

    // Obtenir le dernier message d'une conversation
    ChatMessage findFirstByConversationIdOrderByDateEnvoieDesc(Long conversationId);


}
