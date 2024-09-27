package fr.tastymeet.apitastymeet.configuration;

import fr.tastymeet.apitastymeet.services.LikeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    // Endpoint pour liker un utilisateur
    @PostMapping("/{userId}/like/{likedUserId}")
    public ResponseEntity<String> likeUser(@PathVariable Long userId, @PathVariable Long likedUserId) {
        likeService.likeUser(userId, likedUserId);
        return ResponseEntity.ok("User " + userId + " liked user " + likedUserId);
    }
}
