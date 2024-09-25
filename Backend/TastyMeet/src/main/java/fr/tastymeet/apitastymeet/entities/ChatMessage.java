package fr.tastymeet.apitastymeet.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    private Long senderId; // Utilisateur qui envoie le message
    private String content; // Le contenu du message
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateEnvoie; // L'heure à laquelle le message est envoyé

    // Constructeur avec timestamp initialisé
    public ChatMessage(Long senderId, String content, Conversation conversation) {
        this.senderId = senderId;
        this.content = content;
        this.conversation = conversation;
        this.dateEnvoie = LocalDateTime.now(); // Ici, on s'assure que le timestamp est initialisé
    }
}
