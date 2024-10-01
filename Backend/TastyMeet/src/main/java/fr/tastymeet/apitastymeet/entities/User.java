package fr.tastymeet.apitastymeet.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
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
    @Column(name = "description")
    private String description;
    @Column(unique = true, name = "email", nullable = false)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "gender", nullable = false)
    private Gender gender;
    @Column(name = "orientation")
    private Gender orientation;
    @Column(name = "phone")
    private long phone;
    @Column(name = "location")
    private String location;
    @Column(name = "city" )
    private String city;
    @ElementCollection
    private Set<Roles> roles = Set.of(Roles.PUBLIC);
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Column(nullable = true)
    private List<Picture> pictures = new ArrayList<>();

    @OneToMany(mappedBy = "user1")
    private List<Conversation> conversationsAsUser1;

    @OneToMany(mappedBy = "user2")
    private List<Conversation> conversationsAsUser2;

    @ManyToMany
    private Set<User> liked = new HashSet<>();

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ChatMessage> messagesSent = new ArrayList<>();

    public Set<User> getMatches() {
        return liked.stream().filter(likedUser -> {
                    boolean hasLiked = likedUser.getLiked().stream().anyMatch(user -> user.id == this.id);
                    return hasLiked;
                })
                .collect(Collectors.toSet());
    }


    public void like(User user) {
        liked.add(user);
    }
    public Set<User> getLiked() {
        return liked;
    }
}
