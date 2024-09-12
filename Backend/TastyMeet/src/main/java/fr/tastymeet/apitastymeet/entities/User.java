package fr.tastymeet.apitastymeet.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Version
    private int version;
    @Column(name = "lastName", nullable = false)
    private String lastName;
    @Column(name = "firstName", nullable = false)
    private String firstName;
    @Column(name = "age", nullable = false)
    private LocalDate age;
    @Column(name = "description", nullable = true)
    private String description;
    @Column(unique = true, name = "email", nullable = false)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "gender", nullable = false)
    private Gender gender;
    @Column(name = "orientation", nullable = false)
    private Gender orientation;
    @Column(name = "phone", nullable = false)
    private long phone;
    @Column(name = "location", nullable = true)
    private String location;
    @Column(name = "city" , nullable = true)
    private String city;
    @Column(name = "admin")
    private boolean admin = false;
    @OneToMany(mappedBy = "user")
    @Column(nullable = true)
    private List<Picture> pictures = new ArrayList<>();

}
