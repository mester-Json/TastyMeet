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

    private final String SECRET_KEY = "YOUR_SECRET_KEY"; // Remplacez par une clé secrète robuste
    private final long EXPIRATION_TIME = 86400000; // 24 heures


    public String generateToken(String username, long userId, Gender gender, Gender  orientation) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId); // Ajoutez l'ID utilisateur aux claims
        claims.put("gender", gender.toString());  // Conversion en chaîne
        claims.put("orientation", orientation.toString());  // Conversion en chaîne
        String token = createToken(claims, username);

        System.out.println("Generated Token: " + token); // Ajoutez ce log
        return token;
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();  // Cette méthode génère un token avec 2 points
    }



    public String extractUsername(String token) {

        return extractAllClaims(token).getSubject();
    }
    public String extractClaim(String token, String claim) {
        return extractAllClaims(token).get(claim, String.class); // Méthode pour extraire des claims
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
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