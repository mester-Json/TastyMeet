package fr.tastymeet.apitastymeet.repositories;

import fr.tastymeet.apitastymeet.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {



}
