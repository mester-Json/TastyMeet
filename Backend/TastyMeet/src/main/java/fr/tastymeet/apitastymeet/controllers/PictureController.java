package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.PictureDto;
import fr.tastymeet.apitastymeet.services.Interface.IPictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
public class PictureController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private IPictureService pictureService;

    @PostMapping(value="/upload/{id}", consumes = "multipart/form-data" )
    public ResponseEntity<String> uploadPhoto(@RequestPart("file") MultipartFile file, @PathVariable("id") long userId) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aucun fichier sélectionné.");
        }

        try {


            // Chemin où le fichier sera sauvegardé
            Path path = Paths.get(uploadDir + File.separator + file.getOriginalFilename());

            PictureDto dto = new PictureDto();
            dto.setPictureName(file.getOriginalFilename());
            dto.setUserId(userId);
            pictureService.save(dto);

            // Sauvegarde le fichier sur le système de fichiers
            Files.write(path, file.getBytes());

            return ResponseEntity.status(HttpStatus.OK).body("Fichier téléversé avec succès : " + file.getOriginalFilename());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors du téléversement du fichier.");
        }
    }


    @GetMapping("/show/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws IOException {
        // Chemin vers l'image dans le dossier resources/images
        Resource imgFile = new ClassPathResource("images/"+imageName);

        // Lire le fichier d'image sous forme de tableau de bytes
        // byte[] imageBytes = Files.readAllBytes(Path.of(imgFile.getURI()));

        // Ajouter les en-têtes nécessaires
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "image/jpeg");  // Ou "image/png" selon le type d'image

        return new ResponseEntity<>(imgFile, headers, HttpStatus.OK);
    }

    @DeleteMapping(value="delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") long id) throws Exception{
        PictureDto dto = pictureService.getById(id);
        if(dto !=null) {
            pictureService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("picture with id = " +id+" deleted.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No picture to delete.");
        }
    }
}
