package com.codecool.epg.favorites;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FavoritesRequest {
    private String username;
    private String movieTitle;
    private String imdbId;
    private String rating;
    private String production;
}
