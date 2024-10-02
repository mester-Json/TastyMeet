package fr.tastymeet.apitastymeet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordRequestDto {
        private String currentPassword;
        private long id;
        private String newPassword;
}
