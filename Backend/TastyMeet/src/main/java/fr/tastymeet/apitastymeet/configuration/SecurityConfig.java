package fr.tastymeet.apitastymeet.configuration;

import fr.tastymeet.apitastymeet.filters.JwtAuthFilter;
import lombok.Getter;
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
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
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

    @Getter
    private static final String[] AUTHORIZED_URL = new String[]{
            "/",
            "/register",
            "/ws",
            "/error",
    };

    @Getter
    private static final Map<HttpMethod, String[]> AUTHORIZED_BY_METHOD = Map.of(
            HttpMethod.GET, new String[]{
                "/api/show/**",
            },
            HttpMethod.POST, new String[]{
                    "/api/auth/login",
                    "/api/addUser"
            },
            HttpMethod.DELETE, new String[]{

            }
    );

    /***********************************************************************************************************/

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Désactiver la protection CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(AUTHORIZED_URL).permitAll()
                        .requestMatchers(HttpMethod.GET, AUTHORIZED_BY_METHOD.get(HttpMethod.GET)).permitAll()
                        .requestMatchers(HttpMethod.POST, AUTHORIZED_BY_METHOD.get(HttpMethod.POST)).permitAll()
                        .requestMatchers(HttpMethod.DELETE, AUTHORIZED_BY_METHOD.get(HttpMethod.DELETE)).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Pas de session (JWT)
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  // Ajout du filtre JWT
        return http.build();
    }
}