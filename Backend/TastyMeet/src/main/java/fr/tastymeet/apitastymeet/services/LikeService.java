package fr.tastymeet.apitastymeet.services;


import fr.tastymeet.apitastymeet.entities.Like;
import fr.tastymeet.apitastymeet.repositories.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Transactional
    public void likeUser(Long userId, Long likedUserId) {
        // Vérifie si l'utilisateur a déjà liké l'autre utilisateur
        Like existingLike = likeRepository.findByUserIdAndLikedUserId(userId, likedUserId);

        if (existingLike == null) {
            // Crée un nouveau like
            Like like = new Like();
            like.setUserId(userId);
            like.setLikedUserId(likedUserId);
            likeRepository.save(like);

            // Vérifie si l'autre utilisateur a liké l'utilisateur initial
            Like mutualLike = likeRepository.findByUserIdAndLikedUserId(likedUserId, userId);
            if (mutualLike != null) {
                // Met à jour les deux likes pour indiquer qu'ils sont mutuels
                likeRepository.updateMutualLike(userId, likedUserId);
            }
        }
    }
}
