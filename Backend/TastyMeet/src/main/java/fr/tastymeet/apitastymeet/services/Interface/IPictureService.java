package fr.tastymeet.apitastymeet.services.Interface;

import fr.tastymeet.apitastymeet.dto.PictureDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IPictureService {

    void uploadPicture(MultipartFile file, long userId) throws IOException;

    void deleteById(long id);

}
