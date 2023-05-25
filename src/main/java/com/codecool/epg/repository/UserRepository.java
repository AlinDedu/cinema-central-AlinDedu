package com.codecool.epg.repository;

import com.codecool.epg.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<Users, Long> {
    Users findByEmailAndPassword(String email, String password);
    Optional<Users> findByUsername(String username);
}
