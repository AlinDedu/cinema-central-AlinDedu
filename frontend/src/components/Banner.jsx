import React, { useEffect, useState } from 'react';
import HeroSliderItem from './HeroSliderItem.jsx';
import HeroSliderControlItem from './HeroSliderControlItem.jsx';
import { api_key, fetchDataFromServer } from '../assets/js/api.js';

const Banner = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [genreIdList, setGenreIdList] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchDataFromServer(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
            function ({ genres }) {
                const newGenreList = [];
                for (const { id, name } of genres) {
                    newGenreList[id] = name;
                }
                setGenreIdList(newGenreList);
            }
        );
        fetchDataFromServer(
            `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`,
            function ({ results: movieList }) {
                setMovies(movieList);
            }
        );
    }, []);

    const handleSlideChange = (index) => {
        setActiveSlideIndex(index);
    };

    return (
        <section className="banner" aria-label="Popular Movies">
            <div className="banner-slider">
                {movies &&
                    movies.map((movie, index) => (
                        <HeroSliderItem
                            key={index}
                            index={index}
                            movie={movie}
                            active={index === activeSlideIndex}
                        />
                    ))}
            </div>
            <div className="slider-control">
                <div className="control-inner">
                    {movies &&
                        movies.map((movie, index) => (
                            <HeroSliderControlItem
                                key={index}
                                index={index}
                                movie={movie}
                                active={index === activeSlideIndex}
                                toggleSlide={() => handleSlideChange(index)}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;
