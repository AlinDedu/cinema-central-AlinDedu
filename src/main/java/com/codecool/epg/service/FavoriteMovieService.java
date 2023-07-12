package com.codecool.epg.service;

import com.codecool.epg.favorites.FavoriteMovie;
import com.codecool.epg.favorites.FavoriteMovieRepository;
import com.codecool.epg.favorites.FavoritesRequest;
import com.codecool.epg.user.User;
import com.codecool.epg.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteMovieService {
    private final UserRepository userRepository;
    private final FavoriteMovieRepository favoriteMovieRepository;

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<FavoriteMovie> getFavoritesByUserId(Integer userId) {
        return favoriteMovieRepository.findByUserId(userId);
    }

    public boolean doesFavoriteExist(String movieTitle, String imdbId, Integer userId) {
        return favoriteMovieRepository.existsByMovieTitleAndImdbIdAndUserId(movieTitle, imdbId, userId);
    }

    public void addFavoriteMovie(FavoritesRequest request, User user) {
        FavoriteMovie favoriteMovie = FavoriteMovie.builder()
                .movieTitle(request.getMovieTitle())
                .imdbId(request.getImdbId())
                .userId(user.getId())
                .rating(request.getRating())
                .production(request.getProduction())
                .build();
        favoriteMovieRepository.save(favoriteMovie);
    }

    public void deleteFavoriteMovie(Integer favoriteId) {
        favoriteMovieRepository.deleteById(favoriteId);
    }
}
