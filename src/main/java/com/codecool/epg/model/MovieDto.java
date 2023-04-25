package com.codecool.epg.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class MovieDto {
    private boolean adult;
    private String backdropPath;
    private List<Integer> genreIds;
    private int id;
    private String originalLanguage;
    private String originalTitle;
    private String overview;
    private double popularity;
    private String posterPath;
    private String releaseDate;
    private String title;
    private boolean video;
    private double voteAverage;
    private int voteCount;

    @JsonCreator
    public MovieDto(@JsonProperty("adult") boolean adult,
                    @JsonProperty("backdrop_path") String backdropPath,
                    @JsonProperty("genre_ids") List<Integer> genreIds,
                    @JsonProperty("id") int id,
                    @JsonProperty("original_language") String originalLanguage,
                    @JsonProperty("original_title") String originalTitle,
                    @JsonProperty("overview") String overview,
                    @JsonProperty("popularity") double popularity,
                    @JsonProperty("poster_path") String posterPath,
                    @JsonProperty("release_date") String releaseDate,
                    @JsonProperty("title") String title,
                    @JsonProperty("video") boolean video,
                    @JsonProperty("vote_average") double voteAverage,
                    @JsonProperty("vote_count") int voteCount) {
        this.adult = adult;
        this.backdropPath = backdropPath;
        this.genreIds = genreIds;
        this.id = id;
        this.originalLanguage = originalLanguage;
        this.originalTitle = originalTitle;
        this.overview = overview;
        this.popularity = popularity;
        this.posterPath = posterPath;
        this.releaseDate = releaseDate;
        this.title = title;
        this.video = video;
        this.voteAverage = voteAverage;
        this.voteCount = voteCount;
    }

    public boolean isAdult() {
        return adult;
    }

    public String getBackdropPath() {
        return backdropPath;
    }

    public List<Integer> getGenreIds() {
        return genreIds;
    }

    public int getId() {
        return id;
    }

    public String getOriginalLanguage() {
        return originalLanguage;
    }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public String getOverview() {
        return overview;
    }

    public double getPopularity() {
        return popularity;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public String getTitle() {
        return title;
    }

    public boolean isVideo() {
        return video;
    }

    public double getVoteAverage() {
        return voteAverage;
    }

    public int getVoteCount() {
        return voteCount;
    }
}
