package fr.tastymeet.apitastymeet.configuration;

import fr.tastymeet.apitastymeet.filters.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailsService userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }
    /* Ces méthodes définissent quelles URL et méthodes HTTP sont autorisées sans authentification. */
    public static Map<HttpMethod, String[]> getAUTHORIZED_BY_METHOD() {
        Map<HttpMethod, String[]> authorizedByMethod = new HashMap<>();
        authorizedByMethod.put(HttpMethod.GET, new String[]{"/api/public/**"});
        // Ajoutez d'autres méthodes et chemins si nécessaire
        return authorizedByMethod;
    }
    public static String[] getAUTHORIZED_URL() {
        return new String[] {
                "/api/public/**",  // Exemple d'URL accessible publiquement
                // Ajoutez d'autres URL si nécessaire
        };
    }
    /***********************************************************************************************************/

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


    /*Pour la production pas de connexion*/
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Désactiver la protection CSRF
                //.cors(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()  // Permettre l'accès à toutes les routes
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Pas de session (JWT)
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  // Ajout du filtre JWT

        return http.build();
    }


}


/*@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Nouvelle syntaxe pour désactiver CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll()  // Routes d'authentification accessibles à tous
                        .requestMatchers("/api/addUser").permitAll()
                        .requestMatchers("/api/auth/login").permitAll()
                        .anyRequest().permitAll()  // Toutes les autres routes nécessitent une authentification
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Pas de session (JWT)
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  // Ajout du filtre JWT

        return http.build();
    }*/