package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.UserLikeDto;
<<<<<<< HEAD
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.services.IChatRoomService;
import fr.tastymeet.apitastymeet.services.IMatchService;
import fr.tastymeet.apitastymeet.services.IUserService;
=======
import fr.tastymeet.apitastymeet.services.Impl.ConversationServiceImpl;
import fr.tastymeet.apitastymeet.services.Interface.IConversationService;
import fr.tastymeet.apitastymeet.services.Interface.IMatchService;
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
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


    @Autowired
    private IChatRoomService chatRoomService;

    // Endpoint pour liker un utilisateur
    @PostMapping("/{userId}/like/{likedUserId}")
    public ResponseEntity<?> likeUser(@PathVariable long userId, @PathVariable long likedUserId) {
        // Logique pour enregistrer le like
        matchService.likeUser(userId, likedUserId);
<<<<<<< HEAD
        Set<UserLikeDto> matches = matchService.getMatches(userId);
        if (matches.stream().anyMatch(match -> match.getLikedUserId() == likedUserId)){
            chatRoomService.createRoom(userId, likedUserId);
        }
        return ResponseEntity.ok("User liked successfully");
    }

    @GetMapping("/{userId}/matches")
    public Set<UserLikeDto> getMatches(@PathVariable long userId) {
        return matchService.getMatches(userId);
    }
}

=======

        // Vérifiez les matches après avoir liké
        Set<UserLikeDto> matches = matchService.getMatches(userId);

        // Vérifiez si le likedUserId est dans les matches
        if (matches.stream().anyMatch(match -> match.getLikedUserId() == likedUserId)) {
            // Créez une conversation ici
            conversationService.createConversation(userId, likedUserId);

            // Notifiez les utilisateurs via WebSocket
            messagingTemplate.convertAndSend("/user/" + userId + "/matches", "Vous avez un nouveau match !");
            messagingTemplate.convertAndSend("/user/" + likedUserId + "/matches", "Vous avez un nouveau match !");
        }

        return ResponseEntity.ok().build();
    }


}
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
