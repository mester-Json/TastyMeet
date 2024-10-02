package fr.tastymeet.apitastymeet.services.Impl;

import fr.tastymeet.apitastymeet.dto.UserLikeDto;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.services.Interface.IMatchService;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MatchServiceImpl implements IMatchService {
    @Autowired
    private UserRepository userRepository;

    public void likeUser(long userId, long likedUserId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User likedUser = userRepository.findById(likedUserId).orElseThrow(() -> new RuntimeException("User not found"));

        user.like(likedUser);

        userRepository.save(user);
    }

    public Set<UserLikeDto> getMatches(long userId) {
        // Récupérer l'utilisateur à partir de la base de données
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Récupérer les utilisateurs qui ont été "likés" par l'utilisateur courant
        Set<User> matchedUsers = user.getMatches();

        // Vérifier le contenu de matchedUsers pour le débogage
        System.out.println("Matched users for userId " + userId + ": " + matchedUsers);

        // Convertir les utilisateurs correspondants en UserLikeDto
        return matchedUsers.stream()
                .map(matchedUser -> {
                    UserLikeDto userLikeDto = DtoTool.convert(matchedUser, UserLikeDto.class);
                    // Assigner l'ID de l'utilisateur qui a "liké" (le userId)
                    userLikeDto.setLikedUserId(userId); // Cela peut être modifié si nécessaire
                    return userLikeDto;
                })
                .collect(Collectors.toSet());
    }



    public Set<UserLikeDto> getLikes(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Convertir chaque utilisateur liké en UserLikeDto
        return user.getLiked().stream()
                .map(likedUser -> {
                    UserLikeDto userLikeDto = DtoTool.convert(likedUser, UserLikeDto.class);
                    userLikeDto.setLikedUserId(likedUser.getId()); // ID de l'utilisateur qui a liké
                    return userLikeDto;
                })
                .collect(Collectors.toSet());  // Retourner un ensemble de UserLikeDto
    }

}