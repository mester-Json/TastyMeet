package fr.tastymeet.apitastymeet.dto;


import lombok.Data;

@Data // Génère des getters, setters, toString, equals, et hashCode
public class ConversationDto {
    private Long id;
    private Long userId1;
    private Long userId2;
    private String lastMessage; // Dernier message
    private UserChatDto participant;


    // Méthode pour obtenir l'autre utilisateur
    public Long getOtherUserId(Long currentUserId) {
        return currentUserId.equals(userId1) ? userId2 : userId1;
    }


}
