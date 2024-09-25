package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.UserLikeDto;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.services.IChatRoomService;
import fr.tastymeet.apitastymeet.services.IMatchService;
import fr.tastymeet.apitastymeet.services.IUserService;
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

    @Autowired
    private IChatRoomService chatRoomService;

    // Endpoint pour liker un utilisateur
    @PostMapping("/{userId}/like/{likedUserId}")
    public ResponseEntity<?> likeUser(@PathVariable long userId, @PathVariable long likedUserId) {
        matchService.likeUser(userId, likedUserId);
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

