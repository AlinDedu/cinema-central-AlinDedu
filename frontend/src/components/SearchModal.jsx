import React, { useState, useEffect } from 'react';
import { api_key, fetchDataFromServer } from "../assets/js/api.js";
import MovieCard from './MovieCard';

const SearchModal = ({
     searchQuery,
     handleSearchModalClose,
     setSearching
}) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            setSearching(true);

            const searchTimeout = setTimeout(() => {
                fetchDataFromServer(
                    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&page=1&include_adult=false`,
                    ({ results: movieList }) => {
                        setSearchResults(movieList);
                        setSearching(false);
                    }
                );
            }, 500);

            return () => clearTimeout(searchTimeout);
        } else {
            setSearchResults([]);
            setSearching(false);
        }
    }, [searchQuery]);

    return (
        <div className={`search-modal ${searchResults.length > 0 ? 'active' : ''}`}>
            <button className="close-button" onClick={handleSearchModalClose}>
                Close
            </button>
            <div className="label">Results for</div>
            <h1 className="heading">{searchQuery}</h1>
            <div className="movie-list">
                <div className="grid-list">
                    {searchResults.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
