package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.PictureDto;
import fr.tastymeet.apitastymeet.services.IPictureService;
import fr.tastymeet.apitastymeet.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
import java.util.List;

@RestController
@RequestMapping("/api")
public class PictureController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private IPictureService pictureService;

    @PostMapping(value="/upload/{id}", consumes = "multipart/form-data" )
    public ResponseEntity<String> uploadPhoto(@RequestParam("file") MultipartFile file, @PathVariable("id") long userId) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aucun fichier sélectionné.");
        }

        try {


            // Chemin où le fichier sera sauvegardé
            Path path = Paths.get(uploadDir + File.separator + file.getOriginalFilename());

            PictureDto dto = new PictureDto();
            dto.setPictureName(file.getOriginalFilename());
            dto.setPathPicture(String.valueOf(path));
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

    @GetMapping(value="display/images/{id}", produces = "application/json")
    public ResponseEntity<List<Path>> displayImage(@PathVariable("id") long userId) {
        List<PictureDto> dtos = pictureService.getPictureByUserId(userId);
        List<Path> paths= new ArrayList<>();
        for(PictureDto dto: dtos){
            paths.add(Path.of(dto.getPathPicture()));
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(paths);

    }

   /* @GetMapping("/show")
    public ResponseEntity<byte[]> getImage() throws IOException {
        // Chemin vers l'image dans le dossier resources/images
        Resource imgFile = new ClassPathResource("images/your-image.jpg");

        // Lire le fichier d'image sous forme de tableau de bytes
        byte[] imageBytes = Files.readAllBytes(Path.of(imgFile.getURI()));

        // Ajouter les en-têtes nécessaires
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "image/jpeg");  // Ou "image/png" selon le type d'image

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }*/
}
