package com.codecool.epg.controller;

import com.codecool.epg.model.MovieDto;
import com.codecool.epg.model.TmdbApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api")
public class MoviesController {
    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/movies/{page}")
    public ResponseEntity<List<MovieDto>> getAllMovies(@PathVariable int page) {
        String url = "https://api.themoviedb.org/3/movie/popular?api_key=b11b1adf41fea93b12a7421bf293f00e&page=" + page;

        TmdbApiResponse response = restTemplate.getForObject(url, TmdbApiResponse.class);

        List<MovieDto> movies = new ArrayList<>(response.getResults());

        return ResponseEntity.ok(movies);
    }
}
