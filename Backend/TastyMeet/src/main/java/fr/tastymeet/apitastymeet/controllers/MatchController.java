package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.UserLikeDto;
import fr.tastymeet.apitastymeet.services.Interface.IConversationService;
import fr.tastymeet.apitastymeet.services.Interface.IMatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api")
public class MatchController {
    @Autowired
    private IMatchService matchService;
    @Autowired
    private IConversationService conversationService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @PostMapping("/{userId}/like/{likedUserId}")
    public ResponseEntity<?> likeUser(@PathVariable long userId, @PathVariable long likedUserId) {
        // Logique pour enregistrer le like
        matchService.likeUser(userId, likedUserId);

        // Vérifiez les matches après avoir liké
        Set<UserLikeDto> matches = matchService.getMatches(likedUserId);

        // Vérifiez si le likedUserId est dans les matches
        if (matches.stream().anyMatch(match -> match.getUserId() == userId)) {

            // Créez une conversation ici
            conversationService.createConversation(userId, likedUserId);

            // Notifiez les utilisateurs via WebSocket
            //En cours de développement
           /* messagingTemplate.convertAndSend("/user/" + userId + "/matches", "Vous avez un nouveau match !");
            messagingTemplate.convertAndSend("/user/" + likedUserId + "/matches", "Vous avez un nouveau match !");*/
        }
        return ResponseEntity.ok().build();
    }
}