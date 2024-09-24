package fr.tastymeet.apitastymeet.dto;

import lombok.*;


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
