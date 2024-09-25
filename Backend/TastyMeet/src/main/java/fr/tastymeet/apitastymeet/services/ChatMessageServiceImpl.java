package fr.tastymeet.apitastymeet.services;

import fr.tastymeet.apitastymeet.dto.ChatMessageDto;
import fr.tastymeet.apitastymeet.dto.ChatRoomDto;
import fr.tastymeet.apitastymeet.dto.UserChatDto;
import fr.tastymeet.apitastymeet.dto.UserDto;
import fr.tastymeet.apitastymeet.entities.ChatMessage;
import fr.tastymeet.apitastymeet.entities.ChatRoom;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.ChatMessageRepository;
import fr.tastymeet.apitastymeet.repositories.ChatRoomRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class ChatMessageServiceImpl {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private ChatRoomServiceImpl chatRoomService;
    @Autowired
    private ChatMessageRepository chatMessageRepository;



    public void createMessage(long roomId, long userId, String content){
        //1-Récupérer l'id de la Room où le message sera écrit
        ChatRoom chatRoom = chatRoomRepository.findByChatRoomId(roomId);
        //2-Récupérer le User qui écrit
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Le User n'existe pas"));
        //3-Crée un message pour le user concerné
        List<ChatMessage> chatMessage = chatMessageRepository.findBySenderUser_Id(userId);
        ChatMessage message = new ChatMessage();
        message.setSenderUser(user); // Assurez-vous de définir l'utilisateur
        message.setContent(content);
        message.setRoom(chatRoom); // Si nécessaire, associez la ChatRoom
        chatMessage.add(message);

        //3-1-Ajouter le message à la ChatRoom
        chatRoom.getMessages().add(message);

        //4-Convertir le message en MessageDto
        ChatMessageDto dto = chatMessageToChatMessageDto(message);

        chatMessageRepository.saveAllAndFlush(chatMessage);
    }

    private ChatMessageDto chatMessageToChatMessageDto(ChatMessage chatMessage){
        ChatMessageDto dto = new ChatMessageDto();
        dto.setChatId(chatMessage.getChatId());

        //Convertir le User avec l'id concerné avec un UserChatDto
        dto.setSenderUser(userToUserChatDto(chatMessage));
        //Récuperer le contenu du message
        dto.setContent(chatMessage.getContent());
        //Recupérer la date du message
        dto.setDateMessage(chatMessage.getDateMessage());
        //Convertir un ChatRoom en ChatRoomDto
        dto.setRoom(chatRoomToChatRoomDto(chatMessage.getRoom()));



        return dto;
    }

    private ChatRoomDto chatRoomToChatRoomDto(ChatRoom room) {
        ChatRoomDto chatRoomDto = new ChatRoomDto();
        chatRoomDto.setChatRoomId(room.getChatRoomId());
        chatRoomDto.setRoomUsers(usersToUserChatDto(room.getRoomUsers()));
        chatRoomDto.setMessages(convertMessagesToChatMessageDtos(room.getMessages()));
        return chatRoomDto;
    }


    private Set<UserChatDto> usersToUserChatDto(Collection<User> users) {
        Set<UserChatDto> userChatDtos = new HashSet<>();
        for (User user : users) {
            UserChatDto userChatDto = new UserChatDto();
            userChatDto.setId(user.getId());
            userChatDto.setFirstName(user.getFirstName());
            // Convertir les messages de l'utilisateur s'il y a lieu
            userChatDto.setMessages(convertMessagesToChatMessageDtos(user.getMessages()));
            userChatDtos.add(userChatDto);
        }
        return userChatDtos;
    }


    // Méthode pour convertir une liste de ChatMessage en une liste de ChatMessageDto
    private List<ChatMessageDto> convertMessagesToChatMessageDtos(List<ChatMessage> messages) {
        List<ChatMessageDto> chatMessageDtos = new ArrayList<>();
        for (ChatMessage message : messages) {
            ChatMessageDto chatMessageDto = new ChatMessageDto();
            chatMessageDto.setChatId(message.getChatId());
            chatMessageDto.setContent(message.getContent());
            chatMessageDto.setDateMessage(message.getDateMessage());

            // Convertir et ajouter l'utilisateur associé au message
            UserChatDto userChatDto = new UserChatDto();
            userChatDto.setId(message.getSenderUser().getId());
            userChatDto.setFirstName(message.getSenderUser().getFirstName());

            chatMessageDto.setSenderUser(userChatDto);

            // Optionnel: Ajouter la ChatRoomDto si nécessaire
            ChatRoomDto chatRoomDto = new ChatRoomDto();
            chatRoomDto.setChatRoomId(message.getRoom().getChatRoomId());
            chatMessageDto.setRoom(chatRoomDto);

            chatMessageDtos.add(chatMessageDto);
        }
        return chatMessageDtos;
    }

    private UserChatDto userToUserChatDto(ChatMessage chatMessage) {
        UserChatDto userDto = new UserChatDto();
        userDto.setId(chatMessage.getSenderUser().getId());
        userDto.setFirstName(chatMessage.getSenderUser().getFirstName());
        // On peut mapper d'autres propriétés si nécessaire
        return userDto;
    }



    /*// Permet de créer un message dans une room en fonction de la personne qui écrit
    public void createMessage(ChatRoom room, long senderId, String content){
        //1-Récuperer l'id de la room
        ChatRoom chatRoom = chatRoomRepository.findById(room.getChatRoomId())
                .orElseThrow(() -> new RuntimeException("ChatRoom not found"));
        //2-Récupérer le user qui écrit grace a l'id du senderId
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("User not found")); // On récupère le User concerné
        //3-Récupérer le contenu du message et l'affilié au User
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setSenderUser(sender);
        chatMessage.setContent(content);
        chatMessage.setRoom(room);
        //4-Ajouter le message à la liste des message du user et de la room
        sender.getMessages().add(DtoTool.convert(chatMessage, ChatMessage.class));
        chatRoom.getMessages().add(chatMessage);
    }*/

    /*// On veux pouvoir supprimé un message en fonction de son Id
    public void deleteMessageById(long chatMessageId){
        //1-Supprimer le message de la room
        ChatRoom chatRoom = chatRoomRepository.findByChatMessageId(chatMessageId);
        chatRoom.getMessages().remove(chatRoomRepository.findChatMessageById(chatMessageId));
        //2-Supprimer le message en fonction de son Id
        chatMessageRepository.deleteById(chatMessageId);
    }

    // On veux pouvoir modifier un message en fonction de son Id
    public ChatMessageDto UpdateMessageById(ChatMessageDto messageDto){
        ChatMessage chatMessage = DtoTool.convert(messageDto, ChatMessage.class);
        ChatMessage insertMessage = ChatMessageRepository.saveAndFlush(chatMessage);

        return DtoTool.convert(insertMessage, ChatMessageDto.class);
    }*/


    /*public List<ChatMessage> showMessage(long senderId, long recipientId){
        // On souhaite afficher les messages concernant un user a et b dans le chatRoom concerné
        //1-Récupérer l'id de la chatRoom en fonction du user a et b
        ChatRoom chatRoom = chatRoomService.getChatRoom(senderId, recipientId);
        //2-Afficher le message
        return chatRoom.getMessages();
    }*/
}
