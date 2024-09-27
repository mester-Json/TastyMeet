package fr.tastymeet.apitastymeet.controllers;


import fr.tastymeet.apitastymeet.dto.AuthRequest;
import fr.tastymeet.apitastymeet.dto.CustomUserDetails;
import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.services.CustomUserDetailsService;
import fr.tastymeet.apitastymeet.tools.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap ;
import  java.util.Map ;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final CustomUserDetailsService userDetailsService; // Utilisation du service de détails utilisateur
    //private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    private final Set<String> blacklistedTokens = ConcurrentHashMap.newKeySet();


    public AuthController(CustomUserDetailsService userDetailsService, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userDetailsService = userDetailsService;
        //this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());

        if (!authRequest.getPassword().equals(userDetails.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
        Long userId = customUserDetails.getId();
        Gender gender = customUserDetails.getGender();
        Gender orientation = customUserDetails.getOrientation();

        // Générer le token
        String token = jwtUtils.generateToken(userDetails.getUsername(), userId, gender, orientation);

        // Retourner le token dans un objet
        Map<String, String> response = new HashMap<>();
        response.put("token", token);  // Assurez-vous que le token est ajouté ici

        return ResponseEntity.ok(response); // Retourner la réponse avec le token
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