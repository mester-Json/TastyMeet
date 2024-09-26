package fr.tastymeet.apitastymeet.tools;

import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.entities.Picture;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class DtoTool {

    private static ModelMapper mapper = new ModelMapper();

    static {
        // Ajoutez un convertisseur pour convertir PersistentBag en List
        Converter<Collection, List> persistentBagToListConverter = new Converter<Collection, List>() {
            @Override
            public List convert(MappingContext<Collection, List> context) {
                return new ArrayList<>(context.getSource());
            }
        };

        mapper.addConverter(persistentBagToListConverter);
    }

    public static <TSource, TDestination> TDestination convert(TSource source, Class<TDestination> clazz) {
        return mapper.map(source, clazz);
    }



}
