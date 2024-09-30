package fr.tastymeet.apitastymeet.controllers;


import fr.tastymeet.apitastymeet.dto.AuthRequest;
import fr.tastymeet.apitastymeet.dto.CustomUserDetails;
import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.services.Impl.CustomUserDetailsService;
import fr.tastymeet.apitastymeet.tools.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    private final Set<String> blacklistedTokens = ConcurrentHashMap.newKeySet();


    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        // Utilisez la méthode de service pour l'authentification
        String token = customUserDetailsService.authenticateUser(authRequest);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && !token.isEmpty()) {
            blacklistedTokens.add(token); // Ajoute le token à la liste noire
        }

        return ResponseEntity.ok().body("Déconnexion réussie.");

    }
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}

