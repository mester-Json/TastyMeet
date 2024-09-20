package fr.tastymeet.apitastymeet.dto;



import jakarta.persistence.Lob;
import jakarta.persistence.Version;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class PictureDto {
    private long id;
    private int version;
    private String pictureName;
    private Long userId;
}
