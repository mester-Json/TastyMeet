package fr.tastymeet.apitastymeet.services;

import fr.tastymeet.apitastymeet.dto.UserLikeDto;

import java.util.Set;

public interface IMatchService {
    void likeUser(long userId, long likedUserId);
    Set<UserLikeDto> getMatches(long userId);
}
