package fr.tastymeet.apitastymeet.repositories;

import fr.tastymeet.apitastymeet.entities.Conversation;
import fr.tastymeet.apitastymeet.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    // Méthode pour récupérer toutes les conversations d'un utilisateur
    List<Conversation> findByUser1OrUser2(User userId1, User userId2);
}
