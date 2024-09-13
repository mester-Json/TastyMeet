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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private IPictureService pictureService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PictureController pictureController;

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
   /* @PostMapping(value="/addUser", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> save(@RequestBody UserDto userDto) throws Exception {

        UserDto dto = userService.save(userDto);

        return ResponseEntity.status(HttpStatus.OK).body(dto);

    }*/

    @PostMapping(value="/addUser", consumes = "multipart/form-data", produces = "application/json")
    public ResponseEntity<UserDto> save(@ModelAttribute UserDto userDto, @RequestPart("file") MultipartFile file) throws Exception {

        UserDto dto = userService.save(userDto);

        try {
            // Chemin où le fichier sera sauvegardé
            Path path = Paths.get(uploadDir + File.separator + file.getOriginalFilename());

            PictureDto picturedto = new PictureDto();
            picturedto.setPictureName(file.getOriginalFilename());
            picturedto.setPathPicture(String.valueOf(path));
            picturedto.setUserId(dto.getId());
            pictureService.save(picturedto);

            // Sauvegarde le fichier sur le système de fichiers
            Files.write(path, file.getBytes());

            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
        }
    }

   /* @CrossOrigin(origins = "http://localhost:5173")
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
    }*/

    @GetMapping(value="/profile/{id}", produces = "application/json")
    public UserDto displayProfileId(@PathVariable("id") long id) {

        UserDto user = userService.getById(id);
        return user;
    }

    @PostMapping(value = "/connection", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Map<String, String>> connection(@RequestBody Map<String, String> payload) throws Exception {

        String email = payload.get("email");
        String password = payload.get("password");

        UserDto dto = userService.getByEmail(email);

        Map<String, String> response = new HashMap<>();

        if (dto.getPassword().equals(password)) {
            response.put("message", "vous êtes connectés.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            response.put("message", "votre email ou votre mot de passe est erroné.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}
