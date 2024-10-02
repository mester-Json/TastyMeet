package fr.tastymeet.apitastymeet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
