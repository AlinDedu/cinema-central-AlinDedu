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
@RequestMapping("/movies")
@CrossOrigin("localhost:8080")
public class MoviesController {
    @Autowired
    private RestTemplate restTemplate;

}
