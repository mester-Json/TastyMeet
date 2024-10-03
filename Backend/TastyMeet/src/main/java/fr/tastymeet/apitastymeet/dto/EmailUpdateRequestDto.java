package fr.tastymeet.apitastymeet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailUpdateRequestDto {
    private long id;
    private String currentEmail;
    private String newEmail;
}
