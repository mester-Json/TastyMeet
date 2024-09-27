package fr.tastymeet.apitastymeet.configuration;

import fr.tastymeet.apitastymeet.entities.Gender;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToGenderConverter implements Converter<String, Gender> {
    @Override
    public Gender convert(String source) {
        return Gender.valueOf(source.toUpperCase());
    }
}