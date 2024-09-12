package fr.tastymeet.apitastymeet.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.tastymeet.apitastymeet.dto.PictureDto;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;
import fr.tastymeet.apitastymeet.dto.UserDto;
import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.services.IPictureService;
import fr.tastymeet.apitastymeet.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private IPictureService pictureService;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping(value="/display/{gender}/{orientation}", produces ="application/json")
    public List<UserDto> display(@PathVariable("gender") Gender gender, @PathVariable("orientation") Gender orientation) {

        List<UserDto> users = userService.getByGenderAndOrientation(gender,orientation);
        return users;
    }

    @GetMapping(value="/display", produces="application/json")
    public List<UserDto> display(){
        return userService.getByAll();
    }

    @PostMapping(value="/addUser", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> save(@RequestBody UserDto userDto) throws Exception {

        UserDto dto = userService.save(userDto);

        return ResponseEntity.status(HttpStatus.OK).body(dto);

    }

    @PostMapping(value="/connection", consumes="multipart/form-data", produces="text/plain")
    public ResponseEntity<String> connection(@RequestParam("email") String email, @RequestParam("password") String password) throws Exception {

        UserDto dto = userService.getByEmail(email);
        System.out.println(dto.getPassword());
        System.out.println(password);

        if(dto.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.OK).body("Vous êtes connectés.");
        }else{
            return ResponseEntity.status(HttpStatus.OK).body("Votre email ou votre mot de passe est éronné.");
        }
    }

}
