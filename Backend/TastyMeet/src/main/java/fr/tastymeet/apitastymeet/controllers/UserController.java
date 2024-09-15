package fr.tastymeet.apitastymeet.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import fr.tastymeet.apitastymeet.dto.EmailUpdateRequestDto;
import fr.tastymeet.apitastymeet.dto.PasswordRequestDto;
import fr.tastymeet.apitastymeet.dto.PictureDto;
import org.springframework.http.HttpStatus;
import fr.tastymeet.apitastymeet.dto.UserDto;
import fr.tastymeet.apitastymeet.entities.Gender;
import fr.tastymeet.apitastymeet.services.IPictureService;
import fr.tastymeet.apitastymeet.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

  /*  @PostMapping(value="/addUser", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> save(@RequestBody UserDto userDto) throws Exception {

        UserDto dto = userService.save(userDto);

        return ResponseEntity.status(HttpStatus.OK).body(dto);

    }*/

    @PostMapping(value = "/addUser", consumes = "multipart/form-data", produces = "application/json")
    public ResponseEntity<UserDto> save(@ModelAttribute UserDto userDto,
                                        @RequestPart(value = "file", required = false) MultipartFile file) throws Exception {

        // Sauvegarde des données utilisateur
        UserDto dto = userService.save(userDto);

        if (file != null && !file.isEmpty()) {
            try {
                // Chemin où le fichier sera sauvegardé
                Path path = Paths.get(uploadDir + File.separator + file.getOriginalFilename());

                PictureDto picturedto = new PictureDto();
                picturedto.setPictureName(file.getOriginalFilename());
                picturedto.setUserId(dto.getId());
                pictureService.save(picturedto);

                // Sauvegarde le fichier sur le système de fichiers
                Files.write(path, file.getBytes());

            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

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

    @PostMapping("/verifyPassword")
    public ResponseEntity<String> verifyPassword(@RequestBody PasswordRequestDto passwordRequest) {
        try {
            // Extraire les informations de la requête
            String currentPassword = passwordRequest.getCurrentPassword();
            long id = passwordRequest.getId();

            UserDto user = userService.getById(id);

            // Vérification du mot de passe actuel
            if (user != null && user.getPassword().equals(currentPassword)) {
                if(passwordRequest.getNewPassword().equals(passwordRequest.getConfirmNewPassword())) {

                    user.setPassword(passwordRequest.getNewPassword());
                    userService.save(user);
                    return ResponseEntity.ok().body("Mot de passe mis à jour avec succès");
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Les nouveaux mot de passe ne correspondent pas.");
                }

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mot de passe actuel est incorrect");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la mise à jour du mot de passe");
        }
    }

    @PostMapping(value = "/updateEmail", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> updateEmail(@RequestBody EmailUpdateRequestDto emailUpdateRequest) {
        try {
            UserDto user = userService.getById(emailUpdateRequest.getId());

            // Vérifiez que l'email actuel correspond à celui stocké
            if (user != null && user.getEmail().equals(emailUpdateRequest.getCurrentEmail())) {
                // Vérifiez que les nouveaux emails sont identiques
                if (emailUpdateRequest.getNewEmail().equals(emailUpdateRequest.getConfirmNewEmail())) {
                    // Mettre à jour l'email de l'utilisateur
                    user.setEmail(emailUpdateRequest.getNewEmail());
                    userService.save(user);
                    return ResponseEntity.ok("Email mis à jour avec succès.");
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Les nouveaux emails ne correspondent pas.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("L'email actuel est incorrect.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la mise à jour de l'email.");
        }
    }


    @PostMapping(value = "/update", consumes = "multipart/form-data", produces = "application/json")
    public ResponseEntity<UserDto> update(@ModelAttribute UserDto userDto) throws Exception {

        // Sauvegarde des données utilisateur
        UserDto dto = userService.save(userDto);



        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }


}
