package fr.tastymeet.apitastymeet.services.Impl;


import fr.tastymeet.apitastymeet.dto.AuthRequest;
import fr.tastymeet.apitastymeet.dto.CustomUserDetails;
import fr.tastymeet.apitastymeet.dto.TokenDto;
import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import fr.tastymeet.apitastymeet.tools.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordService passwordService;

    public String authenticateUser(AuthRequest authRequest) {
        UserDetails userDetails = loadUserByUsername(authRequest.getEmail());

        // Vérifiez si le mot de passe correspond
        if (!passwordService.verifyPassword(authRequest.getPassword(), userDetails.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        // Créer un TokenDto directement
        TokenDto tokenDto = DtoTool.convert(userDetails, TokenDto.class); // Convertir CustomUserDetails en TokenDto

        // Récupérez l'énumération Gender à partir de GenderDto avec vérification de nullité
        Gender gender = tokenDto.getGender() != null ? Gender.valueOf(tokenDto.getGender().name()) : null;
        Gender orientation = tokenDto.getOrientation() != null ? Gender.valueOf(tokenDto.getOrientation().name()) : null;

        // Retourner le token
        return jwtUtils.generateToken(tokenDto.getUsername(), tokenDto.getUserId(), gender, orientation);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // Créer la liste des autorités
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                .collect(Collectors.toList());

        // Convertir User en CustomUserDetails
        CustomUserDetails customUserDetails = DtoTool.convert(user, CustomUserDetails.class);

        // Définir les autorités dans CustomUserDetails
        customUserDetails.setAuthorities(authorities);

        return customUserDetails;
    }

}