package com.codecool.epg.model;

import com.codecool.epg.model.MovieDto;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class TmdbApiResponse {
    private int page;
    private List<MovieDto> results;
    private int totalPages;
    private int totalResults;

    @JsonCreator
    public TmdbApiResponse(@JsonProperty("page") int page, @JsonProperty("results") List<MovieDto> results, @JsonProperty("total_pages") int totalPages, @JsonProperty("total_results") int totalResults) {
        this.page = page;
        this.results = results;
        this.totalPages = totalPages;
        this.totalResults = totalResults;
    }

    public int getPage() {
        return page;
    }

    public List<MovieDto> getResults() {
        return results;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getTotalResults() {
        return totalResults;
    }
}
