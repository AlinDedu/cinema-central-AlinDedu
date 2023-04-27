import React from 'react';

const Movie = (movie) => {
    return (
        <a key={movie.id} href={`movies/${movie.id}`}>
            <img
                className="movie-item"
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
            />
        </a>
    );
};

export default Movie;