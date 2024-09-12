package fr.tastymeet.apitastymeet.services;

import fr.tastymeet.apitastymeet.dto.UserDto;
import fr.tastymeet.apitastymeet.entities.Gender;

import java.util.List;

public interface IUserService {

    List<UserDto> getByAll();

    List<UserDto> getByGenderAndOrientation(Gender gender, Gender orientation);

    UserDto save(UserDto userDto);

    UserDto update(UserDto userDto);

    void deleteById(long id);

    UserDto getByEmail(String email);
}
