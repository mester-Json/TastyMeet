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
import java.util.List;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        if (!request.getMethod().equals("OPTIONS") && isInterceptedRequest(request)) {
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid authorization");
                return;
            }

            String jwtToken = authHeader.substring(7); // Better to use `substring("Bearer ".length())`
            String username = jwtUtils.extractUsername(jwtToken);

            if (username != null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (jwtUtils.validateToken(jwtToken, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, jwtToken, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                    return;
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        // If the path starts with "/api", this filter should not apply.
        return path.startsWith("/api");
    }

    private boolean isInterceptedRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();
        List<String> authorizedUrls = Arrays.asList(SecurityConfig.getAUTHORIZED_URL());

        return Stream.concat(
                        Arrays.stream(SecurityConfig.getAUTHORIZED_BY_METHOD()
                                .getOrDefault(HttpMethod.valueOf(request.getMethod()), new String[]{})),
                        authorizedUrls.stream())
                .map(s -> s.replace("**", ".*")) // Use regex to replace "**" with ".*"
                .noneMatch(uri::matches);
    }
}
