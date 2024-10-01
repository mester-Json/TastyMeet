package fr.tastymeet.apitastymeet.services.Impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    private final BCryptPasswordEncoder passwordEncoder;

    public PasswordService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Méthode pour hacher le mot de passe
    public String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    // Méthode pour vérifier le mot de passe
    public boolean verifyPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }
}
