package fr.tastymeet.apitastymeet.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
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
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private LocalDate age;
    private String description;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private Gender gender;
    private Gender orientation;
    private long phone;
    private String location;
    private String city;
    @ElementCollection
    private Set<Roles> roles = Set.of(Roles.PUBLIC);
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
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
}
