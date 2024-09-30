package fr.tastymeet.apitastymeet.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
<<<<<<< HEAD
        ObjectMapper mapper = new ObjectMapper();
        // Enregistrement du module JSR310 pour Java 8
        mapper.registerModule(new JavaTimeModule());
        return mapper;
=======
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // Enregistrement du module JavaTime
        return objectMapper;
>>>>>>> 60bce07a5f0cbcc7aef06a2781db5612097e8f8d
    }
}
