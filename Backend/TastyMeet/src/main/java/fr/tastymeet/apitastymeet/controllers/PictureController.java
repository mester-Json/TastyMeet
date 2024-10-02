package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.services.Interface.IPictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class PictureController {

    @Autowired
    private IPictureService pictureService;

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

    @GetMapping("/show/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws IOException {
        Resource imgFile = new ClassPathResource("images/" + imageName);
        String contentType = Files.probeContentType(Paths.get(imgFile.getURI()));

        return ResponseEntity.ok()
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
