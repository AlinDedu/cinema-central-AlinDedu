package com.codecool.epg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
