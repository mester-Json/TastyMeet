package fr.tastymeet.apitastymeet.entities;

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

}
