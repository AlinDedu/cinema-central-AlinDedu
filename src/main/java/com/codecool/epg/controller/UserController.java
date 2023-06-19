package com.codecool.epg.controller;

import com.codecool.epg.movie.Movie;
import com.codecool.epg.user.User;
import com.codecool.epg.user.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
@RequiredArgsConstructor
@Transactional
public class UserController {
    private final UserRepository userRepository;
    @Autowired
    private EntityManager entityManager;
    @GetMapping("/profile")
    public ResponseEntity<Object> getProfileData(@RequestParam String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logout successfully!");
    }

    @GetMapping("/favorite-movies")
    public ResponseEntity<List<Movie>> getFavoriteMovies(@RequestParam String username) {
       Optional<User> userOptional = userRepository.findByUsername(username);

       if (userOptional.isPresent()) {
           User user = userOptional.get();
           List<Movie> favoriteMovies = user.getFavoriteMovies();
           return ResponseEntity.ok(favoriteMovies);
       } else {
           return ResponseEntity.notFound().build();
       }
    }

    @DeleteMapping("/favorite-movies")
    public ResponseEntity<String> removeFavoriteMovie(
            @RequestParam String username,
            @RequestParam String movie
    ) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        System.out.println("Username for movie removal: " + username);
        System.out.println("Movie to remove: " + movie);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println(user);
            System.out.println(user.getFavoriteMovies());
            user.removeFavoriteMovie(Movie.builder().title(movie).build());
            userRepository.save(user);
            System.out.println(user.getFavoriteMovies());
            return ResponseEntity.ok("Movie removed from favorites");
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }

    @PostMapping("/favorite-movies")
    public ResponseEntity<String> addFavoriteMovie(
            @RequestParam String username,
            @RequestParam String movie
    ) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        System.out.println("Username: " + username);
        System.out.println("Movie name: " + movie);
        System.out.println("User optional: " + userOptional);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Movie newfavoriteMovie = Movie.builder().title(movie).build();
            user.addFavoriteMovie(newfavoriteMovie);
            userRepository.save(user);
            return ResponseEntity.ok("Movie added to favorites.");
        }
        return ResponseEntity.notFound().build();
    }
}
