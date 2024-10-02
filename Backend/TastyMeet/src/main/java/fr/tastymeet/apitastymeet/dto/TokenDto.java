package fr.tastymeet.apitastymeet.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenDto {
    private String username;
    private Long userId;
    private GenderDto gender;
    private GenderDto orientation;
}
