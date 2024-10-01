package fr.tastymeet.apitastymeet.services.Impl;

import fr.tastymeet.apitastymeet.dto.*;
import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.services.Interface.IMatchService;
import fr.tastymeet.apitastymeet.services.Interface.IUserService;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import fr.tastymeet.apitastymeet.tools.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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


    @Autowired
    private PasswordService passwordService;

    /***********************************Afficher les utilisateurs***********************************/
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

        // Exclure les utilisateurs qui ont déjà été likés
        return allUsers.stream()
                .filter(user -> likedUsers.stream().noneMatch(likedUser -> likedUser.getLikedUserId() == user.getId()))
                .collect(Collectors.toList());
    }
    /**************************************************************************************************/

    /***********************************Enregistrer des utilisateurs(ou update le mot de passe)***********************************/
    @Override
    public UserDto save(UserDto userDto) {
        User u = DtoTool.convert(userDto, User.class);

        String hashedPassword = passwordService.hashPassword(u.getPassword());
        u.setPassword(hashedPassword);

        User insertUser = userRepository.saveAndFlush(u);

        return DtoTool.convert(insertUser, UserDto.class);

    }
    /**************************************************************************************************/
    /***********************************Update seulement l'email***********************************/
    @Override
    public UserDto updateEmail(UserDto userDto) {
        User u = DtoTool.convert(userDto, User.class);
        User insertUser = userRepository.saveAndFlush(u);
        return DtoTool.convert(insertUser, UserDto.class);
    }
    /**************************************************************************************************/
    /***********************************Update ALL sauf le mot de passe et l'age***********************************/
    @Override
    public UserDto update(UserDto userDto) {
        User existingUser = userRepository.findById(userDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
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
    /**************************************************************************************************/
    /***********************************Supprimer***********************************/
    @Override
    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

    /**************************************************************************************************/
    /***********************************Trouver un utilisateur par son l'ID***********************************/
    @Override
    public UserDto getById(long id){
        Optional<User> u= userRepository.findById(id);
        return DtoTool.convert(u, UserDto.class);
    }
}
