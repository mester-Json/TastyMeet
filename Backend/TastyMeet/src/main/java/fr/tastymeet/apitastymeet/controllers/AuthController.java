package fr.tastymeet.apitastymeet.controllers;


import fr.tastymeet.apitastymeet.dto.AuthRequest;
import fr.tastymeet.apitastymeet.dto.CustomUserDetails;
import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.services.CustomUserDetailsService;
import fr.tastymeet.apitastymeet.tools.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final CustomUserDetailsService userDetailsService; // Utilisation du service de détails utilisateur
    //private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

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

        // Récupérez l'ID pour le token
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
        Long userId = customUserDetails.getId();
        Gender gender = customUserDetails.getGender();
        Gender orientation = customUserDetails.getOrientation();

        // Retourner le token dans la réponse
        return ResponseEntity.ok(jwtUtils.generateToken(userDetails.getUsername(), userId, gender, orientation));
    }
}