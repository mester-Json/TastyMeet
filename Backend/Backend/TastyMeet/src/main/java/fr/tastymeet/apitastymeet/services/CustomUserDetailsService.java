package fr.tastymeet.apitastymeet.services;


import fr.tastymeet.apitastymeet.dto.CustomUserDetails;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        /* Spring Security utilise ces autorités pour gérer l'autorisation (exemple : accorder ou refuser l'accès à certaines parties de l'application) */
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                .collect(Collectors.toList());

        return new CustomUserDetails(
                user.getId(), // L'ID doit être le premier paramètre
                user.getEmail(),
                user.getPassword(),
                user.getGender(),
                user.getOrientation(),
                authorities
        );
    }
}