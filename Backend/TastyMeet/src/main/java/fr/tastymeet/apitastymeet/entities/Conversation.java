package fr.tastymeet.apitastymeet.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id_1") // Renommer la colonne pour un meilleur contexte
    private User user1; // Le premier utilisateur

    @ManyToOne
    @JoinColumn(name = "user_id_2") // Renommer la colonne pour un meilleur contexte
    private User user2; // Le deuxième utilisateur

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    private List<ChatMessage> messages;

    // Constructeur par défaut
    public Conversation() {}

    // Constructeur avec deux utilisateurs
    public Conversation(User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    public ChatMessage getLastMessage() {
        return messages.isEmpty() ? null : messages.get(messages.size() - 1);
    }
}
