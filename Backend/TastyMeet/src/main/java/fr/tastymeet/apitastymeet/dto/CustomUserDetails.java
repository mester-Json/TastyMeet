package fr.tastymeet.apitastymeet.dto;

import fr.tastymeet.apitastymeet.entities.Gender;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor // Pour un constructeur sans arguments, utile pour la désérialisation
@AllArgsConstructor // Pour générer un constructeur avec tous les champs
public class CustomUserDetails implements UserDetails {
    private Long id;
    private String email;
    private String password;
    private GenderDto gender;
    private GenderDto orientation;
    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
