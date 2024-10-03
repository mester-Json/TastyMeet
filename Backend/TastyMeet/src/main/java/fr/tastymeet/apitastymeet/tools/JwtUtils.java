package fr.tastymeet.apitastymeet.tools;


import fr.tastymeet.apitastymeet.entities.Gender;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils {

    private final String SECRETKEY = "Mm#UJ(v:T/RvK3vhr-3f1o7xY;gBGX"; // Remplacez par une clé secrète robuste
    private final long EXPIRATIONTIME = 86400000; // 24 heures

    public String generateToken(String username, long userId, Gender gender, Gender  orientation) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("id", userId); // Ajoutez l'ID utilisateur aux claims
        claims.put("gender", gender.toString());  // Conversion en chaîne
        claims.put("orientation", orientation.toString());  // Conversion en chaîne
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS256, SECRETKEY)
                .compact();  // Cette méthode génère un token avec 2 points
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRETKEY).parseClaimsJws(token).getBody();
    }
    public Claims decodeToken(String token) {
        return extractAllClaims(token); // Ajout de la méthode pour décoder le token
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}