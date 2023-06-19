package com.codecool.epg.movie;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.codecool.epg.user.User;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Movie {
    @Id
    @GeneratedValue
    private Integer id;

    private String title;

    @ManyToMany(mappedBy = "user_favorite_movies", cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<>();
}
