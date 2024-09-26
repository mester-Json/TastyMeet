package fr.tastymeet.apitastymeet.services.Impl;

import fr.tastymeet.apitastymeet.dto.PictureDto;
import fr.tastymeet.apitastymeet.entities.Picture;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.PictureRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.services.Interface.IPictureService;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PictureServiceImpl implements IPictureService {

    @Autowired
    private PictureRepository pictureRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public PictureDto save(PictureDto pictureDto) {

        Picture picture= DtoTool.convert(pictureDto, Picture.class);

        User u = userRepository.findById(pictureDto.getUserId()).get();

        picture.setUser(u);

        Picture insertedPicture= pictureRepository.saveAndFlush(picture);

        return DtoTool.convert(insertedPicture, PictureDto.class);

    }

    @Override
    public List<PictureDto> getPictureByUserId(long userId){
        List<PictureDto> resultPictures= new ArrayList<>();

        List<Picture> entities = pictureRepository.findByUserId(userId);

        for(Picture p : entities) {
            resultPictures.add(DtoTool.convert(p,PictureDto.class));
        }
        return resultPictures;

    }

    @Override
    public void deleteById(long id) {
        pictureRepository.deleteById(id);
    }

    @Override
    public PictureDto getById(long id) {
       Optional<Picture> optional= pictureRepository.findById(id);
       if(optional.isPresent()){
           Picture p = optional.get();
           return DtoTool.convert(p, PictureDto.class);
       }else {
           return null;
       }

    }

}
