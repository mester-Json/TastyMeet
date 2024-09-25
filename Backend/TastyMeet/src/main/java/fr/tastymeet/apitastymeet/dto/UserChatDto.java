package fr.tastymeet.apitastymeet.dto;

import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.entities.Picture;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserChatDto {
    private String firstName;
    private List<PictureDto> pictures = new ArrayList<>();
}
