package fr.tastymeet.apitastymeet.dto;


import fr.tastymeet.apitastymeet.entities.Gender;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    private String lastName;
    private String city;
    private String location;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate age;
    private List<PictureDto> pictures = new ArrayList<>();
    private Gender gender;
    private Gender orientation;

}
