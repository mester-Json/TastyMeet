package fr.tastymeet.apitastymeet.dto;



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
    private byte[] picture;
    private String pictureBase64;
    private Long userId;
}
