package fr.tastymeet.apitastymeet.dto;


<<<<<<< HEAD
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
=======
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserChatDto {
    private long id;
    private String firstName;
    private List<PictureDto> pictures = new ArrayList<>();

>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
}
