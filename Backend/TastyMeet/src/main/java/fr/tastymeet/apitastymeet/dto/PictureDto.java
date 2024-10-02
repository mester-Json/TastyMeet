package fr.tastymeet.apitastymeet.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PictureDto {
    private long id;
    private int version;
    private String pictureName;
    private Long userId;
}
