package com.codecool.epg.controller;

import com.codecool.epg.model.Users;
import com.codecool.epg.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public Users getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Users createUser(@RequestBody Users users) {
        return userRepository.save(users);
    }

    @PostMapping("/login")
    public Users tryLogin(@RequestBody Users users) {
        Users user = userRepository.findByEmailAndPassword(users.getEmail(), users.getPassword());
        return user;
    }

    @PutMapping("/{id}")
    public Users updateUser(@PathVariable Long id, @RequestBody Users updatedUsers) {
        Users users = userRepository.findById(id).orElse(null);
        if (users != null) {
            users.setUsername(updatedUsers.getUsername());
            users.setEmail(updatedUsers.getEmail());
            users.setPassword(updatedUsers.getPassword());
            userRepository.save(users);
        }
        return users;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
