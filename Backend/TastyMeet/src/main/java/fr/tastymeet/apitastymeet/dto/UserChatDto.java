package fr.tastymeet.apitastymeet.dto;


import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserChatDto {
    private long id;
    private String firstName;
    private List<PictureDto> pictures = new ArrayList<>();
}
