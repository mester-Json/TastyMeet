package fr.tastymeet.apitastymeet.entities;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;
    @Version
    private int version;
    private String pathPicture;
    private String pictureName;
    @ManyToOne
    private User user;
}
