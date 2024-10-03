package fr.tastymeet.apitastymeet.services.Impl;

import fr.tastymeet.apitastymeet.dto.ChatMessageDto;
import fr.tastymeet.apitastymeet.dto.UserChatDto;
import fr.tastymeet.apitastymeet.dto.UserDto;
import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.entities.Picture;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.ChatMessageRepository;
import fr.tastymeet.apitastymeet.repositories.PictureRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.services.Interface.IChatMessageService;
import fr.tastymeet.apitastymeet.services.Interface.IUserService;
import fr.tastymeet.apitastymeet.tools.DtoTool; // Importer la classe DtoTool
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ChatMessageServiceImpl implements IChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IUserService userService;

    @Autowired
    private PictureRepository pictureRepository;

    // Enregistrer un nouveau message
    @Override
    public ChatMessageDto sendMessage(ChatMessage chatMessage, long conversationId) {

        // Initialiser la date d'envoi si elle est nulle
        if (chatMessage.getDateEnvoie() == null) {
            chatMessage.setDateEnvoie(LocalDateTime.now());
        }

        // Récupérer l'utilisateur en fonction de senderId
        UserDto user = userService.getById(chatMessage.getSender().getId());

        // Convertir UserDto en UserChatDto
        UserChatDto userChatDto = DtoTool.convert(user, UserChatDto.class);

        // Convertir ChatMessage en ChatMessageDto
        ChatMessageDto chatMessageDto = DtoTool.convert(chatMessage, ChatMessageDto.class);

        // Assigner l'expéditeur au DTO du message
        chatMessageDto.setSender(userChatDto); // Cette ligne reste nécessaire

        // Enregistrer le message dans la base de données
        chatMessageRepository.save(chatMessage);

        return chatMessageDto; // Retourner le DTO
    }



    //Récuperer les messages grâce a l'id d'une conversation (permet de récuperer l'historique d'une conversation pour l'afficher)
    @Override
    public Map<String, Object> getMessagesByConversationId(long conversationId) {
        // Récupérer les messages par ID de conversation
        List<ChatMessage> messages = chatMessageRepository.findByConversationId(conversationId);

        // Convertir les messages en DTO
        List<Map<String, Object>> messageDtos = messages.stream()
                .map(message -> {
                    Map<String, Object> messageDto = new HashMap<>();
                    // une sous map qui nous permet de récuperer seulement l'id et pas d'autre information
                    messageDto.put("sender", Map.of("id", message.getSender().getId()));
                    messageDto.put("content", message.getContent());
                    messageDto.put("dateEnvoie", message.getDateEnvoie()); // Ou convertis au format désiré
                    return messageDto;
                })
                .collect(Collectors.toList());

        // Créer une liste d'IDs d'utilisateurs pour éviter les doublons
        Set<Long> userIds = messages.stream()
                .map(message -> message.getSender().getId())
                .collect(Collectors.toSet());

        // Récupérer les utilisateurs par leurs IDs
        List<User> users = userRepository.findAllById(userIds);

        //Pour eviter de repèter plusieurs fois les informations des utilisateurs (images, prenom)
        // Convertir les utilisateurs en DTO
        Map<Long, Map<String, Object>> userDtos = users.stream()
                .map(user -> {
                    Map<String, Object> userDto = new HashMap<>();
                    userDto.put("id", user.getId());
                    userDto.put("firstName", user.getFirstName());

                    // Récupérer les images de l'utilisateur
                    List<Picture> pictures = pictureRepository.findByUserId(user.getId());
                    List<Map<String, Object>> pictureDtos = pictures.stream()
                            .map(picture -> {
                                Map<String, Object> pictureDto = new HashMap<>();
                                pictureDto.put("pictureName", picture.getPictureName());
                                return pictureDto;
                            })
                            .collect(Collectors.toList());

                    userDto.put("pictures", pictureDtos);
                    // Créer une entrée Map avec l'ID de l'utilisateur (pour associer chaque utilisateur a son DTO)
                    return Map.entry(user.getId(), userDto);
                })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue)); // Utiliser les clés et valeurs


        // Construction de la réponse
        Map<String, Object> response = new HashMap<>();
        response.put("users", userDtos); // Utilisateurs id, prenom et images
        response.put("messages", messageDtos); // Messages simplifiés avec ID de l'expéditeur

        return response;
    }
}
