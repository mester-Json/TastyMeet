package fr.tastymeet.apitastymeet.services.Interface;

import fr.tastymeet.apitastymeet.dto.UserDto;
import fr.tastymeet.apitastymeet.entities.Gender;

import java.util.List;

public interface IUserService {


    List<UserDto> getByGenderAndOrientation(Gender gender, Gender orientation);

    List<UserDto> getDisplayableUsers(String token);

    UserDto save(UserDto userDto);

    UserDto update(UserDto userDto);

    void deleteById(long id);

    UserDto getByEmail(String email);

    UserDto getById(long id);
}
