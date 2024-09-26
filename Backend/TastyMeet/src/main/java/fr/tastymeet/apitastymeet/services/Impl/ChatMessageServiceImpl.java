package fr.tastymeet.apitastymeet.services.Impl;
import fr.tastymeet.apitastymeet.dto.ChatMessageDto;
import fr.tastymeet.apitastymeet.dto.PictureDto;
import fr.tastymeet.apitastymeet.dto.UserChatDto;
import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.entities.Picture;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.ChatMessageRepository;
import fr.tastymeet.apitastymeet.repositories.PictureRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.services.Interface.IChatMessageService;
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
    private PictureRepository pictureRepository;

    // Enregistrer un nouveau message
    @Override
    public ChatMessageDto sendMessage(ChatMessage chatMessage) {
        // Récupérer l'expéditeur à partir de son ID
        User sender = userRepository.findById(chatMessage.getSenderId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Picture> pictures = pictureRepository.findByUserId(sender.getId());
        sender.setPictures(pictures);

        // Créer le DTO pour le message de chat
        ChatMessageDto chatMessageDto = DtoTool.convert(chatMessage, ChatMessageDto.class);
        chatMessageDto.setSender(DtoTool.convert(sender, UserChatDto.class)); // Convertir l'utilisateur en DTO
        chatMessageDto.setDateEnvoie(LocalDateTime.now());

        // Enregistrer le message dans la base de données
        chatMessageRepository.save(chatMessage);

        // Retourner le DTO
        return chatMessageDto;
    }
    @Override
    public Map<String, Object> getMessagesByConversationId(Long conversationId) {
        // Récupérer les messages par ID de conversation
        List<ChatMessage> messages = chatMessageRepository.findByConversationId(conversationId);

        // Créer une liste d'IDs d'utilisateurs pour éviter les doublons
        Set<Long> userIds = messages.stream()
                .map(ChatMessage::getSenderId)
                .collect(Collectors.toSet());

        // Récupérer les utilisateurs par leurs IDs
        List<User> users = userRepository.findAllById(userIds);

        // Convertir les utilisateurs en DTO
        Map<Long, UserChatDto> userDtos = users.stream()
                .map(user -> {
                    UserChatDto userChatDto = DtoTool.convert(user, UserChatDto.class);
                    // Récupérer les images de l'utilisateur
                    List<Picture> pictures = pictureRepository.findByUserId(user.getId());
                    List<PictureDto> pictureDtos = pictures.stream()
                            .map(picture -> DtoTool.convert(picture, PictureDto.class)) // Utiliser DtoTool pour la conversion
                            .collect(Collectors.toList());
                    userChatDto.setPictures(pictureDtos); // Ajouter les images ici
                    return userChatDto;
                })
                .collect(Collectors.toMap(UserChatDto::getId, userChatDto -> userChatDto));

        // Conversion des messages en DTO
        List<ChatMessageDto> messageDtos = messages.stream()
                .map(this::convertMessageToDto)
                .collect(Collectors.toList());

        // Construction de la réponse
        Map<String, Object> response = new HashMap<>();
        response.put("users", userDtos);
        response.put("messages", messageDtos);

        return response;
    }

    private ChatMessageDto convertMessageToDto(ChatMessage message) {
        return DtoTool.convert(message, ChatMessageDto.class); // Utiliser DtoTool pour la conversion
    }

    // Récupérer le dernier message d'une conversation
    @Override
    public String getLastMessage(Long conversationId) {
        ChatMessage lastMessage = chatMessageRepository.findFirstByConversationIdOrderByDateEnvoieDesc(conversationId);
        return lastMessage != null ? lastMessage.getContent() : "Pas de message";
    }
}
