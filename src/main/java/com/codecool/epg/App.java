package com.codecool.epg;

import com.codecool.epg.config.RsaKeyProperties;
import com.codecool.epg.model.Users;
import com.codecool.epg.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository users, PasswordEncoder encoder) {
        return args -> {
            users.save(new Users("user", "user@gmail.com", encoder.encode("password"), "ROLE_USER"));
            users.save(new Users("admin", "admin@gmail.com", encoder.encode("password"), "ROLE_USER,ROLE_ADMIN"));
        };
    }
}
