package fr.tastymeet.apitastymeet.services.Interface;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface IPictureService {

    void uploadPicture(MultipartFile file, long userId) throws IOException;

    void deleteById(long id);

}
