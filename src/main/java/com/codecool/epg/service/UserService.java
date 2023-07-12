package com.codecool.epg.service;

import com.codecool.epg.user.User;
import com.codecool.epg.user.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
