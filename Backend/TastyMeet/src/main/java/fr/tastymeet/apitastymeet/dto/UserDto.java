package fr.tastymeet.apitastymeet.dto;


import fr.tastymeet.apitastymeet.entities.Gender;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class UserDto {

    private long id;
    private int version;
    private String description;
    private String email;
    private String phone;
    private String password;
    private String firstName;
    private String city;
    private String location;
    private LocalDate age;
    private List<PictureDto> pictures = new ArrayList<>();
    private GenderDto gender;
    private GenderDto orientation;

}
