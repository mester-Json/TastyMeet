package fr.tastymeet.apitastymeet.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "likes", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "liked_user_id"})})
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "liked_user_id", nullable = false)
    private Long likedUserId;

    @Column(name = "is_mutual", nullable = false)
    private Boolean isMutual = false;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getLikedUserId() {
        return likedUserId;
    }

    public void setLikedUserId(Long likedUserId) {
        this.likedUserId = likedUserId;
    }

    public Boolean getIsMutual() {
        return isMutual;
    }

    public void setIsMutual(Boolean isMutual) {
        this.isMutual = isMutual;
    }
}
