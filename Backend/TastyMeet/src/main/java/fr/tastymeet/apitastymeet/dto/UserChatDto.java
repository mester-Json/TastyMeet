package fr.tastymeet.apitastymeet.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

import java.util.ArrayList;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class UserChatDto {
    // l'id de mon UserChatDto
    private long id;
    // Le prénom du User
    private String firstName;
    // Avatar
    //private PictureDto picture;
    @JsonIgnore
    private List<PictureDto> pictures = new ArrayList<>();

    public PictureDto getPicture()
    {
        return pictures.get(0);
    }
}
