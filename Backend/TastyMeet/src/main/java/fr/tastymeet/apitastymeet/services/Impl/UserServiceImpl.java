package fr.tastymeet.apitastymeet.services.Impl;

import fr.tastymeet.apitastymeet.dto.*;
import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.entities.Picture;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.PictureRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.services.Interface.IMatchService;
import fr.tastymeet.apitastymeet.services.Interface.IUserService;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import fr.tastymeet.apitastymeet.tools.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@Transactional
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private IMatchService matchService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private PictureRepository pictureRepository;

    @Override
    public List<UserDto> getByGenderAndOrientation(Gender gender, Gender orientation) {
        return userRepository.findByGenderAndOrientation(gender, orientation).stream()
                .map(user -> DtoTool.convert(user, UserDto.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<UserDto> getDisplayableUsers(String token) {
        // Retirer le préfixe "Bearer " du token et décoder
        String jwtToken = token.substring(7);
        Claims claims = jwtUtils.decodeToken(jwtToken);

        long userId = Long.parseLong(claims.get("id").toString());
        Gender gender = Gender.valueOf(claims.get("gender").toString());
        Gender orientation = Gender.valueOf(claims.get("orientation").toString());

        // Récupérer la liste des utilisateurs likés par l'utilisateur actuel
        Set<UserLikeDto> likedUsers = matchService.getLikes(userId);

        // Récupérer les utilisateurs correspondant au genre et à l'orientation
        List<UserDto> allUsers = getByGenderAndOrientation(orientation, gender);


        // Journaliser les utilisateurs likés
        System.out.println("Liked User IDs: " + likedUsers.stream().map(UserLikeDto::getLikedUserId).collect(Collectors.toList()));

        // Journaliser tous les utilisateurs récupérés
        System.out.println("All User IDs: " + allUsers.stream().map(UserDto::getId).collect(Collectors.toList()));


        // Exclure les utilisateurs qui ont déjà été likés
        return allUsers.stream()
                .filter(user -> likedUsers.stream().noneMatch(likedUser -> likedUser.getLikedUserId() == user.getId()))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto save(UserDto userDto) {
        User u = DtoTool.convert(userDto, User.class);

        User insertUser = userRepository.saveAndFlush(u);

        return DtoTool.convert(insertUser, UserDto.class);

    }



    @Override
    public UserDto update(UserDto userDto) {
        User existingUser = userRepository.findById(userDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        System.out.println(existingUser.getAge());
        if (userDto.getAge() == null) {
            userDto.setAge(existingUser.getAge());
        }
        if (userDto.getPassword() == null) {
            userDto.setPassword(existingUser.getPassword());
        }
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
