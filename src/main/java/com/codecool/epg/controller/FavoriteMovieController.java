package com.codecool.epg.controller;

import com.codecool.epg.favorites.FavoriteMovie;
import com.codecool.epg.favorites.FavoritesRequest;
import com.codecool.epg.service.FavoriteMovieService;
import com.codecool.epg.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/favorites")
@CrossOrigin("*")
@RequiredArgsConstructor
public class FavoriteMovieController {
    private final FavoriteMovieService favoriteMovieService;

    @GetMapping
    public ResponseEntity<List<FavoriteMovie>> getFavoritesByUsername(@RequestParam String username) {
        Optional<User> user = favoriteMovieService.getUserByUsername(username);

        if (user.isPresent()) {
            List<FavoriteMovie> favorites = favoriteMovieService.getFavoritesByUserId(user.get().getId());
            return ResponseEntity.ok(favorites);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> addFavoriteMovie(@RequestBody FavoritesRequest request) {
        Optional<User> user = favoriteMovieService.getUserByUsername(request.getUsername());

        if (user.isPresent()) {
            boolean favoriteExists = favoriteMovieService.doesFavoriteExist(
                    request.getMovieTitle(), request.getImdbId(), user.get().getId());

            if (favoriteExists) {
                return ResponseEntity.ok("Movie already exists in the list");
            } else {
                favoriteMovieService.addFavoriteMovie(request, user.get());
                return ResponseEntity.ok("Movie added to the list");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{favoriteId}")
    public ResponseEntity<String> deleteFavoriteMovie(@PathVariable Integer favoriteId) {
        favoriteMovieService.deleteFavoriteMovie(favoriteId);
        return ResponseEntity.ok("Movie deleted from the list");
    }
}
