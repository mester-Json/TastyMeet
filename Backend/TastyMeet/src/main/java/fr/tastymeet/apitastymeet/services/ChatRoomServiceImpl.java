package fr.tastymeet.apitastymeet.services;

import fr.tastymeet.apitastymeet.dto.ChatRoomDto;
import fr.tastymeet.apitastymeet.entities.ChatRoom;
import fr.tastymeet.apitastymeet.entities.User;
import fr.tastymeet.apitastymeet.repositories.ChatRoomRepository;
import fr.tastymeet.apitastymeet.repositories.UserRepository;
import fr.tastymeet.apitastymeet.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChatRoomServiceImpl implements IChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private UserRepository userRepository;


    // Permet de créer un room lorsque l'on obtient un match entre 2 user (à appeler si match !!!!!!!!)
    @Override
    public void createRoom(long sendId, long recipientId){
        User userSender = userRepository.findById(sendId).orElseThrow(() -> new RuntimeException("User not found"));
        User userRecipient = userRepository.findById(recipientId).orElseThrow(() -> new RuntimeException("User not found"));
        ChatRoom newChatroom = new ChatRoom().setRoomUsers(Set.of(userSender, userRecipient));
        chatRoomRepository.saveAndFlush(newChatroom);
    }


    // Permet de retourner l'id de la room en fonction des 2 users pour afficher par la suite la room sur le site
    @Override
    public List<ChatRoomDto> getChatRoom(long senderId){
        List<ChatRoom> ch = chatRoomRepository.findByRoomUsers_Id(senderId);
        List<ChatRoomDto> chatRoomDtos = new ArrayList<>();
        // Convertit chaque ChatRoom en ChatRoomDto et les ajoute à la liste chatRoomDtos
        for (ChatRoom chatRoom : ch) {
            chatRoomDtos.add(DtoTool.convert(chatRoom, ChatRoomDto.class));
        }
        return chatRoomDtos;
    }

    @Override
    public ChatRoomDto getById(long chatRoomId){
        // Récupère le ChatRoom correspondant depuis le repository
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow();

        // Convertir le ChatRoom en ChatRoomDto
        return DtoTool.convert(chatRoom, ChatRoomDto.class);
    }

    /*public ChatRoomDto convertToChatRoomDto(ChatRoom chatRoom) {
        // Créer un ChatRoomDto
        ChatRoomDto chatRoomDto = new ChatRoomDto();

        // Set l'ID de la ChatRoom
        chatRoomDto.setChatRoomId(chatRoom.getChatRoomId());

        // Convertir et ajouter la liste des utilisateurs dans le ChatRoomDto
        chatRoomDto.setRoomUsers(convertUsersToUserChatDtos(chatRoom.getRoomUsers()));

        // Convertir et ajouter la liste des messages dans le ChatRoomDto
        chatRoomDto.setMessages(convertMessagesToChatMessageDtos(chatRoom.getMessages()));

        return chatRoomDto;
    }*/

   /* // Méthode pour convertir une collection de User en une collection de UserChatDto
    private Set<UserChatDto> convertUsersToUserChatDtos(Collection<User> users) {
        Set<UserChatDto> userChatDtos = new HashSet<>();
        for (User user : users) {
            UserChatDto userChatDto = new UserChatDto();
            userChatDto.setId(user.getId());
            userChatDto.setFirstName(user.getFirstName());
            // Convertir les messages de l'utilisateur s'il y a lieu
            //userChatDto.setMessages(convertMessagesToChatMessageDtos(user.getMessages()));
            //userChatDto.setPicture();
            userChatDtos.add(userChatDto);
        }
        return userChatDtos;
    }*/

/*    // Méthode pour convertir une liste de ChatMessage en une liste de ChatMessageDto
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

            chatMessageDto.setSenderUser(userChatDto.getId());

            // Optionnel: Ajouter la ChatRoomDto si nécessaire
            ChatRoomDto chatRoomDto = new ChatRoomDto();
            chatRoomDto.setChatRoomId(message.getRoom().getChatRoomId());
            chatMessageDto.setRoomId(chatRoomDto.getChatRoomId());

            chatMessageDtos.add(chatMessageDto);
        }
        return chatMessageDtos;
    }*/



    /*@Override
    public List<ChatMessage> showMessage(long senderId, long recipientId){
        // On souhaite afficher les messages concernant un user a et b dans le chatRoom concerné
        //1-Récupérer l'id de la chatRoom en fonction du user a et b
        ChatRoom chatRoom = getChatRoom(senderId, recipientId);
        //2-Afficher le message
        return chatRoom.getMessages();
    }*/
}
