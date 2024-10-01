package fr.tastymeet.apitastymeet.dto;

import fr.tastymeet.apitastymeet.entities.Gender;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserLikeDto {
    private long likedUserId;
    private String firstName;
    private String lastName;
    private long userId;
}
