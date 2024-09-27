package fr.tastymeet.apitastymeet.services;

import fr.tastymeet.apitastymeet.dto.PictureDto;
import fr.tastymeet.apitastymeet.entities.Picture;

import java.util.List;

public interface IPictureService {
    PictureDto save(PictureDto pictureDto);

    List<PictureDto> getPictureByUserId(long userId);

    void deleteById(long id);

    PictureDto getById(long id);
}
