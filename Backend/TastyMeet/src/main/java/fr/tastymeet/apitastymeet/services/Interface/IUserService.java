package fr.tastymeet.apitastymeet.services.Interface;

import fr.tastymeet.apitastymeet.dto.EmailUpdateRequestDto;
import fr.tastymeet.apitastymeet.dto.UserDto;
import fr.tastymeet.apitastymeet.entities.Gender;
import java.util.List;

public interface IUserService {


    List<UserDto> getByGenderAndOrientation(Gender gender, Gender orientation);

    List<UserDto> getDisplayableUsers(String token);

    String updateEmail(EmailUpdateRequestDto emailUpdateRequest);

    UserDto save(UserDto userDto);

    String updatePassword(long userId, String currentPassword, String newPassword);

    UserDto update(UserDto userDto);

    void deleteById(long id);

    UserDto getById(long id);
}
