package fr.tastymeet.apitastymeet.repositories;

import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByGenderAndOrientation(Gender gender, Gender orientation);
    User findByEmail(String email);

}
