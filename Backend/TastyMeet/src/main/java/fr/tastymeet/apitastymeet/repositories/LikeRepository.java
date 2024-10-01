package fr.tastymeet.apitastymeet.repositories;

import fr.tastymeet.apitastymeet.entities.Like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    // Vérifier si un like existe entre deux utilisateurs
    Like findByUserIdAndLikedUserId(Long userId, Long likedUserId);

    // Mettre à jour l'état mutuel
    @Modifying
    @Transactional
    @Query("UPDATE Like l SET l.isMutual = TRUE WHERE (l.userId = ?1 AND l.likedUserId = ?2) OR (l.userId = ?2 AND l.likedUserId = ?1)")
    void updateMutualLike(Long userId, Long likedUserId);
}
