package fr.tastymeet.apitastymeet.services.Impl;

import fr.tastymeet.apitastymeet.dto.PictureDto;
import fr.tastymeet.apitastymeet.dto.UserChatDto;
import fr.tastymeet.apitastymeet.dto.UserDto;
import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.PictureRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.services.Interface.IUserService;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PictureRepository pictureRepository;

    @Override
    public List<UserDto> getByAll() {
        List<UserDto> result = new ArrayList<>();

        List<User> entities = userRepository.findAll();

        for (User u : entities) {
            result.add(DtoTool.convert(u, UserDto.class));
        }
        return result;
    }



    @Override
    public List<UserDto> getByGenderAndOrientation(Gender gender, Gender orientation) {

        List<UserDto> result= new ArrayList<>();

        List<User> entities = userRepository.findByGenderAndOrientation(gender, orientation);

        for (User u : entities) {
            result.add(DtoTool.convert(u, UserDto.class));
        }

        return result;
    }

    @Override
    public UserDto save(UserDto userDto) {
        User u = DtoTool.convert(userDto, User.class);

        User insertUser = userRepository.saveAndFlush(u);

        return DtoTool.convert(insertUser, UserDto.class);

    }

    @Override
    public UserDto update(UserDto userDto) {
        User u = DtoTool.convert(userDto, User.class);

        User insertUser = userRepository.saveAndFlush(u);

        return DtoTool.convert(insertUser, UserDto.class);
    }

    @Override
    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

    public UserDto getByEmail(String email){
        User u= userRepository.findByEmail(email);

        return DtoTool.convert(u, UserDto.class);
    }

    public UserDto getById(long id){
        Optional<User> u= userRepository.findById(id);

        return DtoTool.convert(u, UserDto.class);
    }


    public UserChatDto getUserDetails(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec ID: " + userId));

        // Convertir l'entité User en UserChatDto
        UserChatDto userChatDto = new UserChatDto();
        userChatDto.setFirstName(user.getFirstName());

        // Convertir les pictures en PictureDto
        List<PictureDto> pictureDtos = user.getPictures().stream()
                .map(picture -> DtoTool.convert(picture, PictureDto.class)) // Utiliser DtoTool pour la conversion
                .collect(Collectors.toList());
        userChatDto.setPictures(pictureDtos);

        return userChatDto;
    }
}
