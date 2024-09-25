package fr.tastymeet.apitastymeet.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@ToString
@Entity
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId1; // ID du premier utilisateur
    private Long userId2; // ID du deuxième utilisateur

    // Ajoutez d'autres champs si nécessaire, comme un ID de conversation ou une liste de messages

    // Vous pouvez également ajouter des méthodes supplémentaires ici si nécessaire
    // Constructeur par défaut
    public Conversation() {}

    // Constructeur avec deux paramètres
    public Conversation(Long userId1, Long userId2) {
        this.userId1 = userId1;
        this.userId2 = userId2;
    }
}
