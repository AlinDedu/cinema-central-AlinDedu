package com.codecool.epg.favorites;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteMovieRepository extends JpaRepository<FavoriteMovie, Integer> {
    List<FavoriteMovie> findByUserId(Integer userId);
    boolean existsByMovieTitleAndImdbIdAndUserId(String movieTitle, String imdbId, Integer userId);
    Optional<FavoriteMovie> findById(Integer id);
}
