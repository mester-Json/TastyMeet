package fr.tastymeet.apitastymeet.services;

import fr.tastymeet.apitastymeet.dto.UserDto;
import fr.tastymeet.apitastymeet.dto.UserLikeDto;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MatchServiceImpl implements IMatchService{
    @Autowired
    private UserRepository userRepository;

    public void likeUser(long userId, long likedUserId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User likedUser = userRepository.findById(likedUserId).orElseThrow(() -> new RuntimeException("User not found"));

        user.like(likedUser);

        userRepository.save(user);
    }

    public Set<UserLikeDto> getMatches(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getMatches().stream()
                .map(matchedUser -> new UserLikeDto(
                        matchedUser.getId(), // ID de l'utilisateur qui a été liké
                        matchedUser.getFirstName(),
                        matchedUser.getLastName(),
                        userId // ID de l'utilisateur qui a liké
                ))
                .collect(Collectors.toSet());
    }
}
