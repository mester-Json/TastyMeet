package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.services.Interface.IPictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class PictureController {

    @Autowired
    private IPictureService pictureService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping(value="/upload/{id}", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadPhoto(@RequestPart("file") MultipartFile file, @PathVariable("id") long userId) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Aucun fichier sélectionné.");
        }
        try {
            pictureService.uploadPicture(file, userId);
            return ResponseEntity.ok("Fichier téléversé avec succès : " + file.getOriginalFilename());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors du téléversement du fichier.");
        }
    }

    @GetMapping("/show/{userId}/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable long userId, @PathVariable String imageName) throws IOException {
        // Définir le chemin vers le sous-dossier utilisateur
        Path userDirectory = Paths.get(uploadDir + File.separator + "user_" + userId);

        // Chemin complet de l'image dans le sous-dossier
        Path imagePath = userDirectory.resolve(imageName);

        // Vérifier si le fichier existe
        if (!Files.exists(imagePath)) {
            throw new FileNotFoundException("Fichier non trouvé : " + imageName);
        }

        // Charger l'image comme ressource
        Resource imgFile = new UrlResource(imagePath.toUri());

        // Déterminer le type MIME du fichier
        String contentType = Files.probeContentType(imagePath);

        return ResponseEntity.ok()
                //informer le client du type de fichier (permet de pouvoir grâce a ça, traiter et afficher le contenu en fonction du fichier multimédia
                .contentType(MediaType.parseMediaType(contentType))
                .body(imgFile);
    }


    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") long id) {
        try {
            pictureService.deleteById(id);
            return ResponseEntity.ok("Picture with id = " + id + " deleted.");
        } catch (NoSuchElementException e) { //Si l'élement n'existe pas
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No picture found to delete.");
        }
    }
}
