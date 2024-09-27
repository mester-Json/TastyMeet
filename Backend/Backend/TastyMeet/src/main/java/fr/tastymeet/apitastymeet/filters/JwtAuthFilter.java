package fr.tastymeet.apitastymeet.filters;

import fr.tastymeet.apitastymeet.configuration.SecurityConfig;
import fr.tastymeet.apitastymeet.tools.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        if (!request.getMethod().equals("OPTIONS") && isInterceptedRequest(request)) {
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || (!authHeader.startsWith("Bearer"))) {
                throw new ServletException("Invalid authorization");
            }
            String jwtToken = authHeader.substring(7);
            String username = jwtUtils.extractUsername(jwtToken);
            String userId = jwtUtils.extractClaim(jwtToken, "id"); // Extraire l'ID utilisateur

            if (username != null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (Boolean.TRUE.equals(jwtUtils.validateToken(jwtToken, userDetails))) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, jwtToken, userDetails.getAuthorities());
                    authToken.setDetails(userId); // Stocker l'ID dans les détails
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    throw new ServletException("Invalid token");
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.startsWith("/api") ;
    }

    private boolean isInterceptedRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return Stream.concat(
                        Arrays.stream(SecurityConfig.getAUTHORIZED_BY_METHOD().getOrDefault(HttpMethod.valueOf(request.getMethod()), new String[]{})),
                        Arrays.stream(SecurityConfig.getAUTHORIZED_URL()))
                .map(s -> s.replace("**", ".*")).noneMatch(uri::matches);
    }
}