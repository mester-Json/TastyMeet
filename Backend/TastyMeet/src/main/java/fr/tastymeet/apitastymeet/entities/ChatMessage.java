package fr.tastymeet.apitastymeet.entities;

<<<<<<< HEAD
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString

@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long chatId;

    // Plusieurs messages appartienents a 1 user
    @ManyToOne
    private User senderUser;
    @Column(name = "content")
    private String content;
    @Column(name = "dateMessage")
    private LocalDateTime dateMessage = LocalDateTime.now();

    @ManyToOne
    private ChatRoom room;

=======
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    @ManyToOne // Utilisateur qui envoie le message
    @JoinColumn(name = "sender_id")
    private User sender; // Remplacez Long senderId par User sender

    private String content; // Le contenu du message

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateEnvoie; // L'heure à laquelle le message est envoyé

    // Constructeur avec timestamp initialisé
    public ChatMessage(User sender, String content, Conversation conversation) {
        this.sender = sender; // Ici, on assigne l'objet User directement
        this.content = content;
        this.conversation = conversation;
        this.dateEnvoie = LocalDateTime.now(); // Ici, on s'assure que le timestamp est initialisé
    }
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
}
