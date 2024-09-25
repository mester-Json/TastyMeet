package fr.tastymeet.apitastymeet.repositories;

import fr.tastymeet.apitastymeet.entities.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    // Méthode pour trouver une conversation par ses participants
    Conversation findByUserId1AndUserId2(Long userId1, Long userId2);

    // Méthode pour récupérer toutes les conversations d'un utilisateur
    List<Conversation> findByUserId1OrUserId2(Long userId1, Long userId2);
    
}
