package fr.tastymeet.apitastymeet.repositories;

import fr.tastymeet.apitastymeet.entities.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PictureRepository extends JpaRepository<Picture, Long> {
    List<Picture> findByUserId(long userId);
}
