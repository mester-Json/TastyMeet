package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.*;
import fr.tastymeet.apitastymeet.services.Impl.PasswordService;
import org.springframework.http.HttpStatus;
import fr.tastymeet.apitastymeet.services.Interface.IPictureService;
import fr.tastymeet.apitastymeet.services.Interface.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.support.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private IPictureService pictureService;

    @Autowired
    private PasswordService passwordService;


    @GetMapping(value="/display", produces ="application/json")
    public List<UserDto> display(@RequestHeader("Authorization") String token) {
        // Appeler directement le service pour récupérer la liste des utilisateurs
        return userService.getDisplayableUsers(token);
    }


    @PostMapping(value = "/addUser", consumes = "multipart/form-data", produces = "application/json")
    public ResponseEntity<UserDto> save(@ModelAttribute UserDto userDto,
                                        @RequestPart(value = "file", required = false) MultipartFile file) throws Exception {
        // Sauvegarde des données utilisateur
        UserDto dto = userService.save(userDto);
        // Sauvegarde de l'image si elle est présente
        if (file != null && !file.isEmpty()) {
            try {
                pictureService.uploadPicture(file, dto.getId());
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
            }
        }
        return ResponseEntity.ok(dto);
    }

    @GetMapping(value="/profile/{id}", produces = "application/json")
    public UserDto displayProfileId(@PathVariable("id") long id) {
        return userService.getById(id);
    }

    @PostMapping("/verifyPassword")
    public ResponseEntity<String> verifyPassword(@RequestBody PasswordRequestDto passwordRequest) {
        try {
            // Appelle le service pour mettre à jour le mot de passe
            String message = userService.updatePassword(
                    passwordRequest.getId(),
                    passwordRequest.getCurrentPassword(),
                    passwordRequest.getNewPassword()
            );

            // Crée la réponse appropriée en fonction du message
            switch (message) {
                case "Mot de passe mis à jour avec succès":
                    return ResponseEntity.ok().body(message);
                case "Mot de passe actuel est incorrect":
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
                case "Utilisateur non trouvé":
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
            }
        } catch (Exception e) {
            // Gère l'exception ici
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du mot de passe : " + e.getMessage());
        }
    }

    @PostMapping(value = "/updateEmail", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> updateEmail(@RequestBody EmailUpdateRequestDto emailUpdateRequest) {
        try {
            // Appelle le service pour mettre à jour l'email
            String message = userService.updateEmail(emailUpdateRequest);

            // Retourne la réponse appropriée en fonction du message du service
            switch (message) {
                case "Email mis à jour avec succès.":
                    return ResponseEntity.ok(message);
                case "L'email actuel est incorrect.":
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
            }
        } catch (Exception e) {
            // Gère l'exception ici
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du mot de passe : " + e.getMessage());
        }
    }

    @PostMapping(value = "/update", consumes = "multipart/form-data", produces = "application/json")
    public ResponseEntity<UserDto> update(@ModelAttribute UserDto userDto) throws Exception {
        try {
            UserDto dto = userService.update(userDto);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (MethodArgumentNotValidException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}