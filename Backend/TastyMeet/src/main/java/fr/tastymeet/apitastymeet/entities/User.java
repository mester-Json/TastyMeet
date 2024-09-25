package fr.tastymeet.apitastymeet.entities;

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
    @Column(name = "age")
    private LocalDate age;
    @Column(name = "description", nullable = true)
    private String description;
    @Column(unique = true, name = "email", nullable = false)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "gender", nullable = false)
    private Gender gender;
    @Column(name = "orientation", nullable = true)
    private Gender orientation;
    @Column(name = "phone", nullable = true)
    private long phone;
    @Column(name = "location", nullable = true)
    private String location;
    @Column(name = "city" , nullable = true)
    private String city;
    @ElementCollection
    private Set<Roles> roles = Set.of(Roles.PUBLIC);
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Column(nullable = true)
    private List<Picture> pictures = new ArrayList<>();

    @ManyToMany
    private Set<User> liked = new HashSet<>();

    public Set<User> getMatches() {
        return liked.stream().filter(like -> like.liked.stream().anyMatch(user -> user.id == id)).collect(Collectors.toSet());
    }
    public void like(User user) {
        liked.add(user);
    }
    public Set<User> getLiked() {
        return liked;
    }
}
