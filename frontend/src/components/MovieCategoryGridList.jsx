import React, { useState } from 'react';
import MovieCard from './MovieCard.jsx';
import { fetchDataFromServer, api_key } from '../assets/js/api.js';

const MovieCategoryGridList = ({ movieList, title, currentPage, setCurrentPage, categoryId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = () => {
        setIsLoading(true);

        fetchDataFromServer(
            `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage + 1}&with_genres=${categoryId}`,
            function ({ results: newMovies }) {
                setCurrentPage(currentPage + 1);
                setIsLoading(false);
                // Append new movies to the current list
                movieList.push(...newMovies);
            }
        );
    };

    return (
        <section className="movie-list genre-list" aria-label={title}>
            <div className="title-wrapper">
                <h3 className="heading">All {title}</h3>
            </div>
            <div className="grid-list">
                {movieList?.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
            {!isLoading && (
                <button className="btn load-more" onClick={handleLoadMore}>
                    Load More
                </button>
            )}
            {isLoading && <p>Loading...</p>}
        </section>
    );
};

export default MovieCategoryGridList;
