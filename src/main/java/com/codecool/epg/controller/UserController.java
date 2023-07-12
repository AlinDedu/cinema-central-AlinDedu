package com.codecool.epg.controller;

import com.codecool.epg.service.UserService;
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
public class UserController {
    private final UserService userService;
    @GetMapping("/profile")
    public ResponseEntity<Object> getProfileData(@RequestParam String username) {
        Optional<User> user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        userService.logout();
        return ResponseEntity.ok("Logout successfully!");
    }
}
