package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.UserLikeDto;
import fr.tastymeet.apitastymeet.services.IMatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MatchController {
    @Autowired
    private IMatchService matchService;

    // Endpoint pour liker un utilisateur
    @PostMapping("/{userId}/like/{likedUserId}")
    public ResponseEntity<?> likeUser(@PathVariable long userId, @PathVariable long likedUserId) {
        matchService.likeUser(userId, likedUserId);
        return ResponseEntity.ok("User liked successfully");
    }

    @GetMapping("/{userId}/matches")
    public Set<UserLikeDto> getMatches(@PathVariable long userId) {
        return matchService.getMatches(userId);
    }
}
