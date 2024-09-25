package fr.tastymeet.apitastymeet.services;

import fr.tastymeet.apitastymeet.dto.ChatMessageDto;
import fr.tastymeet.apitastymeet.dto.UserChatDto;
import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.ChatMessageRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatMessageService {


    @Autowired
    private ChatMessageRepository chatMessageRepository;
    @Autowired
    private UserRepository userRepository;

    // Enregistrer un nouveau message
    /*public void sendMessage(ChatMessage message) {
        chatMessageRepository.save(message);
    }*/
    public ChatMessageDto sendMessage(ChatMessage chatMessage) {
        // Récupérer l'expéditeur à partir de son ID
        User sender = userRepository.findById(chatMessage.getSenderId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Créer le DTO pour l'expéditeur
        UserChatDto userChatDto = new UserChatDto();
        userChatDto.setFirstName(sender.getFirstName()); // Utilisez le champ que vous avez dans votre entité User
        // Remplir la liste des pictures si nécessaire, par exemple
        // userChatDto.setPictures(sender.getPictures()); // Si vous avez une méthode pour récupérer les images

        // Créer le DTO pour le message de chat
        ChatMessageDto chatMessageDto = new ChatMessageDto();
        chatMessageDto.setSenderId(sender.getId());
        chatMessageDto.setContent(chatMessage.getContent());
        chatMessageDto.setSender(userChatDto);
        chatMessageDto.setDateEnvoie(LocalDateTime.now()); // Définir la date d'envoi

        // Enregistrer le message dans la base de données
        chatMessageRepository.save(chatMessage);

        // Retourner le DTO
        return chatMessageDto;
    }

    // Récupérer l'historique des messages d'une conversation
    public List<ChatMessage> getMessagesByConversationId(Long conversationId) {
        return chatMessageRepository.findByConversationIdOrderByDateEnvoieAsc(conversationId);
    }

    // Récupérer le dernier message d'une conversation
    public String getLastMessage(Long conversationId) {
        ChatMessage lastMessage = chatMessageRepository.findFirstByConversationIdOrderByDateEnvoieDesc(conversationId);
        return lastMessage != null ? lastMessage.getContent() : "Pas de message";
    }
}

