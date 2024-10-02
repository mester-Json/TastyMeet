package fr.tastymeet.apitastymeet.services.Impl;

import fr.tastymeet.apitastymeet.dto.PictureDto;
import fr.tastymeet.apitastymeet.entities.Picture;
import fr.tastymeet.apitastymeet.repositories.PictureRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.services.Interface.IPictureService;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;

@Service
public class PictureServiceImpl implements IPictureService {

    @Autowired
    private PictureRepository pictureRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void uploadPicture(MultipartFile file, long userId) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Le fichier est vide");
        }

        String filename = file.getOriginalFilename();
        Path path = Paths.get(uploadDir + File.separator + filename);

        // Créer le PictureDto
        PictureDto dto = new PictureDto();
        dto.setPictureName(filename);
        dto.setUserId(userId);

        // Sauvegarde le fichier sur le système de fichiers
        Files.write(path, file.getBytes());

        // Conversion de PictureDto en Picture
        Picture picture = DtoTool.convert(dto, Picture.class);

        // Récupération de l'utilisateur et association à l'image
        picture.setUser(userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé")));

        // Sauvegarde de l'image et conversion du résultat en DTO
        DtoTool.convert(pictureRepository.saveAndFlush(picture), PictureDto.class);
    }


    @Override
    public void deleteById(long id) {
        Picture picture = pictureRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Picture not found with id: " + id));
        pictureRepository.delete(picture);
    }

}
