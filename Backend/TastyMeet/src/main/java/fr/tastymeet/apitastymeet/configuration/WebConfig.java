package fr.tastymeet.apitastymeet.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Autoriser toutes les routes commençant par /api/
                .allowedOrigins("http://localhost:5173")  // Autoriser seulement l'origine localhost:5173
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "*")  // Autoriser les méthodes HTTP spécifiques
                .allowedHeaders("*")  // Autoriser tous les headers
                .allowCredentials(true)  // Autoriser l'envoi de cookies/credentials
                .maxAge(3600);  // Temps en secondes pendant lequel la réponse prévalidée peut être mise en cache
    }
}