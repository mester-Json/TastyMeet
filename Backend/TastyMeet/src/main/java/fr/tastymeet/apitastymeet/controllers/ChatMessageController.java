package fr.tastymeet.apitastymeet.controllers;

import fr.tastymeet.apitastymeet.dto.ChatMessageDto;
import fr.tastymeet.apitastymeet.dto.ChatRoomDto;
import fr.tastymeet.apitastymeet.dto.UserLikeDto;
import fr.tastymeet.apitastymeet.services.ChatMessageServiceImpl;
import fr.tastymeet.apitastymeet.services.ChatRoomServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatMessageController {

    @Autowired
    private ChatRoomServiceImpl chatRoomService;

    @Autowired
    private ChatMessageServiceImpl chatMessageService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate; // Injecte le template de messagerie


    // Afficher 1 ChatRoom et son contenu (messages)
    @GetMapping("/messages/chatroom/{chatRoomId}")
    public ResponseEntity<ChatRoomDto> findChatRoom(@PathVariable("chatRoomId")long chatRoomId){
        //1-Vérifier si le chatRoom exist
        //1-1 récupérer la room en fonction de l'id
        ChatRoomDto chatRoomDto = chatRoomService.getById(chatRoomId);
        //1-2 Vérifier si l'id est null (existant)
        if(chatRoomDto == null){
            return ResponseEntity.notFound().build();
        }
        //2-Retourner les infos de la chatroom
        return ResponseEntity.ok(chatRoomDto);
    }

    // Affiche toutes les chatRoom du profile
    @GetMapping("/messages/profile/{senderId}")
    public ResponseEntity<List<ChatRoomDto>> findChatRoomUser(@PathVariable("senderId")long senderId){
        //1-Vérifier si le chatRoom exist
        //1-1 récupérer la room en fonction de l'id
        List<ChatRoomDto> chatRoomDto = chatRoomService.getChatRoom(senderId);
        //1-2 Vérifier si l'id est null (existant)
        if(chatRoomDto == null){
            return ResponseEntity.notFound().build();
        }
        //2-Retourner les infos de la chatroom
        return ResponseEntity.ok(chatRoomDto);
    }

    /*@PostMapping("/{roomId}/{userId}/{content}")
    public ResponseEntity<?> createMessage(@PathVariable long roomId, @PathVariable long userId, @PathVariable String content){
        chatMessageService.createMessage(roomId,userId,content);
        return ResponseEntity.ok("Send with success !!!!");
    }*/

    @MessageMapping("/message")
    public void sendMessage(@Payload ChatMessageDto chatMessageDto) throws Exception{

        chatMessageService.createMessage(chatMessageDto.getRoomId(), chatMessageDto.getSenderUserId(), chatMessageDto.getContent());

        // Envoie le message à tous les abonnés du topic "/topic/sendMessage/{roomId}"
        messagingTemplate.convertAndSend(
                "/topic/sendMessage/" + chatMessageDto.getRoomId(), // Envoie le message au bon topic
                chatMessageDto );// Le message à envoyer aux abonnés
    }

    /*@PostMapping("/{roomId}/{userId}/{content}")
    public ResponseEntity<?> createMessage(@PathVariable long roomId, @PathVariable long userId, @PathVariable String content){
        chatMessageService.createMessage(roomId,userId,content);
        return ResponseEntity.ok("Send with success !!!!");
    }*/
}
